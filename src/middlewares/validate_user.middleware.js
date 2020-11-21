//vai fazer a verificacao do token

const jwt = require('jsonwebtoken');

const ValidateUser = async(req, res, next) => {
    try {
        let decoded = await jwt.verify(req.headers['x-access-token'], process.env.SECRET)

        print(req.body.userId)
        req.body.userId = decoded.id
        next()
    } catch (error) {
        return res.status(401).json({
            status: 'error',
            message: 'Erro ao validar token' + error.message,
            data: null,
        })
    }

}

module.exports = ValidateUser