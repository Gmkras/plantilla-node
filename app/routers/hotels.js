const express = require('express')
const router = express.Router()
const { cacheInit } = require('../middleware/cache')
const { getItems, getItem, createItem, deleteItem, updateItem } = require('../controllers/hotels')

//TODO: Turbo  cache!
router.get(
    '/',
    cacheInit, //TODO: <--- 😨 ¿WTF?
    getItems
)

router.get('/:id', getItem)

router.post('/', cacheInit, createItem)

router.patch('/:id', updateItem)

router.delete('/:id', deleteItem)


module.exports = router