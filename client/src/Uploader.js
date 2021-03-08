import React from 'react';
import S3FileUpload from 'react-s3';
import configure from './configure';

const Uploader = () => {

    const config = {
        bucketName: configure.bucketName,
        region: configure.region,
        accessKeyId: configure.accessKeyId,
        secretAccessKey: configure.secretAccessKey
    }

    /*  Notice that if you don't provide a dirName, the file will be automatically uploaded to the root of your bucket */


    let fileName;
    let urlString;

    const upload = (e) => {

        S3FileUpload
            .uploadFile(e.target.files[0], config)
            .then(data => {
                //update DOM 1 of 2 - show success message
                fileName = data.key;
                const domElement = document.getElementById('success');
                domElement.innerHTML = `${fileName} successfully uploaded!`;
                //update DOM 2 of 2 - show image
                urlString = `https://imagertesterbucketer.s3.amazonaws.com/${fileName}`;
                const secondDomElement = document.getElementById('successImage');
                const image = document.createElement('img');
                image.src = urlString;
                secondDomElement.appendChild(image)
                //clear uploader
                document.getElementById("loader").value = "";
            })
            .catch(err => {
                console.error(err)
            })


    }

    return (
        <div>
            <h2>Upload Image</h2>
            <input id="loader" type="file" onChange={upload} />
            <p id='success'></p>
            <div id="successImage"></div>
        </div>
    )
}

export default Uploader
