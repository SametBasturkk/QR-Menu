var express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require('sequelize');
var multer = require('multer');
var fs = require('fs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
});

var app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));


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


//connection to postgresql

const user = 'samet'
const host = 'x'
const database = 'qrmenu'
const password = 'x'
const port = '5432'


const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
    logging: false
})



//database creation

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
}, {
});

const Menu = sequelize.define('Menu', {
    menuName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    menuJSON: {
        type: DataTypes.JSON,
        allowNull: false
    },
    userID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    menuNameOriginal: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
}, {});




try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
    sequelize.sync()
} catch (error) {
    console.error('Unable to connect to the database:', error);
}




app.post("/api/users", async (req, res) => {
    console.log(req.body);
    userid = req.body.userid;
    userName = req.body.userName;

    const user = await User.findOne({
        where: {
            userID: userid
        }

    }).then(user => {
        if (user) {
            console.log("user exists");
        } else {
            console.log("user does not exist");
            User.create({
                userID: userid,
                firstName: userName,
            })
        }

    })


});

app.post("/saveMenu", async (req, res) => {
    console.log(req.body);
    menuName = req.body.menuName;

    menuNameOriginal = menuName;

    menuName = menuName.turkishtoEnglish();
    menuName = menuName.replaceAll(' ', '').toLowerCase();

    console.log(menuName);


    menuJSON = req.body.menuJSON;
    userid = req.body.userid;

    const menu = await Menu.findOne({
        where: {
            menuName: menuName
        }

    }).then(menu => {
        if (menu) {
            console.log("menu exists");
        } else {
            console.log("menu does not exist");
            Menu.create({
                menuName: menuName,
                menuJSON: menuJSON,
                menuNameOriginal: menuNameOriginal,
                userID: userid
            })
        }

    })

});


app.post("/getMenu", async (req, res) => {
    console.log(req.body);
    menuName = req.body.menuName;
    userid = req.body.userid;

    const menu = await Menu.findOne({
        where: {
            menuName: menuName
        }

    }).then(menu => {
        if (menu) {
            console.log("menu exists");
            const menuPOST = {
                menuName: menu.menuName,
                menuJSON: menu.menuJSON,
                menuNameOriginal: menu.menuNameOriginal,
                menuDIR: menu.userID.slice(1, -10)
            }
            res.send(menuPOST);
            res.status(200);
        } else {
            console.log("menu does not exist");
            res.send("menu does not exist");
        }

    })

});

app.post("/fileUpload", upload.single('file'), (req, res, next) => {
    var user_id = req.headers.user_id;
    user_id = user_id.slice(1, -10);
    if (!fs.existsSync('./uploads/' + user_id)) {
        fs.mkdirSync('./uploads/' + user_id);
    }

    var oldpath = req.file.path;
    var newpath = './uploads/' + `${user_id}/` + req.file.filename;
    fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.status(200);

    });


});

app.post("/getMenuList", async (req, res) => {
    console.log(req.body);
    userid = req.body.userid;

    const menu = await Menu.findAll({
        where: {
            userID: userid
        }

    }).then(menu => {
        if (menu) {
            console.log("menu exists");
            res.send(menu);
            res.status(200);
        } else {
            console.log("menu does not exist");
            res.send("menu does not exist");
        }

    })

});

app.post("/deleteMenu", async (req, res) => {
    console.log(req.body);
    menuName = req.body.menuName;
    userid = req.body.userid;

    const menu = await Menu.findOne({
        where: {
            menuName: menuName
        }

    }).then(menu => {
        if (menu) {
            console.log("menu exists");
            menu.destroy();
            res.status(200);
        } else {
            console.log("menu does not exist");
            res.send("menu does not exist");
        }

    })

});


app.post("/menuUpdateDb", async (req, res) => {
    console.log(req.body);
    menuName = req.body.menuName;
    userid = req.body.userid;

    const menu = await Menu.findOne({
        where: {
            menuName: menuName
        }

    }).then(menu => {
        if (menu) {
            res.send(menu);
        } else {
            console.log("menu does not exist");
            res.send("menu does not exist");
        }

    })

});

app.post("/updateMenu", async (req, res) => {
    console.log(req.body);
});


console.log("Listening on port 3001");
app.listen(3001);
