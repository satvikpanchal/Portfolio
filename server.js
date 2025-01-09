const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send_message', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ status: 'error', message: 'All fields are required!' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
            debug: false,
        });

        await transporter.sendMail({
            from: process.env.EMAIL_ADDRESS,
            to: process.env.EMAIL_ADDRESS,
            subject: `Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        });

        res.json({ status: 'success', message: 'Message sent successfully!' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: `Failed to send message: ${error.message}` });
    }
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
