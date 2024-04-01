var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
var model_user = require('../models/model_user.js');
router.get('/', async function(req, res, next) {
    try {
      let id = req.session.userId
      let data = await model_user.getID(id)
      if (data.length > 0) {
        if (data[0].level_users != 1) {
          res.redirect('/logout')
        } else {
          res.render('user/super', {
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

module.exports = router;