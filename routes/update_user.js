const express = require('express');
const sqlite = require('sqlite3');
const router = express.Router();

/**
 * Kullanıcı Giriş Kontrolü
 * 
 * @params
 * @return json
 */
router.post('/update_user', (req,res) => {
    const connection = new sqlite.Database('../sqlite.db');
    const queryString = "UPDATE User SET  Tc = ?, Name = ?, LastName = ?, Email = ?, Phone = ?, PictureUrl = ?, Twitter = ?, Instagram = ?, WebSite = ?, Facebook = ?, Password = ? WHERE Id = ?";

    connection.all(queryString,[
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
        req.body.Password,
        req.body.Id
    ],(err,rows,fields) => {
        if(err) {
            console.log("MySql de bir hata oluştu");
            res.status(400).json({durumKodu: 400, mesaj:err.message});
        }
        res.status(201).json({statusCode:201, message: "Kullanıcı başarıyla güncellendi"});
        
        connection.close();
        console.log("user updated");
    });

});
module.exports = router;