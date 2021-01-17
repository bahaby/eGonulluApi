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
        });
        else
            res.status(400).json({statusCode: 400, message:"Kullanıcı adı veya şifre hatalı"});
    });
    connection.close();
    console.log("user logged in");
});

module.exports = router; 