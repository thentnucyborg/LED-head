var express = require('express');
var router = express.Router();
var viewsPath = path.join(__dirname + '../views/

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(viewsPath, 'index.html'));
});


module.exports = router;