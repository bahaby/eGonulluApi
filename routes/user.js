const express = require('express');
const sqlite = require('sqlite3');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/users',(req,res) => {
    const connection = new sqlite.Database('../sqlite.db');
    const queryString = "SELECT * FROM User WHERE Id = ?";
    const userId = req.body['userId'];

    connection.all(queryString,[userId],(err,rows,fields) => {
        if(err) {
            console.log("MySql de bir hata oluştu");
            res.sendStatus(500);
            res.end();
        }
        res.status(200).json({ statusCode: 200,
            Id : rows[0].Id,
            Tc : rows[0].Tc,
            Name : rows[0].Name,
            LastName : rows[0].LastName,
            Email : rows[0].Email,
            Phone : rows[0].Phone,
            PictureUrl : rows[0].PictureUrl,
            Twitter : rows[0].Twitter,
            WebSite : rows[0].WebSite,
            Instagram : rows[0].Instagram,
            Facebook : rows[0].Facebook,
            Password : rows[0].Password,
        });
    });
    connection.close();
    console.log("User data sent");
});

module.exports = router; 