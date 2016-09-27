# React Kaltura Resumable JS

Uploader with [ReactResumableJS](https://www.npmjs.com/package/react-resumable-js) to upload file into Kaltura

[![NPM](https://nodei.co/npm/react-kaltura-resumablejs.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-kaltura-resumablejs/)

[![CircleCI](https://circleci.com/gh/Artear/ReactKalturaResumableJS.svg)](https://circleci.com/gh/Artear/ReactKalturaResumableJS) [![CircleCI](https://circleci.com/gh/Artear/ReactKalturaResumableJS.svg?style=shield)](https://circleci.com/gh/Artear/ReactKalturaResumableJS)

### Install
`npm i react-kaltura-resumablejs`

### Node Version
- LTS

### Options

- uploaderID: Container ID to render the ReactResumableJS. Ex: "video-uploader",
- filetypes: Set the  video extensions to upload. Ex: ['mp4','avi'].
- chunksize: Set in KB the size to upload the file in chunks. Ex: 1024.
- simultaneousUploads: amount of upload at same time. Ex: 1.
- onError: Catch the upload error. Must be a function. Ex: (error) => { return error; }.
- onSuccess: Catch the file success when finish the upload. Ex: (success) => { return success}
- textLabel: "Uploaded files",
- fileAddedMessage: "Started",
- completedMessage: "Complete!:"

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
                   onFileSuccess={(success) => { console.log(success); }}
                   onFileRemoved={(file) => { console.log(file); }}
                   onError={(error) => { console.log(error); }}
               />
            </div>

        );
    }
}
```

### Demo

`npm run demo`