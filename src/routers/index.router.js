const express = require('express')
const router = express.Router()

const airbnbCtr = require("../controllers/airbnb.controller")

const vs = "/api/v1"

// Realización de los Endpoints requridos

// Consultar la información de todas las propiedades
router.get(vs + "/airbnb/all-properties", airbnbCtr.consultarAirbnb)
    // Consulta los tipos de propiedades que hay
    .get(vs + "/airbnb/types", airbnbCtr.consultarTiposAirbnb)
    .get(vs + "/airbnb/reviews", airbnbCtr.consultarReviewsAirbnb)

module.exports = router




