import $ from 'jquery';
import ImageUploader from 'react-image-upload'
import 'react-image-upload/dist/index.css'
import { createRoot } from 'react-dom/client';
import React, { ReactDOM } from 'react';
import { Modal } from 'react-bootstrap';
import { render } from '@testing-library/react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { Form } from 'react-bootstrap';
import { useEffect } from 'react';


var count = 0;
var count1 = 0;

String.prototype.turkishtoEnglish = function () {
    return this.replace('Ğ', 'g')
        .replaceAll('Ü', 'u')
        .replaceAll('Ş', 's')
        .replaceAll('I', 'i')
        .replaceAll('İ', 'i')
        .replaceAll('Ö', 'o')
        .replaceAll('Ç', 'c')
        .replaceAll('ğ', 'g')
        .replaceAll('ü', 'u')
        .replaceAll('ş', 's')
        .replaceAll('ı', 'i')
        .replaceAll('ö', 'o')
        .replaceAll('ç', 'c');
};

const MenuItems = () => {
    var menuName = window.location.href.split('/')[4];
    var menuNameBeforeSave;



    useEffect(() => {

        fetch('http://localhost:3001/getMenu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                menuName: menuName
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                menuNameBeforeSave = data.menuName;
                document.getElementById('menuName').value = data.menuName;
                console.log(menuNameBeforeSave);
                data.menuJSON.map((item) => {
                    if (item.foodCategory) {
                        var foodCategory = document.createElement('input');
                        foodCategory.setAttribute('type', 'text');
                        foodCategory.setAttribute('placeholder', 'Food Category');
                        foodCategory.setAttribute('id', 'foodCategory' + ' ' + count);
                        foodCategory.setAttribute('class', 'foodCategory');
                        foodCategory.setAttribute('value', item.foodCategory);
                        document.getElementById('menuItems').appendChild(foodCategory);
                    }
                    else if (item.foodName) {

                        var foodName = document.createElement('input');
                        foodName.setAttribute('type', 'text');
                        foodName.setAttribute('placeholder', 'Food Name');
                        foodName.setAttribute('id', 'foodName' + ' ' + count1);
                        foodName.setAttribute('value', item.foodName);
                        document.getElementById('menuItems').appendChild(foodName);

                    }
                    else if (item.foodPrice) {
                        var foodPrice = document.createElement('input');
                        foodPrice.setAttribute('type', 'text');
                        foodPrice.setAttribute('placeholder', 'Food Price');
                        foodPrice.setAttribute('id', 'foodPrice' + ' ' + count1);
                        foodPrice.setAttribute('value', item.foodPrice);
                        document.getElementById('menuItems').appendChild(foodPrice);
                    }
                    else if (item.foodUploadImage) {


                        var foodUploadImage = document.createElement('input');
                        foodUploadImage.setAttribute('type', 'file');
                        foodUploadImage.setAttribute('name', "file");
                        foodUploadImage.setAttribute('id', 'foodUploadImage' + ' ' + count1 + ' ' + 'fileInput');
                        foodUploadImage.setAttribute('class', 'foodUploadImage');
                        foodUploadImage.setAttribute('accept', 'image/*');
                        foodUploadImage.setAttribute('enctype', 'multipart/form-data');
                        foodUploadImage.setAttribute('placeholder', item.foodUploadImage);
                        foodUploadImage.setAttribute('value', item.foodUploadImage);
                        document.getElementById('menuItems').appendChild(foodUploadImage);
                        count1++;

                        var menuID = data.menuDIR;
                        var imagePath = item.foodUploadImage;
                        var newPath = imagePath.replaceAll("C:\\fakepath\\", "");
                        var uploadPath = "http://localhost:3001/uploads/" + menuID + "/" + newPath;

                        var foodImage = document.createElement('img');
                        foodImage.setAttribute('src', uploadPath);
                        foodImage.setAttribute('id', 'foodImage' + ' ' + count1 + ' ' + 'fileInput');
                        foodImage.setAttribute('class', 'foodImage');
                        foodImage.setAttribute('width', '100px');
                        foodImage.setAttribute('height', '100px');
                        document.getElementById('menuItems').innerHTML += foodImage.outerHTML;
                    }
                    else if (item.foodbreak) {
                        var foodbreak = document.createElement('br');
                        foodbreak.setAttribute('id', 'foodbreak');
                        document.getElementById('menuItems').appendChild(foodbreak);
                    }

                }).join('');
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
}









function uploadImage() {

    for (var i = 0; i < count1; i++) {
        var fileInput = document.getElementById('foodUploadImage' + ' ' + i + ' ' + 'fileInput');
        var file = fileInput.files[0];
        var formData = new FormData();
        formData.append('file', file);
        console.log(formData);
        fetch('http://localhost:3001/fileUpload', {
            method: 'POST',
            headers: {
                'user_id': localStorage.getItem('userid')
            },
            body: formData

        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            }
            )
    }
}


const saveMenu = () => {
    const menuTemplate = [];

    var temp = (document.getElementById('menuItems').childNodes);

    for (var i = 0; i < temp.length; i++) {
        if (temp[i].id.includes('foodCategory')) {
            menuTemplate.push({ foodCategory: temp[i].value });
        }
        else if (temp[i].id.includes('foodName')) {
            menuTemplate.push({ foodName: temp[i].value });
        }
        else if (temp[i].id.includes('foodPrice')) {
            menuTemplate.push({ foodPrice: temp[i].value });
        }
        else if (temp[i].id.includes('foodUploadImage')) {

            if (temp[i].value == "") {
                menuTemplate.push({ foodUploadImage: temp[i].placeholder });
            }
            else {
                menuTemplate.push({ foodUploadImage: temp[i].value });
            }
        }
        else if (temp[i].id.includes('foodbreak')) {
            menuTemplate.push({ foodbreak: "break" });
        }
    }
    console.log(menuTemplate);

    fetch('http://localhost:3001/updateMenu', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            menuJSON: menuTemplate,
            menuName: document.getElementById('menuName').value,
            userid: localStorage.getItem('userid')

        })
    }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
        }
        )

    uploadImage();

}









function NewMenu() {
    return (
        <div>
            <h1>Update Menu</h1>
            <input id="menuName" />
            <MenuItems />
            <div id="menuItems"></div>
            <button onClick={saveMenu}>Save Menu</button>

        </div>
    );
}

export default NewMenu;

