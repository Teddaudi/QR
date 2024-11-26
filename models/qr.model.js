const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema({
    qrCodeId: { type: String, required: true, unique: true },
    isUsed: { type: Boolean, default: false },
    usedAt: { type: Date, default: null },
    qrImagePath: { type: String, required: true },
});

const QRCode = mongoose.model('QRCode', qrSchema);
module.exports = QRCode;
