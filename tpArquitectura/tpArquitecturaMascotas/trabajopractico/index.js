'use strict'

const express = require('express')
const bodyParser = require('body-parser') 
const jsonParser = bodyParser.json()
const mongoose = require('mongoose')

const Mascota = require('./modelos/mascota')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get(`/api/mascota`, (req, res) => {
    Mascota.find({}, (err, mascotas) =>{
        if (err) return res.status(500).send({message: `error al realizar la petición: ${err}`})
        if(!mascotas) return res.status(404).send({message: `No se han cargado mascotas`})
        res.status(200).send({mascotas : mascotas})
    })
})

app.get(`/api/mascota/:mascotaId`, (req, res) => {
    let mascotaId = req.params.mascotaId
    Mascota.findById(mascotaId,(err, mascota) => {
        if (err) return res.status(500).send({message: `error al realizar la petición: ${err}`})
        if(!mascota) return res.status(404).send({message: `La mascota no existe`})
        res.status(200).send({mascota : mascota }) 
    })
    
}) 

app.post(`/api/mascota`, jsonParser, function (req, res) {
    console.log('POST /api/mascota')
    console.log(req.body) // asi veo lo que llega y si hay errores

    let mascota = new Mascota()
    mascota.name=req.body.name,
    mascota.owner=req.body.owner,
    mascota.weight=req.body.weight,
    mascota.size=req.body.size,
    mascota.color = req.body.color

    mascota.save((err, mascotaGuardada) => {
        if (err) res.status(500).send({message:`Error al guardar mascota en la base de datos: ${error}`})
        res.status(200).send({mascota: mascotaGuardada})
    })
})    

app.put(`/api/mascota/:mascotaId`, (req, res) =>  {
    let mascotaId = req.params.mascotaId
    let bodyupdate = req.body // como tengo el parametro a updetear en el body, lo paso como parametro

    Mascota.findByIdAndUpdate(mascotaId, bodyupdate, (err, mascotaUpdated) => {
        if(err) res.status(500).send({message: `error al hacer update a la mascota: ${err}`})

        res.status(200).send({mascota : mascotaUpdated})

    })
})

app.delete(`/api/mascota/:mascotaId`, (req, res) =>  {
 let mascotaId = req.params.mascotaId

 Mascota.findById(mascotaId,(err, mascota) =>{
     if(err) res.status(500).send({message: `error al borrar mascota: ${err}`})

     mascota.remove(err =>{
        if(err) res.status(500).send({message: `error al borrar la mascota: ${err}`})
        res.status(200).send({message: `La mascota ha sido eliminada`})
     })

 })
})



mongoose.connect('mongodb://localhost/Mascota', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("la base de datos de mascotas esta ok")
    app.listen(port, () => {
        console.log(`API REST Mascota corriendo en http://localhost:${port}`) 
    }) 
  // conectamos
});
