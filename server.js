const express = require('express');
const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
require('dotenv').config();
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors({
  // origin: "http://localhost:5173",
  origin : "https://afe-ten.vercel.app"
}));

// POST endpoint to create a new referral
app.post('/api/referrals', async (req, res) => {
  try {
    const { yourName, yourEmail, course, friendEmail, friendName } = req.body;
    console.log(req.body);

    // Validate required fields
    if (!yourName || !yourEmail) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Create new referral
    const newReferral = await prisma.referral.create({
      data: {
        yourName, yourEmail, course, friendEmail, friendName
      },
    });

    // Send email notification
    await sendEmailNotification(newReferral);

    res.status(201).json(newReferral);
  } catch (error) {
    console.error('Error creating referral:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET endpoint to retrieve all referrals
app.get('/api/referrals', async (req, res) => {
  try {
    const referrals = await prisma.referral.findMany();
    res.json(referrals);
  } catch (error) {
    console.error('Error fetching referrals:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to send email notification
async function sendEmailNotification(referral) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: referral.friendEmail,
    subject: 'New Referral Submission',
    text: `
      New referral received:
      Name: ${referral.friendName}
      Email: ${referral.friendEmail}
      Course: ${referral.course || 'N/A'}
    `,
  };

  await transporter.sendMail(mailOptions);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});