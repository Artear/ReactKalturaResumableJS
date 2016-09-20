import React from "react";
import axios from "axios";

export default class ReactKalturaResumableJs extends React.Component {
    constructor(props) {
        super(props);
    }

    _request(server, ks, path, queryString) {

        let url = server + path + "?format=1&ks=" + ks + "&" + queryString;
        let config = {
            responseType: 'json'
        };

        return new Promise(function (fulfill, reject) {
            axios.post(url, {}, config)
                .then(fulfill)
                .catch(reject);
        });

    }

    _addMedia(server, ks, uploadToken, name) {
        let self = this;
        return new Promise(function (fulfill, reject) {
            let path = "/service/media/action/addFromUploadedFile";
            let queryString = "mediaEntry:name=" + encodeURIComponent(name) + "&mediaEntry:mediaType=1&uploadTokenId=" + uploadToken;

            self._request(server, ks, path, queryString).then(fulfill).catch(reject);
        })
    }

    render() {

        return (
            <div>
                Kaltura Resumable
            </div>
        )
    }
}