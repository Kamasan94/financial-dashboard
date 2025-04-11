const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Transaction = require('../models/Transaction');
const authMiddleware = require('../authMiddleware');

// GET /api/transactions → tutte le transazioni dell’utente autenticato
// POST /api/transactions → crea nuova transazione
// PUT /api/transactions/:id → aggiorna una transazione\
// DELETE /api/transactions/:id → elimina

router.get('/api/transactions', authMiddleware.authHanlder, async(req,res) => {
    let userId = req.user;
    let transactions = await Transaction.findOne( { userId } );
    console.log(transactions);
})

module.exports(router);