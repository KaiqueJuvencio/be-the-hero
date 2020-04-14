const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({ //await junto com o async faz com que espere o termino da insercao pra depois retornar o response.json
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id });
    }
};