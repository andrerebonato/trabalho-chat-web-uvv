function verifyJwt(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ success: false, message: 'Não foi informado nenhum token.' });

    jwt.verify(token, "SECRET", function (err, decoded) {
        if (err) return res.status(500).send({ success: false, message: 'Token expirado.' });
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyJwt;