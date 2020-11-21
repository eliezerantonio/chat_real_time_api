const UserRepository = require('../models/user.repository');
const ChannelRepository = require('../models/channel.repository');

class ChannelController {
    async create(req, res, next) {
        try {
            let admin = await UserRepository.findById(req.body.userId)
            let channel = await ChannelRepository.save({
                name: req.body.name,
                admin: admin
            })
            return res.status(200).json({
                status: "success",
                message: "Canal criando com succeso",
                data: {
                    name: channel.name,
                    admin: admin.name
                }
            })
        } catch (error) {
            next(error)

        }

    }

    async view(req, res, next) {
        try {

            let channel = await ChannelRepository.findByName(req.params.name)
            return res.status(200).json({
                status: "success",
                message: 'Canal encontrado',
                data: {
                    name: channel.name,
                    admin: {
                        name: channel.admin.name,
                        email: channel.admin.email
                    }
                }
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new ChannelController()