const express = require('express')
const router = express.Router()

const connect = require('../config/db.js')
const model_pemilik = require('../models/model_pemilik.js');

router.get('/', async function(req, res, next){
    let Rows = await model_pemilik.getAll();
    res.render('pemilik/index', {
        data: Rows
    });
})

router.get('/create', function(req,res){
    res.render('pemilik/create', {
        nama_pemilik: '',
        alamat: '',
        no_hp: '',
    })
})

router.get('/edit/(:id)', async function(req, res){
    const id = req.params.id;
    let rows = await model_pemilik.getId(id);

    res.render('pemilik/edit', {
        id:rows[0].id_pemilik,
        nama_pemilik: rows[0].nama_pemilik,
        alamat: rows[0].alamat,
        no_hp: rows[0].no_hp,
    })
})

router.post('/store', async function(req, res){
    try {
        let {nama_pemilik, alamat, no_hp } = req.body
        console.log(alamat)
        let Data = {
            nama_pemilik,
            alamat,
            no_hp
        }
        await model_pemilik.Store(Data)
        req.flash('success', 'Berhasil menyimpan')
        res.redirect('/pemilik')
    } catch {
        req.flash('error', 'Terjadi Kesalahan')
        res.render('/pemilik')
    }
})

router.post('/update/(:id)', async function(req, res){
    try{
        const id = req.params.id;
        let {nama_pemilik, alamat, no_hp } = req.body
        let Data = {
            nama_pemilik,
            alamat,
            no_hp
        }
        await model_pemilik.Update(id, Data) 
        req.flash('success', 'Berhasil mengupdate')
        res.redirect('/pemilik')
    } catch(error) {
        req.flash('error','terjadi kesalahan pada fungsi')
        res.render('/pemilik')
    }
    
})


router.get('/delete/(:id)', async function(req, res) {
    const id = req.params.id
    await model_pemilik.Delete(id)
    req.flash('success','pemilik berhasil dihapus')
    res.redirect('/pemilik')
})

module.exports = router