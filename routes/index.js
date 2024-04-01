var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
var model_user = require('../models/model_user.js');
router.get('/', async function(req, res, next) {
  try {
    let id = req.session.userId
    let data = await model_user.getID(id)
    if (data.length > 0) {
      if (data[0].level_users != 2) {
        res.redirect('/logout')
      } else {
        res.render('user/index', {
          email: data[0].email
        })
      }  
    } else {
      res.status(401).json({error: 'user tidak ada'})  
    }   
  } catch (error) {
    res.status(501).json('butuh akses login')
  }
});

router.get('/register', function(req, res, next) {
  res.render('auth/register');
});

router.get('/login', function(req, res, next) {
  res.render('auth/login');
});

router.post('/saveuser', async function(req, res){
  let { email, password } = req.body
  let enskripsi = await bcrypt.hash(password, 5)
  let data = {
    email,
    password: enskripsi
  }
  model_user.Store(data)
  req.flash('success', 'Berhasil menyimpan')
  res.redirect('/login')
})

router.post('/login', async function(req, res) {
  let { email, password } = req.body
  try {
    let data = await model_user.login(email)
    if (data.length > 0) {
      let enkripsi = data[0].password
      let cek = await bcrypt.compare(password, enkripsi)
      if (cek) {
        req.session.userId = data[0].id_user
        if (data[0].level_users == 1) {
          res.redirect('/super')
        } else if(data[0].level_users ==2) {
          res.redirect('/')
        } else {
          req.flash('eror', 'gagal')
          res.redirect('/login')
        }
        
      } else {
        req.flash('error', 'Email atau password salah')
        res.redirect('/login')
      }
    } else {
      req.flash('error', 'Akun tidak ditemukan')
      res.redirect('/login')
    }
  } catch (error) {
    console.error(error)
    req.flash('error', 'Error pada fungsi')
    res.redirect('/login')
  }
})

router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      console.error(err)
    } else {
      res.redirect('/login')
    }
  })
})

module.exports = router;