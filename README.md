# React Kaltura Resumable JS

Uploader with [ReactResumableJS](https://www.npmjs.com/package/react-resumable-js) to upload file into Kaltura

[![NPM](https://nodei.co/npm/react-kaltura-resumablejs.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-kaltura-resumablejs/)

[![CircleCI](https://circleci.com/gh/Artear/ReactKalturaResumableJS.svg)](https://circleci.com/gh/Artear/ReactKalturaResumableJS) [![CircleCI](https://circleci.com/gh/Artear/ReactKalturaResumableJS.svg?style=shield)](https://circleci.com/gh/Artear/ReactKalturaResumableJS)

### Install
`npm i react-kaltura-resumablejs`

### Node Version
- LTS

### Options

- server: http path to upload the file. Ex: http://kaltura.com/api_v3
- ks: Kaltura secret key from Kaltura.
- uploaderID: Container ID to render the ReactResumableJS. Ex: "video-uploader",
- filetypes: Set the  video extensions to upload. Ex: ['mp4','avi'].
- chunksize: Set in KB the size to upload the file in chunks. Ex: 1024.
- simultaneousUploads: amount of upload at same time. Ex: 1.
- onError: Catch the upload error. Must be a function. Ex: (error) => { return error; }.
- onSuccess: Catch the file success when finish the upload. Ex: (success) => { return success}
- textLabel: "Uploaded files",
- fileAddedMessage: "Started",
- completedMessage: "Complete!:"
- disableInput Boolean to disable or enable input file. Send true to disable, false otherwise.
- maxFileSize The allowed file size for upload. Is expressed in bytes. Default is: 104857600 (100mb).
- maxFiles Indicates how many files can be uploaded in a single session. Valid values are any positive integer and undefined for no limit. (Default: undefined)
- onMaxFileSizeErrorCallback Usefull to use with the above param, and take the exception for use as you want.
- maxFilesErrorCallback A function which displays the please upload n file(s) at a time message. (Default: displays an alert box with the message Please n one file(s) at a time.)

### Changelogs
[Changelogs](changelog.md)

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
                   uploaderID="myKalturaUploader"
                   onFileSuccess={(success) => { console.log(success); }}
                   onFileRemoved={(file) => { console.log(file); }}
                   onError={(error) => { console.log(error); }}
                   maxFileSize={104857600}
                   categories="14,15,16"
                   maxFiles={3}
                   onMaxFileSizeErrorCallback={function (files) {
                       alert("max size: 104857600");
                   }}
                   maxFilesErrorCallback={function () {
                       alert("Max Files: 1");
                   }}
               />
            </div>

        );
    }
}
```

### Demo

`npm run demo`