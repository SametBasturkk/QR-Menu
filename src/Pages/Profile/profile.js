import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import { Field } from "rc-field-form";
import Input from "antd/lib/input/Input";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();


    return (
        isAuthenticated && (
            <div>
                <h2>Welcome {localStorage.getItem('username')}</h2>
            </div>
        )
    );
};

const ActiveMenu = () => {

    const [menuList, setMenuList] = useState(false);


    useEffect(() => {
        fetch("http://localhost:3001/getMenuList", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userid: localStorage.getItem('userid')
            })
        }).then((response) => response.json())

            .then((responseJson) => {
                console.log(responseJson);
                setMenuList(responseJson);
            }
            )
    }, [])

    return (
        <div>
            <ul>
                {menuList && menuList.map((item) => {
                    return (
                        <div>
                            <a id={item.menuName} href={"/menu/" + item.menuName}><li id={item.menuName} key={item.menuName} >{item.menuName}</li></a>
                            <button onClick={() => {
                                fetch("http://localhost:3001/deleteMenu", {
                                    method: "POST",
                                    headers: {
                                        Accept: "application/json",
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        menuName: item.menuName,
                                        userid: localStorage.getItem('userid')
                                    })
                                }).then((response) => response.json())

                                    .then((responseJson) => {
                                        console.log(responseJson);
                                    }
                                    )
                            }}>X</button>
                            <button><a href={"/updateMenu/" + item.menuName}>Edit</a></button>
                        </div>)
                })}
            </ul>
        </div>
    )
}





function ProfilePage() {
    return (
        <div>
            <Profile />
            <hr></hr>
            <h3>Active Menu's</h3>
            <ActiveMenu />
            <hr></hr>

            <a href="/newmenu">CreateMenu</a>
            <hr></hr>


        </div>
    );
}

export default ProfilePage;