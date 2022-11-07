'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MascotaSchema = Schema({
    name:String,
    onwer: String,
    weight: {type :Number, default:0},
    size: {type: String, enum:['pequeño','mediano', 'grande']},
    color: String
})

module.exports = mongoose.model('Mascota', MascotaSchema )