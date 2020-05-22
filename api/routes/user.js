var express = require('express');
var router = express.Router();
const RootController = require('./RootController');
var Message = require('../models/user');

//get all users
router.get('/', function(req, res, next){
    try{
        User.find()
            .exec(function(err, result){
                if(err){
                    return res.status(500).json({
                        success: false,
                        message: 'Erro ao tentar carregar os usuários.',
                        data: err
                    });
                }

                res.status(200).json({
                    success: true,
                    message: "Usuários carregados com sucesso.",
                    data: result
                });
            });
    }catch(err) {
        console.log(err);
        throw Error();
    }
});

//create a new user
router.post('/', function (req, res, next) {
    try{
        var user = new User({
            content: req.body.content
        });
        
        user.save(function(err, result){
            if(err){
                return res.status(500).json({
                    success: false,
                    message: 'Ocorreu um erro ao tentar cadastrar o usuário.',
                    data: err
                });
            }
            res.status(200).json({
                success: true,
                message: "Usuário salvo com sucesso",
                data: result
            });

        });
    }
    catch(err) {
        console.log(err);
        throw Error();
    }
});

//delete user
router.delete('/', function (req, res, next) {
    try{
        var { userId } = req.body.content;

        User.deleteOne({ _id: userId }, function(err, result){
            if(err){
                return res.status(500).json({
                    success: false,
                    message: 'Erro ao tentar excluir o usuário.',
                    data: err
                });
            }

            res.status(200).json({
                success: true,
                message: "Usuário deletado com sucesso.",
                data: null
            });
        })
    }
    catch(err) {
        console.log(err);
        throw Error();
    }
});

module.exports = router;