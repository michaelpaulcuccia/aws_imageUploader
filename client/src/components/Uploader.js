import React, { useState } from 'react';
import S3FileUpload from 'react-s3';
import configure from '../configure';

const Uploader = ({ history }) => {

    /*if you don't provide a dirName, the file will be automatically uploaded to the root of your bucket
    dirName: 'photos'
    */

    const [showUploader, setShowUploader] = useState(true);

    const config = {
        bucketName: configure.bucketName,
        region: configure.region,
        accessKeyId: configure.accessKeyId,
        secretAccessKey: configure.secretAccessKey
    }

    //global vars
    let fileName;
    let urlString;
    let image;

    const upload = (e) => {

        S3FileUpload
            .uploadFile(e.target.files[0], config)
            .then(data => {

                //update DOM 1 of 2 - Show Success Message
                fileName = data.key;
                const firstDOMElement = document.getElementById('success');
                firstDOMElement.innerHTML = `${fileName} successfully uploaded!`;

                //update DOM 2 of 2 - Show Uploaded Image
                urlString = `https://imagertesterbucketer.s3.amazonaws.com/${fileName}`;
                const secondDOMElement = document.getElementById('successImage');
                image = document.createElement('img');
                image.src = urlString;
                secondDOMElement.appendChild(image);

                //Clear Uploader
                document.getElementById("loader").value = "";

                //Hide Uploader
                setShowUploader(false)
            })
            .catch(err => {
                console.error(err)
            })


    }

    const loadAnotherHandler = () => {
        //reload page
        window.location.reload(false)
    }

    const returnHomeHandler = () => {
        history.push('/');
    }

    return (
        <div>
            <h2>Upload Image</h2>

            {showUploader &&
                <input id="loader" type="file" onChange={upload} />
            }

            <p id='success'></p>

            {!showUploader &&
                <>
                    <button type="button" onClick={loadAnotherHandler}>Load Another</button>
                    <br></br>
                </>
            }

            <div id="successImage"></div>

            <button type='button' onClick={returnHomeHandler}>Home</button>
        </div>
    )
}

export default Uploader
