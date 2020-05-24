var express = require('express');
var router = express.Router();
const RootController = require('RootController');
var Message = require('../models/message');

//get all messages
router.get('/', function(req, res, next){
    try{
        Message.find()
            .exec(function(err, result){
                if(err){
                    return res.status(500).json({
                        success: false,
                        message: 'Erro ao tentar carregar as mensagens.',
                        data: err
                    });
                }

                res.status(200).json({
                    success: true,
                    message: "Mensagens carregadas com sucesso.",
                    data: result
                });
            });
    }catch(err) {
        console.log(err);
        throw Error();
    }
});

//create a new message
router.post('/', function (req, res, next) {
    try{
        var message = new Message({
            content: req.body.content
        });
        
        message.save(function(err, result){
            if(err){
                return res.status(500).json({
                    success: false,
                    message: 'Ocorreu um erro ao tentar cadastrar a mensagem.',
                    data: err
                });
            }
            res.status(200).json({
                success: true,
                message: "Mensagem salva com sucesso",
                data: result
            });

        });
    }
    catch(err) {
        console.log(err);
        throw Error();
    }
});

//delete message
router.delete('/', function (req, res, next) {
    try{
        var { messageId } = req.body.content;

        Message.deleteOne({ _id: messageId }, function(err, result){
            if(err){
                return res.status(500).json({
                    success: false,
                    message: 'Erro ao tentar excluir a mensagem.',
                    data: err
                });
            }

            res.status(200).json({
                success: true,
                message: "Mensagem deletada com sucesso.",
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