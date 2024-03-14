const express = require('express')
const router = express.Router()

const connect = require('../config/db.js')
const model_kapal = require('../models/model_kapal.js');

router.get('/', async function(req, res, next){
    let Rows = await model_kapal.getAll();
    res.render('kapal/index', {
        data: Rows
    });
})

router.get('/create', function(req,res){
    res.render('kapal/create', {
        nama_kapal: '',
        id_pemilik: '',
        id_dpi: '',
        id_alattangkap: '',
    })
})

router.get('/edit/(:id)', async function(req, res){
    const id = req.params.id;
    let rows = await model_kapal.getId(id);

    res.render('kapal/edit', {
        id_kapal:rows[0].id,
        nama_kapal: rows[0].nama_kapal,
        id_pemilik: rows[0].id_pemilik,
        id_dpi: rows[0].id_dpi,
        id_alattangkap: rows[0].id_alattangkap,
    })
})

router.post('/store', async function(req, res){
    try {
        let {id_kapal, nama_kapal, id_pemilik,id_dpi,id_alattangkap } = req.body
        let Data = {
            id_kapal,
            nama_kapal,
            id_pemilik,
            id_dpi,
            id_alattangkap,
        }
        await model_kapal.Store(Data)
        req.flash('success', 'Berhasil menyimpan')
        res.redirect('/kapal')
    } catch {
        req.flash('error', 'Terjadi Kesalahan')
        res.redirect('/kapal')
    }
})

router.post('/update/(:id)', async function(req, res){
    try{
        const id = req.params.id;
        let {nama_kapal, id_pemilik,id_dpi,id_alattangkap } = req.body
        let Data = {
            nama_kapal,
            id_pemilik,
            id_dpi,
            id_alattangkap,
        }
        await model_kapal.Update(id, Data) 
        req.flash('success', 'Berhasil mengupdate')
        res.redirect('/kapal')
    } catch(error) {
        req.flash('error','terjadi kesalahan pada fungsi')
        res.render('/kapal')
    }
    
})


router.get('/delete/(:id)', async function(req, res) {
    const id = req.params.id
    await model_kapal.Delete(id)
    req.flash('success','kapal berhasil dihapus')
    res.redirect('/kapal')
})

module.exports = router