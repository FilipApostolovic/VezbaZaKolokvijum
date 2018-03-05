var mysql = require("mysql");
var express = require("express");
var app = express();
var port = 8888;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

connection.connect(function (error) {
    if (error) {
        console.log('Error');
    } else {
        console.log('Connected');
    }    
});
app.get("/Osobe", function (req, res) {
    var queryGetAll = 'SELECT * FROM studenti';
    connection.query(queryGetAll, function (err, result, rows) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(result);
    });
});

app.delete("/Osobe/:id", function (req, res) {
    var id = parseInt(req.params.id);
    var queryDelete = 'DELETE FROM studenti WHERE idStudent =' + id;
    connection.query(queryDelete, function (err, result, rows) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end();
    });
});

app.put("/Osobe/insert", function (req, res) {
    var ime = req.body.imePrezime;
    var godine = req.body.godina;
    var pol = req.body.pol;
    var vremeUpisa = Date.now();


    var queryInsert = "INSERT INTO studenti (imePrezime, brGodina, pol, vremeUpisa) VALUES ('" + ime + "', " + godine + ", " + pol + ", " + vremeUpisa + ")";
    connection.query(queryInsert, function (err, result, rows) {
        if (err) {
            console.log(err);
        } else { 
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end();
        }
    });
});




app.listen(port);