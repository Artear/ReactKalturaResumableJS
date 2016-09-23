import React from "react";
import ReactKalturaResumableJs from "../../src/ReactKalturaResumableJs";

export default class ReactKalturaResumableExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uploader: ""
        }
    }

    onSuccess = (response) => {
        console.log(response);
    };

    onError = (error) => {
        console.log(error);
    };

    renderUploader = () => {

        this.setState({
            uploader: <ReactKalturaResumableJs
                server={document.querySelector('#kalturaUrlServer').value}
                ks={document.querySelector('#kalturaKS').value}
                onSuccess={this.onSuccess}
                onError={this.onError}
            />

        });
    };

    render() {

        return (

            <div>
                <input className="form-control" id="kalturaUrlServer" placeholder="Kaltura url server" type="text" />
                <br/>
                <input className="form-control" id="kalturaKS" type="text" placeholder="Kaltura KS" />
                <br/>
                <button className="myButton" onClick={this.renderUploader}>Render Kaltura Uploader</button>
                <div id="uploaderContainer">
                    {this.state.uploader}
                </div>
            </div>

        );
    }
}