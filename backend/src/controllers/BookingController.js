const Booking = require('../models/Booking')
const Spot = require('../models/Spot')
const User = require('../models/User')

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers
        const { spot_id } = req.params
        const { date } = req.body

        const spot = await Spot.findById(spot_id)
        if (!spot) {
            res.status(404).json({ error: 'Spot does not exists. '})
        }

        const user = await User.findById(user_id)
        if (!user) {
            return res.status(400).json({ error: 'User does not exists.' })
        }
        
        const booking = await Booking.create({
            date: date,
            spot: spot_id,
            user: user_id
        })

        await booking.populate('spot').populate('user').execPopulate()

        // Send websocket to spot's owner
        const ownerSocket = req.connectedUsers[booking.spot.user]
        if (ownerSocket) {
            req.io.to(ownerSocket).emit('booking_request', booking)
        }

        return res.status(201).json(booking)
    }
}