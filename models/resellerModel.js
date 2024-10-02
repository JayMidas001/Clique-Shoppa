const mongoose = require('mongoose');

const resellerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        lowercase: true, 
        trim: true, 
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true 
    },
    phoneNumber: {
        type: String,
        required: true, 
    },
    address: {
        type: String,
        required: true 
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    userRole: {
        type: String, 
        enum: ["admin", "reseller", "supplier", "guest"],
        default: "reseller" 
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    savedProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    blackList: [{
        type: String 
    }]
}, { timestamps: true });

// Add case-insensitive index to the email field
resellerSchema.index({ email: 1 }, { unique: true, collation: { locale: 'en', strength: 1 } });

const resellerModel = mongoose.model('Reseller', resellerSchema);

module.exports = resellerModel;
