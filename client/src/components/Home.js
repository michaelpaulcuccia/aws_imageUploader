import React from 'react'

const Home = ({ history }) => {


    const buttonHandler = () => {
        history.push('/uploader')
    }

    return (
        <div>
            <p>Welcome to AWS Photo Uploader!</p>
            <br></br>
            <div>
                <button type='button' onClick={buttonHandler}>Vist Uploader Component</button>
            </div>
        </div>
    )
}

export default Home
