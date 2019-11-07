const express = require('express')
const multer = require('multer')
const uploadConfig = require('./config/upload')

const SessionController = require('./controllers/SessionController')
const SpotController = require('./controllers/SpotController')
const DashboardController = require('./controllers/DashboardController')
const BookingController = require('./controllers/BookingController')
const ApprovalController = require('./controllers/ApprovalController')

const routes = express.Router()
const upload = multer(uploadConfig)

// users
routes.post('/users', SessionController.store)

// Spots
routes.get('/spots', SpotController.index)
routes.post('/spots', upload.single('thumbnail'), SpotController.store)
routes.delete('/spots/:spot_id', SpotController.remove)

// Booking
routes.post('/spots/:spot_id/bookings', BookingController.store)
routes.post('/bookings/:booking_id/approval', ApprovalController.store)

// Dashboard
routes.get('/dashboard', DashboardController.show)

module.exports = routes