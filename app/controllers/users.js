const { httpError } = require('../helpers/handleError');
const userModel = require('../models/users')
const { db } = require('../../config/firebase')

const getItems = async (req, res) => {
    try {
        //const listAll = await userModel.find({}) //mongo
        const querySnapshot = await db.collection('usuarios').get() //firebase
        const usuarios = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        res.send({ data: usuarios }) // cambiar querysnapshot por listAll si se usa mongo
    } catch (e) {
        httpError(res, e)
    }
}

const getItem = async (req, res) => {
    try {
        const doc = await db.collection('usuarios').doc(req.params.id).get()

        res.send({ status: 'usuario obtenido', data: { id: doc.id, ...doc.data() } })
    } catch (e) {
        httpError(res, e)
    }
}

const createItem = async (req, res) => {
    try {
        const { nombre, renovo, correo, contrasena } = req.body
        //const resDetail = await userModel.create({ name, age, email })
        await db.collection('usuarios').add({
            nombre,
            renovo,
            correo,
            contrasena
        })
        res.send({ data: 'usuario creado' })
    } catch (e) {
        httpError(res, e)
    }
}

const updateItem = async (req, res) => {
    try {
        await db.collection('usuarios').doc(req.params.id).update(req.body)

        res.send({ data: 'usuario editado' })
    } catch (e) {
        httpError(res, e)
    }
}

const deleteItem = async (req, res) => {
    try {
        await db.collection('usuarios').doc(req.params.id).delete()

        res.send({ data: 'usuario eliminado' })
    } catch (e) {
        httpError(res, e)
    }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }