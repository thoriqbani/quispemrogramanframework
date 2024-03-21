var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt')

var model_user = require('../models/model_user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user/index');
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
        req.flash('success', 'Berhasil Login')
        res.redirect('/')
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