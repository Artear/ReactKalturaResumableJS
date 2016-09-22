import React from "react";
import axios from "axios";
import ReactResumableJs from "react-resumable-js";

export default class ReactKalturaResumableJs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lastUploadToken: null
        };
    }

    _request = (path, queryString) => {

        let url = this.props.server + path + "?format=1&ks=" + this.props.ks + "&" + queryString;

        return new Promise(function (fulfill, reject) {
            axios.post(url)
                .then(fulfill)
                .catch(reject);
        });
    };

    _addMedia = (file, message) => {

        console.log('Add Media', file, message);

        return new Promise((fulfill, reject) => {
            let path = "/service/media/action/addFromUploadedFile";
            let queryString = "mediaEntry:name=" + encodeURIComponent(file.uniqueIdentifier) + "&mediaEntry:mediaType=1&uploadTokenId=" + this.state.lastUploadToken;
            this._request(path, queryString).then((response) => {
                if(typeof this.props.onSuccess === "function") {
                    this.props.onSuccess(response.data);
                }
            }).catch((reject) => {
                if(typeof this.props.onError === "function") {
                    this.props.onError(reject);
                }
            });
        });
    };

    _uploadVideo = (file, resumable) => {

        file.bootstrap();

        let chunksize = this.props.chunksize;

        resumable.opts.target = this.props.server + "/service/uploadToken/action/upload";
        resumable.opts.fileParameterName = "fileData";
        resumable.opts.chunkSize = chunksize*1024*1024;
        resumable.opts.simultaneousUploads = 1;
        resumable.opts.testChunks = false;
        resumable.opts.throttleProgressCallbacks = 1;

        let queryString = "uploadToken:objectType=KalturaUploadToken" +
            "&uploadToken:fileName=" + encodeURIComponent(file.fileName) +
            "&uploadToken:fileSize=" + file.size;

        this._request("/service/uploadToken/action/add", queryString)
            .then((response) => {

                this.setState({
                    lastUploadToken: response.data.id
                });

                console.log('lastUploadToken', this.state.lastUploadToken);

                resumable.opts.query = (file, chunk) => {
                    return {
                        format: 1,
                        ks: this.props.ks,
                        uploadTokenId: this.state.lastUploadToken,
                        resume: chunk.offset > 0 ? 1 : 0,
                        resumeAt: chunk.startByte,
                        finalChunk: chunk.offset + 1 == file.chunks.length ? 1 : 0,
                    };
                };

                resumable.upload();

            }).catch((reason) => {

        });
    };

    render() {

        return (
            <div>
                <ReactResumableJs
                    uploaderID="video-uploader"
                    filetypes={["mp4"]}
                    fileAccept="video/*"
                    fileAddedMessage="Started"
                    completedMessage="Complete!: "
                    service={null}
                    textLabel="Uploaded files"
                    disableDragAndDrop={true}
                    onFileSuccess={(file, message) => {
                        this._addMedia(file, message);
                    }}
                    onFileAdded={(file, resumable) => {
                        this._uploadVideo(file, resumable);
                    }}
                />
            </div>
        )
    }
}

ReactKalturaResumableJs.propTypes = {
    chunksize: React.PropTypes.number
};


ReactKalturaResumableJs.defaultProps = {
    chunksize: 1
};