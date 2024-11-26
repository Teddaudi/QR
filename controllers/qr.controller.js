const QRCode = require('../models/qr.model');
const generateQRCode = require('../utils/generateQR');



const generateQR = async(req,res)=>{
    try {
        const  BASE_URL  = "http://localhost:3000";
        const { uniqueId, url, qrImagePath } = await generateQRCode(BASE_URL);

        // Save QR code details to the database
        const qrCode = new QRCode({ qrCodeId: uniqueId });
        await qrCode.save();

        res.status(201).json({ message: 'QR code generated.', url, qrImagePath });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to generate QR code.' });
    }
}


const getQR= async(req,res)=>{
    const { id } = req.params;

    try {
        const qrCode = await QRCode.findOne({ qrCodeId: id });

        if (!qrCode) {
            return res.status(404).json({ error: 'Invalid QR code.' });
        }

        if (qrCode.isUsed) {
            return res.status(400).json({ error: 'QR code has already been used.' });
        }

        // Mark the QR code as used
        qrCode.isUsed = true;
        qrCode.usedAt = new Date();
        await qrCode.save();

        res.json({ message: 'QR code verified successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Verification failed.' });
    }
}


module.exports = {getQR,generateQR}

