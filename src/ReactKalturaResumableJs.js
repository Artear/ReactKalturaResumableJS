import React from "react";
import axios from "axios";
import ReactResumableJs from "react-resumable-js";

const KALTURA_ADD = "/service/uploadToken/action/add";
const KALTURA_UPLOAD = "/service/uploadToken/action/upload";
const KALTURA_ADD_FROM_UPLOADED_FILE = "/service/media/action/addFromUploadedFile";

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

        let path = KALTURA_ADD_FROM_UPLOADED_FILE;
        let queryString = "mediaEntry:name=" + encodeURIComponent(file.uniqueIdentifier) + "&mediaEntry:mediaType=1&uploadTokenId=" + this.state.lastUploadToken;
        this._request(path, queryString).then((response) => {
            if (typeof this.props.onSuccess === "function") {
                this.props.onSuccess(response.data);
            }
        }).catch((reject) => {
            if (typeof this.props.onError === "function") {
                this.props.onError(reject);
            }
        });
    };

    _uploadVideo = (file, resumable) => {

        file.bootstrap();

        let chunksize = this.props.chunksize;

        resumable.opts.target = this.props.server + KALTURA_UPLOAD;
        resumable.opts.fileParameterName = "fileData";
        resumable.opts.chunkSize = chunksize * 1024;
        resumable.opts.simultaneousUploads = this.props.simultaneousUploads;
        resumable.opts.testChunks = false;
        resumable.opts.throttleProgressCallbacks = 1;

        let queryString = "uploadToken:objectType=KalturaUploadToken" +
            "&uploadToken:fileName=" + encodeURIComponent(file.fileName) +
            "&uploadToken:fileSize=" + file.size;

        this._request(KALTURA_ADD, queryString)
            .then((response) => {

                this.setState({
                    lastUploadToken: response.data.id
                });

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

            }).catch((reject) => {
            this.props.onError(reject);
        });
    };

    render() {

        return (
            <div>
                <ReactResumableJs
                    uploaderID={this.props.uploaderID}
                    filetypes={this.props.filetypes}
                    fileAccept="video/*"
                    fileAddedMessage={this.props.fileAddedMessage}
                    completedMessage={this.props.completedMessage}
                    service={null}
                    textLabel={this.props.textLabel}
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
    filetypes: React.PropTypes.array,
    chunksize: React.PropTypes.number,
    simultaneousUploads: React.PropTypes.number,
    onError: React.PropTypes.func,
    onSuccess: React.PropTypes.func,
    uploaderID: React.PropTypes.string.isRequired,
    textLabel: React.PropTypes.string,
    fileAddedMessage: React.PropTypes.string,
    completedMessage: React.PropTypes.string
};

ReactKalturaResumableJs.defaultProps = {
    filetypes: ['mp4'],
    chunksize: 1024,
    simultaneousUploads: 1,
    onError: (error) => { return error; },
    onSuccess: (success) => { return success},
    uploaderID: "video-uploader",
    textLabel: "Uploaded files",
    fileAddedMessage: "Started",
    completedMessage: "Complete!:"
};