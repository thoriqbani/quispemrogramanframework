var express = require('express');
var router = express.Router();
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const Model_kapal = require('../models/model_kapal');
const Model_produk = require('../models/model_produk');
const Model_users = require('../models/model_user');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/upload");
    },
    filename: (req, file, cb) =>{
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage:storage});

router.get('/', async function(req, res, next) {
    try {
        let id = req.session.userId;
        let Data = await Model_users.getID(id);
        if (Data.length > 0) {
            let rows = await Model_produk.getAll();
            console.log("Data berhasil diambil:", rows); // Menampilkan data yang berhasil diambil dari database
            res.render('produk/index', {
                data: rows
            });
        }
    } catch (error) {
        console.log("Terjadi kesalahan:", error); // Menampilkan pesan kesalahan jika terjadi kesalahan saat menjalankan kode
        // res.redirect('/login');
    }
});

router.get('/create', async function(req,res,next){
    let rows = await Model_kapal.getAll();
    res.render('produk/create',{
        data: rows
    })
})
router.post('/store', upload.single("foto_produk"), function(req, res, next){
    try{
        let {nama_produk, harga_produk, id_kapal} = req.body;
        let Data = {
            nama_produk,
            harga_produk,
            id_kapal,
            foto_produk: req.file.filename
        }
        Model_produk.Store(Data);
        req.flash('success','Berhasil Menyimpan Data');
        res.redirect('/produk')
    }catch{
        req.flash('error', 'gagal menyimpan data');
        res.redirect('/produk')
    }
})

router.get('/edit/(:id)', async function(req, res, next){
    let id = req.params.id;
    let kapalRows = await Model_kapal.getAll();
    let rows = await Model_produk.getId(id);

    res.render('produk/edit',{
        data: kapalRows,
        id:         rows[0].id_produk,
        nama_produk:        rows[0].nama_produk,
        harga_produk:        rows[0].harga_produk,
        foto_produk:        rows[0].foto_produk,
        id_kapal:        rows[0].id_kapal,
        nama_kapal:        rows[0].nama_kapal,
    })
})

router.post('/update/(:id)', upload.single("foto_produk"), async function(req,res, next){
    let id = req.params.id;
    let filebaru = req.file ? req.file.filename : null;
    let rows = await Model_produk.getId(id);
    const namaFileLama = rows[0].foto_produk;

    if(filebaru && namaFileLama){
        const pathFileLama = path.join(__dirname,'../public/images/upload', namaFileLama);
        fs.unlinkSync(pathFileLama);
    }
    let {nama_produk,harga_produk, id_kapal} = req.body;
    let foto_produk = filebaru || namaFileLama;
    let Data ={
        nama_produk,
        harga_produk,
        id_kapal,
        foto_produk
    }
    Model_produk.Update(id, Data);
    req.flash('success', 'Berhasil update data');
    res.redirect('/produk')
})

router.get('/delete/(:id)', async function(req,res,next){
    let id = req.params.id;
    let rows = await Model_produk.getId(id);
    const namaFileLama = rows[0].foto_produk;
    if(namaFileLama){
        const pathFileLama = path.join(__dirname,'../public/images/upload',namaFileLama);
        fs.unlinkSync(pathFileLama);
    }
    await Model_produk.Delete(id);
    req.flash('success', 'berhasil menghapus data');
    res.redirect('/produk')
})

module.exports = router