var mysql = require('mysql');
var db_info = {
    host: 'my-database.cuvpu2awewds.ap-northeast-2.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'adminadmin',
    database: 'my_db'
}

module.exports = {
    init: function () {
        return mysql.createConnection(db_info);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    }
}
