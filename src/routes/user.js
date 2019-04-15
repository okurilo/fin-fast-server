import { Router } from 'express';
import mongoose from 'mongoose';
import models from '../models';

const router = Router();
// const Users = mongoose.model('Users');

// var apiController = require('../controllers/api');

router.post('/login', function (req, res) {
    var post = req.body;
    var userId = post.userId,
        password = post.password;
      models.User
        .find({"username": userId})
        .exec(function (err, user) {
            if (err) return sendJsonResponse(res, 400, err);
            user = user[0] ? user[0] : res.send('Empty');
            if (userId === user.username && password === user.password) {
              req.session.logged_user = true;
              req.session.userId = userId;
              req.session.save();
              console.log("Session Id:", req.session.id);
            //   res.redirect('/my_secret_page');
              res.send('Apply');
            } else {
              res.send('Bad user/pass');
            }
        })    
    
});
router.get('/logout', function (req, res) {
  delete req.session.logged_user;
  delete req.session.userId;
//   res.redirect('/login');
    res.send('Logged out');
});   
router.post('/reg', function (req, res) {
    Users.create({
        username: req.body.userId,
        password: req.body.password
    }, function (err, user) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } {
            sendJsonResponse(res, 200, user);
        }
    });
});

export default router;