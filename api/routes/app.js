var express = require('express');
var router = express.Router();
var xxd = require('../models/user');

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/node-mongodb-mongoose-user', function(req, res, next){
    xxd.findOne({}, function(err, documents){
        if(err) {
            return res.send('Erro');

        }
        res.render('node', {firstNameV: documents});
    }) 

});



router.post('/node-mongodb-mongoose-user', function(req, res, next) {
    var emailVar = req.body.emailBody;
    var userObject = new xxd({
        firstname: 'Vinicius',
        lastname: 'Rosalen',
        password: '1234senha',
        email: emailVar
    })

    userObject.save();

    res.redirect('/node-mongodb-mongoose-user');
});





module.exports = router;
