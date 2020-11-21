const UserRepository = require('../models/user.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {


    //METODO CRIAR USUARIO
    async create(req, res, next) {
            try {
                let user = await UserRepository.save({

                    email: req.body.email,
                    name: req.body.name,
                    password: req.body.password
                })
                return res.json({
                    status: "success",
                    message: "Usuario criando com sucesso!",
                    data: {
                        name: user.name,
                        email: user.email
                    }

                })
            } catch (error) {
                next(error)
            }
        }
        //AUTENTICACAO
    async authenticate(req, res, next) {
        try {
            //recebendo dados do formulario
            const email = req.body.email;

            let user = await UserRepository.findByEmail(email)

            if (!user) {
                return res.status(404).json({
                    status: "error",
                    message: "Email nao encontrado!",
                    data: null

                })
            }
            //validando as senhas
            let passwordIsValid = await bcrypt.compare(req.body.password, user.password);

            if (!passwordIsValid) {
                return res.status(404).json({
                    status: "error",
                    message: "senha nao confere",
                    data: null
                })
            }
            const token = jwt.sign({
                id: user._id
            }, process.env.SECRET, {
                expiresIn: '1d'
            })

            return res.status(200).json({
                status: "success",
                message: "Successo ao fazer login",
                data: {
                    user: {
                        name: user.name,
                        emil: user.ema,
                    },
                    token: token
                }

            })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()