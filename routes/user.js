const express = require('express');
const sqlite = require('sqlite3');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

/**
 * Sistemdeki Kullanıcıları Json Formatında Listeler
 * 
 * @param 
 * @return json
 */

/**
 * İd belirtilen kişinin bilgilerini döndürür.
 * 
 * @param var İd
 * @return json
 */
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
        console.log("I think we fetched users successfuly");
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
        });
    });
    connection.close();
});

/**
 * Yeni Kullanıcı oluşturur
 * 
 * @params
 * @return json
 */
/* router.post('/user', (req,res) => {
    const connection = getConnection();
    const isAdded = "SELECT * FROM kullanicilar WHERE kullanici_adi = ?";

    connection.query(isAdded,[req.body.kullaniciAdi],(err,rows,fields) => {
        if(err) {
            console.log("MySql de bir hata oluştu");
            res.status(400).json({durumKodu: 400, mesaj:err.message});
        }
        if(rows.length==1)
            res.status(400).json({durumKodu: 400, mesaj:"Böyle bir kullanıcı daha önce kayıt olmuş"});
        else{ 
            const queryString = "INSERT INTO kullanicilar (kurum_adi,kullanici_adi,sifre) VALUES (?,?,?)";
            connection.query(queryString,[
                req.body.kurumAdi,
                req.body.kullaniciAdi,
                req.body.sifre
            ], (err,rows,fields) => {
                if(err){
                    res.status(400).json({durumKodu: 400, mesaj:err.message});
                }
                const insertId = rows['insertId'];
                const queryString = "INSERT INTO kullanici_adres (kullaniciId,adresAdi,il,ilce,adres) VALUES (?,?,?,?,?)";
                connection.query(queryString,[
                    insertId,
                    req.body.adresAdi,
                    req.body.il,
                    req.body.ilce,
                    req.body.adres
                ], (err,rows,fields) => {
                    if(err)
                        res.status(400).json({durumKodu: 400, mesaj:err.message});
                });
                res.status(201).json({durumKodu:201, mesaj: "Kullanıcı başarıyla oluşturuldu, giriş yapabilirsiniz"});
            });
        }
    });
        
});

/**
 * Mysql bağlantısını gerçekleştirir.
 * 
 * @param
 * @return void
 *
    function getConnection() {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'atikvar',
        });
    }
 */
module.exports = router; 