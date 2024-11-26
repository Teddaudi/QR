const QRCode = require('../models/qr.model');
const generateQRCode = require('../utils/generateQR');


const generateQR = async (req, res) => {
    try {
        const BASE_URL = "https://menu-management-system.onrender.com";  // Base URL of the app
        const { uniqueId, url, qrImagePath } = await generateQRCode(BASE_URL);
        // Save QR code details to the database
        const qrCode = new QRCode({
            qrCodeId: uniqueId,
            qrImagePath: `${BASE_URL}/qrcodes/qr_${uniqueId}.png`  // Full URL to access the image
        });
        await qrCode.save();

        res.status(201).json({
            message: 'QR code generated.',
            url,
            qrImagePath: `${BASE_URL}/qrcodes/qr_${uniqueId}.png`  // Ensure this URL is accessible in the browser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to generate QR code.' });
    }
};



const getQR = async (req, res) => {
    const { id } = req.params;

    try {
        const qrCode = await QRCode.findOneAndUpdate(
            { qrCodeId: id, isUsed: false },  // Only find QR codes that are not used
            { isUsed: true, usedAt: new Date() },  // Mark as used and set timestamp
            { new: true }  // Return the updated document
        );

        if (!qrCode) {
            return res.status(404).json({ error: 'Invalid or already used QR code.' });
        }

        res.json({ message: 'QR code verified successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Verification failed.' });
    }
};


module.exports = {getQR,generateQR}

