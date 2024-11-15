import path from 'path';
import {User} from '../models/user.model.js'; // Assuming you have a User model

export const generateCertificate = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from the JWT middleware

        // Fetch the user's donations from the database
        const user = await User.findById(userId).select('donations name');

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Calculate the total donation amount
        const totalDonations = user.donations.reduce((total, donation) => {
            return total + (donation.amount || 0);
        }, 0);

        // Generate the certificate dynamically
        const sanitizedUserName = user.name.replace(/[^a-zA-Z0-9]/g, '_');
        const fileName = `${sanitizedUserName}-certificate.pdf`;
        const filePath = path.resolve(`./certificates/${fileName}`);

        // Ensure the directory exists
        if (!fs.existsSync('./certificates')) {
            fs.mkdirSync('./certificates');
        }

        const doc = new PDFDocument();

        doc.pipe(fs.createWriteStream(filePath));

        // Add content to the certificate
        doc.fontSize(24).text('Certificate of Appreciation', { align: 'center' });
        doc.moveDown(2);
        doc.fontSize(16).text(`This is to certify that ${user.name}`, { align: 'center' });
        doc.text(`has generously donated a total of ₹${totalDonations} to various NGOs`, { align: 'center' });
        doc.text(`on the platform PhilantroHub.`, { align: 'center' });
        doc.moveDown(2);
        doc.fontSize(14).text('Thank you for your immense contribution!', { align: 'center' });

        doc.end();

        // Respond with the download link for the certificate
        const encodedFileName = encodeURIComponent(fileName);
        res.status(200).json({ url: `/api/certificates/download/${encodedFileName}` });
    } catch (error) {
        console.error('Error generating certificate:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const downloadCertificate = (req, res) => {
    try {
        const { fileName } = req.params;
        const decodedFileName = decodeURIComponent(fileName); // Decode the encoded filename
        const filePath = path.resolve(`./certificates/${decodedFileName}`);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Certificate not found.' });
        }

        res.download(filePath);
    } catch (error) {
        console.error('Error downloading certificate:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
