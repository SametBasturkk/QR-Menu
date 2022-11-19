import { useState, useEffect } from "react";
var user_id = localStorage.getItem('user_id');

var url = window.location.href;
var menuNameURL = url.substring(url.lastIndexOf('/') + 1);
var menuNameOriginal;


const MenuDB = () => {
    fetch('http://localhost:3001/getMenu', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            menuName: menuNameURL
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            menuNameOriginal = data.menuNameOriginal;
            document.getElementById('MenuName').innerHTML = menuNameOriginal;
            document.getElementById('menuItems').innerHTML =
                data.menuJSON.map((item) => {
                    if (item.foodCategory) {
                        return '<h1 class=category style="font-weight:900">' + item.foodCategory + '</h1>';
                    }
                    else if (item.foodName) {
                        return `<span class=food>${item.foodName}</span>`;
                    }
                    else if (item.foodPrice) {
                        return `<span clas=price>${item.foodPrice}</span>`;
                    }
                    else if (item.foodUploadImage) {
                        var menuID = data.menuDIR;
                        var imagePath = item.foodUploadImage;
                        var newPath = imagePath.replaceAll("C:\\fakepath\\", "");
                        var uploadPath = "http://localhost:3001/uploads/" + menuID + "/" + newPath;
                        return `<img class=foodImage src=${uploadPath} />`;
                    }
                    else if (item.foodbreak) {
                        return `<br></br>`;
                    }

                }).join('');
        })
        .catch(err => {
            console.log(err);
        })
}




function Menu() {
    return (
        <div>
            <h1 id="MenuName"></h1>
            <MenuDB />
            <div id="menuItems"> </div>


        </div>
    );
}

export default Menu;