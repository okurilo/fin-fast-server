var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('Empty page...Please visit api page (/api).');
  let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.render('empty', { text: 'Empty page...Please visit api page (/api).', link: 'api', linkTxt: 'Перейти' });
});

module.exports = router;
