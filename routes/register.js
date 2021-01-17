const express = require('express');
const sqlite = require('sqlite3').verbose();
const router = express.Router();

/**
 * Kullanıcı Giriş Kontrolü
 * 
 * @params
 * @return json
 */
router.post('/register', (req,res) => {
    const connection = new sqlite.Database('../sqlite.db');
    const isAdded = "SELECT * FROM User WHERE Email = ?";

    connection.all(isAdded,[req.body.Email],(err,rows,fields) => {
        if(err) {
            console.log("MySql de bir hata oluştu");
            res.status(400).json({durumKodu: 400, mesaj:err.message});
        }
        if(rows.length==1)
            res.status(400).json({durumKodu: 400, mesaj:"Böyle bir kullanıcı daha önce kayıt olmuş"});
        else{ 
            const queryString = "INSERT INTO User ( Tc, Name, LastName, Email, Phone, PictureUrl, Twitter, Instagram, WebSite, Facebook, Password ) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
            connection.run(queryString,[
                req.body.Tc,
                req.body.Name,
                req.body.LastName,
                req.body.Email,
                req.body.Phone,
                req.body.PictureUrl,
                req.body.Twitter,
                req.body.Instagram,
                req.body.WebSite,
                req.body.Facebook,
                req.body.Password
            ], function (err,rows,fields) {
                if(err){
                    res.status(400).json({statusCode: 400, message:err.message});
                }
                
                res.status(201).json({statusCode:200, message: "Kullanıcı başarıyla oluşturuldu, giriş yapabilirsiniz", userId: this.lastID});
            });
        }
        
        connection.close();
        console.log("user registered");
    });

});
module.exports = router;