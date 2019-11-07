const Booking = require('../models/Booking')

module.exports = {
    async store(req, res) {
        const { booking_id } = req.params
        const { approved } = req.body

        const booking = await Booking.findById(booking_id).populate('spot')
        booking.approved = approved
        booking.save()

        // Send websocket to booking requester
        const bookingUserSocket = req.connectedUsers[booking.user]
        if (bookingUserSocket) {
            req.io.to(bookingUserSocket).emit('booking_response', booking)
        }

        return res.json(booking)
    }
}