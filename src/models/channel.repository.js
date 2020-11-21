const Channel = require('./channel.schema')
const UserRepository = require('./user.repository');

class ChannelRepository {

    //BUSCAR TODOS
    async find(key) {
            try {
                let query = {};
                if (key) query.name = new RegExp(key, 'i')
                return await User.find(query).populate({
                    path: 'admin'
                }).sort('name').limit(20).exec();
            } catch (error) {
                throw new Error("Erro ao buscar Canal" + error.message)
            }
        }
        //BUSCAR POR NOME
    async findByName(name) {
            try {
                let query = {
                    name: name
                }
                return await this.findOne(query, {
                    history: {
                        $slice: 0
                    }
                }).populate({
                    path: 'admin'
                }).exec()
            } catch (error) {
                throw new Error("Erro ao buscar Canal pelo nome" + error.message)
            }
        }
        //BUSCAR HISTORY

    async findHistoryByName(name, page) {
            try {
                let query = {
                    name: name
                }
                let inicio = 20 * page
                let fim = 20
                let channel = await this.findOne(query, {
                    history: {
                        $slice: [inicio, fim]
                    }
                }).populate({

                })
                let channel2 = await this.findOne(query, {
                    history: {
                        $slice: 0
                    }
                }).populate({
                    path: 'history.user'
                }).exec()
                return channel.history
            } catch (error) {
                throw new Error("Erro ao buscar historico do  Canal pelo nome:" + error.message)
            }
        }
        //BUSCAR POR ID
    async findById(id) {
            try {
                return await (await Channel.findById(id)).exec();

            } catch (error) {
                throw new Error("Erro ao buscar Canal por ID" + error.message)

            }
        }
        //SALVAR DADOS 
    async save(data) {
            try {
                if (!data._id) {
                    return await Channel.create(data)
                } else {
                    return await Channel.findByIdAndUpdate(data._id, data)
                }
            } catch (error) {
                throw new Error("Erro ao salvar Canal " + error.message)

            }
        }
        //APAGAR DADOS
    async delete(channelName, userId) {
            try {
                let channel = await this.findByName(channelName)
                if (channel.admin.toString() != userId) {
                    throw new Error("Apenas o admin pode excluir o proprio  canal " + error.message)
                }
                return await Channel.findByIdAndDelete(id)
            } catch (error) {
                throw new Error("Erro ao apagar Usuario" + error.message)
            }
        }
        //add mensagem
    async addMessage(channelName, senderId, message) {

        try {
            let sender = await User.findById(senderId);
            let channel = await Channel.findOne({
                name: channelName
            })

            let newMessage = {
                user: sender,
                message: message,
                dateTime: new Date()
            }
            channel.history.unShift(newMessage);
            await Channel.save();
            return newMessage
        } catch (error) {
            throw new Error("Erro ao adicionar nova mensagem ao canal " + error.message)
        }
    }


}
module.exports = new ChannelRepository();