const mongoose = require('mongoose');

// user: riferimento all’ID dell’utente (ObjectId)
// amount: numero
// type: "income" o "expense"
// category: stringa
// description: opzionale
// date: Date

const TransactionSchema = new mongoose.Schema({
    user_id: { type : mongoose.Schema.Types.ObjectId, ref: 'User'},

    amount: {
        type: Double,
        require: true
    },

    type: {
        type: String,
        enum: ['income', 'expanse'],
        require: true
    },

    category: {
        type: String,
        require: true
    },

    description: String,
    date: Date,

})

module.exports = mongoose.model('Transaction', TransactionSchema);