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

    _addMedia = (files) => {

        console.log('Add Media', files);

        /*
         let self = this;
         return new Promise(function (fulfill, reject) {
         let path = "/service/media/action/addFromUploadedFile";
         let queryString = "mediaEntry:name=" + encodeURIComponent(name) + "&mediaEntry:mediaType=1&uploadTokenId=" + uploadToken;

         self._request(path, queryString).then(fulfill).catch(reject);
         self = null;
         })*/
    };

    _uploadVideo = (file, resumable) => {

        file.bootstrap();

        resumable.opts.target = this.props.server + "/service/uploadToken/action/upload";
        resumable.opts.fileParameterName = "fileData";

        let queryString = "uploadToken:objectType=KalturaUploadToken" +
            "&uploadToken:fileName=" + encodeURIComponent(file.fileName) +
            "&uploadToken:fileSize=" + file.size;

        this._request("/service/uploadToken/action/add", queryString)
            .then((response) => {

                let uploadToken = response.id;

                this.setState({
                    lastUploadToken: uploadToken
                });

                console.log('lastUploadToken', this.state.lastUploadToken);

                resumable.opts.query = (file, chunk) => {
                    return {
                        format: 1,
                        ks: this.props.ks,
                        uploadTokenId: uploadToken,
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

        let options = {
            'uploaderID': 'video-upload',
            'filetypes': ["mp4"],
            'fileAccept': 'video/*',
            'fileAddedMessage': 'Started!',
            'completedMessage': 'Complete! : ',
            'service': null,
            'textLabel': 'Uploaded files',
            'previousText': '',
            'disableDragAndDrop': true,
            'onFileSuccess': (files) => {
                this._addMedia(files);
            },
            'onFileAdded': (file, resumable) => {
                this._uploadVideo(file, resumable);
            },
            'headerObject': {}
        };

        return (
            <div>
                <ReactResumableJs options={options}/>
            </div>
        )
    }
}