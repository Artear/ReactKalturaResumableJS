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

        if(this.props.categories.length > 0) {
            queryString+= '&mediaEntry:categoriesIds=' + this.props.categories;
        }

        this._request(path, queryString).then((response) => {
            if (typeof this.props.onFileSuccess === "function") {
                this.props.onFileSuccess(response.data);
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
                    dropTargetID="kalturaDropTarget"
                    filetypes={this.props.filetypes}
                    fileAccept={this.props.fileAccept}
                    fileAddedMessage={this.props.fileAddedMessage}
                    completedMessage={this.props.completedMessage}
                    service={null}
                    textLabel={this.props.textLabel}
                    disableDragAndDrop={true}
                    onFileSuccess={this._addMedia}
                    onFileAdded={this._uploadVideo}
                    onFileRemoved={this.props.onFileRemoved}
                    maxFileSize={this.props.maxFileSize}
                    disableInput={this.props.disableInput}
                    maxFiles={this.props.maxFiles}
                    onMaxFileSizeErrorCallback={this.props.onMaxFileSizeErrorCallback}
                    maxFilesErrorCallback={this.props.maxFilesErrorCallback}
                />
            </div>
        )
    }
}

ReactKalturaResumableJs.propTypes = {
    uploaderID: React.PropTypes.string.isRequired,
    filetypes: React.PropTypes.array,
    fileAccept: React.PropTypes.string,
    chunksize: React.PropTypes.number,
    simultaneousUploads: React.PropTypes.number,
    onError: React.PropTypes.func,
    onSuccess: React.PropTypes.func,
    onFileRemoved: React.PropTypes.func,
    textLabel: React.PropTypes.string,
    fileAddedMessage: React.PropTypes.string,
    completedMessage: React.PropTypes.string,
    maxFileSize: React.PropTypes.number,
    disableInput: React.PropTypes.bool,
    categories: React.PropTypes.string
};

ReactKalturaResumableJs.defaultProps = {
    filetypes: ['mp4'],
    fileAccept: "video/mp4,video/x-m4v,video/*,video/x-quicktime",
    chunksize: 1024,
    maxFileSize: 104857600,
    simultaneousUploads: 1,
    onError: (error) => { return error; },
    onFileSuccess: (success) => { return success;},
    onFileRemoved: (file) => { return file; },
    uploaderID: "video-uploader",
    textLabel: "Uploaded files",
    fileAddedMessage: "Started",
    completedMessage: "Complete!:",
    disableInput: false,
    categories: "",
    maxFiles: 20,
    onMaxFileSizeErrorCallback: null
};