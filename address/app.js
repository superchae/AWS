var express = require('express');
var app = express();
var db_config = require(__dirname + '/config/database.js');
var conn = db_config.init();
var bodyParser = require('body-parser');

db_config.connect(conn);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.get('/', function (req, res) {
    return res.redirect('/list');
});

app.get('/list', function (req, res) {
    var sql = 'SELECT * FROM my_db.address_table';    
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else res.render('list.ejs', {contacts : rows});
    });
});

app.get('/write', function (req, res) {
    res.render('write.ejs');
});

app.post('/writeAf', function (req, res) {
    var body = req.body;
    console.log(body);

    var sql = 'INSERT INTO my_db.address_table (name, number, email) VALUES(?, ?, ?)';
    var params = [body.name, body.number, body.email];
    console.log(sql);
    conn.query(sql, params, function(err) {
        if(err) console.log('query is not excuted. INSERT fail...\n' + err);
        else res.redirect('/list');
    });
});

app.get('/update/:id', function (req, res) {
    // console.log('id??', req.params.id);
    let sql = `SELECT * FROM my_db.address_table WHERE id=${req.params.id}`;
    conn.query(sql, function(err, rows, fileds){
        if(err) console.log('query is not excuted. SELECT fail...\n' + err);
        else {
            console.log(rows);
            res.render('update.ejs', {contact : rows[0]});
        }
    });
});

app.post('/updateAf/:id', function (req, res) {
    console.log(req.body);
    console.log(req.params.id);
    let sql = `UPDATE my_db.address_table 
                SET name='${req.body.name}', number='${req.body.number}', email='${req.body.email}'
                WHERE id=${req.params.id}`;
    conn.query(sql, function(err) {
        if(err) console.log('query is not excuted. UPDATE fail...\n' + err);
        else res.redirect('/list');
    })
});

app.get('/delete/:id', function (req, res) {
    // console.log('id??', req.params.id);
    let sql = `DELETE FROM my_db.address_table WHERE id=${req.params.id}`;
    conn.query(sql, function(err){
        if(err) console.log('query is not excuted. DELETE fail...\n' + err);
        else res.redirect('/list');
    });
});

app.get('/search', function (req, res) {
    console.log(req.query);
    let sql = `SELECT * FROM my_db.address_table WHERE ${req.query.field}='${req.query.info}'`;
    conn.query(sql, function(err, rows, fileds){
        if(err) console.log('query is not excuted. SELECT fail...\n' + err);
        else {
            console.log(rows);
            res.render('list.ejs', {contacts : rows});
        }
    });
});

app.listen(8080, () => console.log('Server is running on port 8080...'));
