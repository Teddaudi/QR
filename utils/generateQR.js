// const QRCode = require('qrcode');
// const crypto = require('crypto');

// const generateQRCode = async (baseUrl) => {
//     const uniqueId = crypto.randomBytes(16).toString('hex');
//     const url = `${baseUrl}/verify/${uniqueId}`;
    
//     const qrImagePath = `qrcodes/qr_${uniqueId}.png`;
//     await QRCode.toFile(qrImagePath, url);

//     return { uniqueId, url, qrImagePath };
// };

// module.exports = generateQRCode;
const QRCode = require('qrcode');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const generateQRCode = async (baseUrl) => {
    try {
        const uniqueId = crypto.randomBytes(16).toString('hex');
        const url = `${baseUrl}/verify/${uniqueId}`;
        const qrDirectory = path.join(__dirname, '../qrcodes');
        const qrImagePath = path.join(qrDirectory, `qr_${uniqueId}.png`);

        // Ensure the directory exists
        if (!fs.existsSync(qrDirectory)) {
            fs.mkdirSync(qrDirectory, { recursive: true });
        }

        // Generate the QR code file
        await QRCode.toFile(qrImagePath, url);
        return { uniqueId, url, qrImagePath };
    } catch (error) {
        console.error('QR Code generation failed:', error);
        throw new Error('QR Code generation error');
    }
};

module.exports = generateQRCode;
