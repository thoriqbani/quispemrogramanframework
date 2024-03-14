const express = require('express')
const router = express.Router()

const connect = require('../config/db.js')
const model_alattangkap = require('../models/model_alattangkap.js');

router.get('/', async function(req, res, next){
    let Rows = await model_alattangkap.getAll();
    res.render('alattangkap/index', {
        data: Rows
    });
})

router.get('/create', function(req,res){
    res.render('alattangkap/create', {
        nama_alattangkap: '',
    })
})

router.get('/edit/(:id)', async function(req, res){
    const id = req.params.id;
    let rows = await model_alattangkap.getId(id);

    res.render('alattangkap/edit', {
        id:rows[0].id_alattangkap,
        nama_alattangkap: rows[0].nama_alattangkap,
    })
})

router.post('/store', async function(req, res){
    try {
        let {nama_alattangkap} = req.body
        let Data = {
            nama_alattangkap,
        }
        await model_alattangkap.Store(Data)
        req.flash('success', 'Berhasil menyimpan')
        res.redirect('/alattangkap')
    } catch {
        req.flash('error', 'Terjadi Kesalahan')
        res.render('/alattangkap')
    }
})

router.post('/update/(:id)', async function(req, res){
    try{
        const id = req.params.id;
        let {nama_alattangkap} = req.body
        let Data = {
            nama_alattangkap,
        }
        await model_alattangkap.Update(id, Data) 
        req.flash('success', 'Berhasil mengupdate')
        res.redirect('/alattangkap')
    } catch(error) {
        req.flash('error','terjadi kesalahan pada fungsi')
        res.render('/alattangkap')
    }
    
})


router.get('/delete/(:id)', async function(req, res) {
    const id = req.params.id
    await model_alattangkap.Delete(id)
    req.flash('success','alattangkap berhasil dihapus')
    res.redirect('/alattangkap')
})

module.exports = router