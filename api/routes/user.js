const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Message = require('../models/message');
const HandleResponse = require('./HandleResponse');
const verifyJwt = require('../services/verifyJwt');
var jwt = require('jsonwebtoken');

//get user older messages
router.get('/get-my-old-messages', function (req, res, next) {
    try {
        const userId = req.body.userId;

        Message.find().where({ user: userId }).exec(function (err, result) {
            if (err) {
                return res.status(500).json(
                    HandleResponse.internalError('Ocorreu um erro ao tentar cadastrar o usuário.', err));
            }

            return res.status(200).json(HandleResponse.success('Mensagens antigas.', result));
        });

    } catch (err) {
        console.log(err);
        throw Error();
    }
});

//login 
router.post('/login', function (req, res, next) {
    try {
        User.findOne().where({ email: req.body.email }).exec(function (err, result) {
            if (err) {
                return res.status(500).json(
                    HandleResponse.internalError('Ocorreu um erro ao tentar cadastrar o usuário.', err));
            }

            if (result !== null) {
                if (result.email === req.body.email && result.password === req.body.password) {

                    var token = jwt.sign({ id: result._id }, "SECRET", {
                        expiresIn: 30000
                    });

                    return res.status(200).json(HandleResponse.loginResponse('Autenticado com sucesso.', result, token));

                } else {
                    return res.status(200).json(
                        HandleResponse.logicalError('Email ou senha incorretos.', null)
                    );
                }
            } else {
                return res.status(200).json(
                    HandleResponse.logicalError('Não foi encontrado nenhum usuário com esse e-mail.'), req.body.email);
            }

        })
    }
    catch (err) {
        console.log(err);
        throw Error();
    }
});

//register a new user
router.post('/register', function (req, res, next) {
    try {
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            email: req.body.email
        });

        User.findOne().where({ 'email': user.email }).exec(function (err, result) {
            if (err) {
                return res.status(500).json(
                    HandleResponse.internalError('Ocorreu um erro ao tentar cadastrar o usuário.', err));
            }
            if (result === null) {
                user.save(function (err, result) {
                    if (err) {
                        return res.status(500).json(
                            HandleResponse.internalError('Ocorreu um erro interno no servidor, tente novamente.', err));
                    }

                    return res.status(200).json(HandleResponse.success('Cadastrado com sucesso', result))
                });
            } else {
                return res.status(200).json(HandleResponse.logicalError('Já existe um usuário cadastrado com esse email.', user.email));
            }
        })

    } catch (err) {
        console.log(err);
        throw Error();
    }
});

//get all users
router.get('/list-all', verifyJwt, function (req, res, next) {
    try {
        User.find()
            .exec(function (err, result) {
                if (err) {
                    return res.status(500).json(
                        HandleResponse.internalError('Erro ao tentar carregar os usuários.', err));
                }
                return res.status(200).json(
                    HandleResponse.success("Usuários carregados com sucesso.", result));
            });
    } catch (err) {
        console.log(err);
        throw Error();
    }
});

//get a user by id
router.get('/get-by-id', verifyJwt, function (req, res, next) {
    try {
        const { userId } = req.body.userId;

        User.findOne().where({ _id: userId }).exec(function (err, result) {
            if (err) return res.status(500).json(
                HandleResponse.internalError('Ocorreu um erro interno ao tentar localizar o usuário.', err));

            if (result === null) {
                return res.status(404).json(
                    HandleResponse.internalError('Não foi localizado nenhum usuário com esse id.', userId)
                );
            } else {
                return res.status(200).json(
                    HandleResponse.success('Usuário encontrado com sucesso.', result));
            }
        });
    }
    catch (err) {
        console.log(err);
        throw Error();
    }
});

//delete user, the id needs to be informed on the request body
router.delete('/delete-by-id', function (req, res, next) {
    try {
        const { userId } = req.body.userId;

        User.deleteOne({ _id: userId }, function (err, result) {
            if (err) {
                return res.status(500).json(
                    HandleResponse.internalError('Ocorreu um erro ao tentar excluir o usuário. Tente novamente.', err));
            }

            return res.status(200).json(
                HandleResponse.success('Usuário deletado com sucesso.', result)
            );
        })
    }
    catch (err) {
        console.log(err);
        throw Error();
    }
});

module.exports = router;