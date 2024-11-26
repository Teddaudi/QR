const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema({
    qrCodeId: { type: String, unique: true },
    isUsed: { type: Boolean, default: false },
    generatedAt: { type: Date, default: Date.now },
    usedAt: Date
});

const QRCode = mongoose.model('QRCode', qrSchema);
module.exports = QRCode;
