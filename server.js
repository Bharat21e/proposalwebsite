
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Serve frontend
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "girlName.html"));
});

// Check environment variables
console.log("EMAIL:", process.env.USER_EMAIL);
console.log("PASSWORD EXISTS:", !!process.env.USER_PASS);

// Gmail configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
    },
    pool: true,
    maxConnections: 1,
    maxMessages: 100
});

// Test Gmail connection
transporter.verify((error, success) => {
    if (error) {
        console.log("Gmail connection error:", error);
    } else {
        console.log("Gmail server is ready");
    }
});

// Send email API
app.post("/send-email", async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            success: false,
            message: "Name is required"
        });
    }
   
  

    try {
        await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: process.env.USER_EMAIL,
            subject: "❤️ Proposal Accepted",
            text: `Hi Bharat, ${name} accepted your proposal ❤️`
        });

        console.log(`Email sent successfully for ${name}`);

        res.json({
            success: true,
            message: "Email sent successfully"
        });

    } catch (error) {
        console.log("Email sending error:", error);

        res.status(500).json({
            success: false,
            message: "Email could not be sent"
        });
    }
});

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

