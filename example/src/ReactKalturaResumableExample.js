import React from "react";
import ReactKalturaResumableJs from "../../src/ReactKalturaResumableJs";

export default class ReactKalturaResumableExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uploader: ""
        }
    }

    /*
     http://vodgc.com/api_v3
     YTgxNWQwODJhYzJiYWFhNDk1YzEwZTViNzFmZjg1ZmMyNDU2YmM3NHwxMDc7MTA3OzE0NzQ0OTM0NTM7MDsxOTUwNTswOw==
     */
    renderUploader = () => {

        this.setState({
            uploader: <ReactKalturaResumableJs
                server={document.querySelector('#kalturaUrlServer').value}
                ks={document.querySelector('#kalturaKS').value}
            />

        });
    };

    render() {

        return (

            <div>
                <input value="http://vodgc.com/api_v3" id="kalturaUrlServer" placeholder="Kaltura url server" type="text" />
                <br/>
                <input value="ZjZiMmQ4NzliY2U0NjliZTJmZWI4ZGE4Y2IzNTI5ZDNjYWEyN2IyNnwxMDc7MTA3OzE0NzQ1NzUwMjc7MDs3ODQ2OzA7" id="kalturaKS" type="text" placeholder="Kaltura KS" />
                <br/>
                <button onClick={this.renderUploader}>Render Kaltura Uploader</button>
                <div id="uploaderContainer">
                    {this.state.uploader}
                </div>
            </div>

        );
    }
}