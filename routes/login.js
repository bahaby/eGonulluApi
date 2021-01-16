const express = require('express');
const sqlite = require('sqlite3');
const router = express.Router();

/**
 * Kullanıcı Giriş Kontrolü
 * 
 * @params
 * @return json
 */
router.post('/login', (req, res) => {
    const connection = new sqlite.Database('../sqlite.db');
    const loginQuery = "SELECT * FROM User WHERE Email = ? and Password = ?";
    connection.all(loginQuery,[req.body['Email'],req.body['Password']],(err,rows,fields) => {
        if(err) {
            console.log("MySql de bir hata oluştu");
            res.status(400).json({statusCode: 400, message:err.message});
        }
        if(rows.length==1)
            res.status(200).json({statusCode: 200, message:"Giriş başarılı", 
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
        });
        else
            res.status(400).json({statusCode: 400, message:"Kullanıcı adı veya şifre hatalı"});
    });
    connection.close();
});

module.exports = router; 