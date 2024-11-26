
// const QRCode = require('qrcode');
// const crypto = require('crypto');
// const fs = require('fs');
// const path = require('path');

// const generateQRCode = async (baseUrl) => {
//     try {
//         const uniqueId = crypto.randomBytes(16).toString('hex');
//         const url = `${baseUrl}/verify/${uniqueId}`;
//         const qrDirectory = path.join(__dirname, '../qrcodes');
//         const qrImagePath = path.join(qrDirectory, `qr_${uniqueId}.png`);

//         // Ensure the directory exists
//         if (!fs.existsSync(qrDirectory)) {
//             fs.mkdirSync(qrDirectory, { recursive: true });
//         }

//         // Generate the QR code file
//         await QRCode.toFile(qrImagePath, url);
//         return { uniqueId, url, qrImagePath };
//     } catch (error) {
//         console.error('QR Code generation failed:', error);
//         throw new Error('QR Code generation error');
//     }
// };

// module.exports = generateQRCode;

const QRCode = require('qrcode');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const generateQRCode = async (baseUrl) => {
    try {
        // Generate a unique ID for the QR code
        const uniqueId = crypto.randomBytes(16).toString('hex');
        const burl = "https://menu-management-system.onrender.com/qr"
        // Construct the URL for the QR code to encode
        const url = `${burl}/verify/${uniqueId}`;

        // Ensure the 'qrcodes' directory exists within the current directory
        const qrDirectory = path.join(__dirname, 'qrcodes'); // Relative path
        const qrImagePath = path.join(qrDirectory, `qr_${uniqueId}.png`); // Final path for the QR code image

        // Ensure the directory exists
        if (!fs.existsSync(qrDirectory)) {
            fs.mkdirSync(qrDirectory, { recursive: true });
        }

        // Generate the QR code and save it to the specified path
        await QRCode.toFile(qrImagePath, url);

        // Return the unique ID, URL, and image path
        return { uniqueId, url, qrImagePath };
    } catch (error) {
        console.error('QR Code generation failed:', error);
        throw new Error('QR Code generation error');
    }
};

module.exports = generateQRCode;


