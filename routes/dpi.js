const express = require('express')
const router = express.Router()

const connect = require('../config/db.js')
const model_dpi = require('../models/model_dpi.js');

router.get('/', async function(req, res, next){
    let Rows = await model_dpi.getAll();
    res.render('dpi/index', {
        data: Rows
    });
})

router.get('/create', function(req,res){
    res.render('dpi/create', {
        nama_dpi: '',
        luas: '',
    })
})

router.get('/edit/(:id)', async function(req, res){
    const id = req.params.id;
    let rows = await model_dpi.getId(id);

    res.render('dpi/edit', {
        id:rows[0].id_dpi,
        nama_dpi: rows[0].nama_dpi,
        luas: rows[0].luas,
    })
})

router.post('/store', async function(req, res){
    try {
        let {nama_dpi, luas } = req.body
        let Data = {
            nama_dpi,
            luas
        }
        await model_dpi.Store(Data)
        req.flash('success', 'Berhasil menyimpan')
        res.redirect('/dpi')
    } catch {
        req.flash('error', 'Terjadi Kesalahan')
        res.render('/dpi')
    }
})

router.post('/update/(:id)', async function(req, res){
    try{
        const id = req.params.id;
        let {nama_dpi, luas } = req.body
        let Data = {
            nama_dpi,
            luas
        }
        await model_dpi.Update(id, Data) 
        req.flash('success', 'Berhasil mengupdate')
        res.redirect('/dpi')
    } catch(error) {
        req.flash('error','terjadi kesalahan pada fungsi')
        res.render('/dpi')
    }
    
})


router.get('/delete/(:id)', async function(req, res) {
    const id = req.params.id
    await model_dpi.Delete(id)
    req.flash('success','dpi berhasil dihapus')
    res.redirect('/dpi')
})

module.exports = router