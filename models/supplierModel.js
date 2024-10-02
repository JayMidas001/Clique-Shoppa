const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
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
    userName: {
        type: String,
        required: true, 
        unique: true
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
        default: "supplier" 
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    blackList: [{
        type: String 
    }]
}, { timestamps: true });

// Add case-insensitive index to the email field
supplierSchema.index({ email: 1 }, { unique: true, collation: { locale: 'en', strength: 1 } });

const supplierModel = mongoose.model('Supplier', supplierSchema);

module.exports = supplierModel;
