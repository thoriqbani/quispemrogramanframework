let mysql = require('mysql')
let connect = mysql.createConnection({
    host:'localhost',
    user:'root',
    password : '',
    database : 'kapal'
})

connect.connect(function (error){
    if(error){
        console.log(error)
    }else{
        console.log('koneksi berhasil')
    }
})

module.exports = connect