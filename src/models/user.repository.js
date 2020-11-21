const User = require('./user.schema')

class UserRepository {

    //BUSCAR TODOS
    async find(query) {
            try {
                return await User.find(query).sort('name').limit(20).exec();
            } catch (error) {
                throw new Error("Erro ao buscar Usuario:  " + error.message)
            }
        }
        //BUSCAR POR NOME
    async findByName(name) {
            try {
                let query = {}
                if (name) {
                    let key = new RegExp(name, 'i')
                    query.name = key

                }
                return await this.find(query)
            } catch (error) {
                throw new Error("Erro ao buscar Usuario por nome" + error.message)
            }
        }
        //BUSCAR POR EMAIL
    async findByEmail(email) {

            try {
                return await User.findOne({
                    email: email
                }).exec();
            } catch (error) {
                throw new Error("Erro ao buscar Usuario por email " + error.message)
            }
        }
        //BUSCAR POR ID
    async findById(id) {
            try {
                return await User.findById(id).exec();

            } catch (error) {
                throw new Error("Erro ao buscar Usuario por ID" + error.message)

            }
        }
        //SALVAR DADOS 
    async save(data) {
            console.log(data);
            try {
                if (!data._id) {
                    return await User.create(data)
                } else {
                    return await User.findByIdAndUpdate(data._id, data)
                }
            } catch (error) {
                throw new Error("Erro ao salvar Usuario" + error.message)

            }
        }
        //APAGAR DADOS
    async delete(id) {
        try {
            return awaitUser.findByIdAndDelete(id)
        } catch (error) {
            throw new Error("Erro ao apagar Usuario" + error.message)
        }
    }
}
module.exports = new UserRepository();