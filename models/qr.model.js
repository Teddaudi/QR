const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema({
    qrCodeId: String,
    isUsed: { type: Boolean, default: false },
    generatedAt: { type: Date, default: Date.now },
    usedAt: Date
});

const QRCode = mongoose.model('QRCode', qrSchema);
module.exports = QRCode;
