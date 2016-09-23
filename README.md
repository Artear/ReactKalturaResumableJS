# React Kaltura Resumable JS

Uploader with [ReactResumableJS](https://www.npmjs.com/package/react-resumable-js) to upload file into Kaltura

### Install
`npm i react-kaltura-resumablejs`

### Options

- filetypes: Set the  video extensions to upload. Ex: ['mp4','avi'].
- chunksize: Set in KB the size to upload the file in chunks. Ex: 1024.
- simultaneousUploads: amount of upload at same time. Ex: 1.
- onError: Catch the upload error. Must be a function. Ex: (error) => { return error; }.
- onSuccess: Catch the file success when finish the upload. Ex: (success) => { return success}
- uploaderID: Container ID to render the ReactResumableJS. Ex: "video-uploader",
- textLabel: "Uploaded files",
- fileAddedMessage: "Started",
- completedMessage: "Complete!:"

### Example

```javascript
export default class Example extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {

        return (

            <div>
               <ReactKalturaResumableJs
                   server="http://www.kaltura.com/api_v3"
                   ks="0_asdfafdvsdbsdgsdgsdgs"
                   onSuccess={(success) => { console.log(success); }}
                   onError={(error) => { console.log(error); }}
               />
            </div>

        );
    }
}
```

### Demo

`npm run demo`