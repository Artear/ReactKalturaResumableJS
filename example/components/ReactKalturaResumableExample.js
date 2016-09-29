import React from 'react';
import axios from 'axios';
import ReactKalturaResumableJs from "../../src/ReactKalturaResumableJs";


const KALTURA_LOGIN = '/service/user/action/loginByLoginId';

export default class ReactKalturaResumableExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uploader: ""
        }
    }

    onFileSuccess = (response) => {
        console.log(response);
    };

    onFileRemoved = (file) => {
        console.log(file);
    };

    onError = (error) => {
        console.log(error);
    };

    login = () => {
        let username = document.querySelector('#username').value;
        let password = document.querySelector('#password').value;
        let kalturaUrlServer = document.querySelector('#kalturaUrlServer').value;
        let queryString = '?format=1&loginId=' + username + '&password=' + password;

        let url = kalturaUrlServer + KALTURA_LOGIN + queryString;

        if (username == "" || password == "" || kalturaUrlServer == "") {
            alert("The username, password or kaltura url server can't be null");
        } else {
            axios.post(url)
                .then((response) => {
                    if(response.status === 200) {
                        let result = response.data;
                        if (result && result.code && result.message) {
                            alert(result.message);
                        } else {
                            document.querySelector('#kalturaKS').value = result;
                        }
                    }
                })
                .catch((reason) => {
                    alert(reason.message);
                });
        }
    };

    renderUploader = () => {

        let ks = document.querySelector('#kalturaKS').value;

        if (ks.length > 0) {
            this.setState({
                uploader: <ReactKalturaResumableJs
                    server={document.querySelector('#kalturaUrlServer').value}
                    ks={ks}
                    uploaderID="myKalturaUploader"
                    onFileSuccess={this.onFileSuccess}
                    onFileRemoved={this.onFileRemoved}
                    onError={this.onError}
                    maxFileSize={104857600}
                />
            });
        } else {
            alert("The KS can't be null!");
        }
    };

    render() {

        return (

            <div>
                <h1>Kaltura uploader Example</h1>
                <input className="form-control" id="username" placeholder="username" type="text"/>
                <br/>
                <input className="form-control" id="password" placeholder="password" type="password"/>
                <br/>
                <input className="form-control" id="kalturaUrlServer" placeholder="Kaltura url server" type="text"/>
                <label className="description">Ex: http://kaltura.com/api_v3</label>
                <br/>
                <button onClick={this.login} className="myButton">Login with Kaltura</button>
                <input className="form-control" id="kalturaKS" type="text" placeholder="Kaltura KS"/>
                <br/>
                <button className="myButton" onClick={this.renderUploader}>Render Kaltura Uploader</button>
                <div id="uploaderContainer">
                    {this.state.uploader}
                </div>
            </div>

        );
    }
}