const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const HandleResponse = require('./HandleResponse');

//get all messages
router.get('/list-all', function (req, res, next) {
    try {
        Message.find()
            .exec(function (err, result) {
                if (err) {
                    return res.status(500).json(HandleResponse.internalError('Erro ao tentar carregar as mensagens.', err));
                }

                res.status(200).json(HandleResponse.listSuccess('Mensagens carregadas com sucesso.', result));
            });
    } catch (err) {
        console.log(err);
        throw Error();
    }
});

//create a new message
router.post('/create', function (req, res, next) {
    try {
        const message = new Message({
            content: req.body.content,
            user: req.body.userId,
            userName: req.body.userName
        });

        message.save(function (err, result) {
            if (err) {
                return res.status(500).json(HandleResponse.internalError('Ocorreu um erro ao tentar cadastrar a mensagem.', err));
            }
            res.status(200).json(HandleResponse.success('Mensagem salva com sucesso', result));
        });
    }
    catch (err) {
        console.log(err);
        throw Error();
    }
});

//delete message
router.delete('/', function (req, res, next) {
    try {
        const { messageId } = req.body.content;

        Message.deleteOne({ _id: messageId }, function (err, result) {
            if (err) {
                return res.status(500).json(HandleResponse.internalError('Erro ao tentar excluir a mensagem.', err));
            }

            res.status(200).json(HandleResponse.success("Mensagem deletada com sucesso.", null));
        })
    }
    catch (err) {
        console.log(err);
        throw Error();
    }
});

module.exports = router;