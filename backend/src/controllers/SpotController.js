const User = require('../models/User')
const Spot = require('../models/Spot')

module.exports = {

    async index(req, res) {
        const { tech } = req.query
        const spots = await Spot.find({ techs: tech })

        return res.json(spots)
    },

    async remove(req, res) {
        const { spot_id } = req.params
        const result = await Spot.deleteOne({_id: spot_id })

        return res.status(200).json({})
    },

    async store(req, res) {
        const { filename } = req.file
        const { company, price, techs } = req.body
        const { user_id } = req.headers

        const user = await User.findById(user_id)
        if (!user) {
            return res.status(404).json({ error: 'User does not exists' })
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            techs: techs.split(',').map(tech => tech.trim()),
            price,
            company
        })

        return res.json(spot)
    }
}