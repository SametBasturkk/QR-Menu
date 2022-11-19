import React from "react";

import { Button, Carousel } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";


const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <div>
        <Button className={"SignIn"} onClick={() => loginWithRedirect()}>Log In</Button>
        <Button className="SignUp" onClick={() => loginWithRedirect()}>Sign Up</Button></div>;
};







function Home() {
    return (
        <div>
            <h1 className='Welcome'>Welcome To Restaurant Qr Menu</h1>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://wowslider.com/posts/data/upload/2017/04/onlyslides1.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://wowslider.com/posts/data/upload/2017/04/onlyslides1.jpg"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://wowslider.com/posts/data/upload/2017/04/onlyslides1.jpg"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default Home;