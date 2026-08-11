const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// serve frontend
app.get("/", (req, res) =>{
res.sendFile(path.join(__dirname, "girlName.html"));

})
// email config
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS
    }
});

// API
app.post("/send-email", async (req, res) => {
    const { name } = req.body;

    try {
        await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: process.env.USER_EMAIL,
            subject: "❤️ Proposal Accepted",
            text: `Hi Bharat, ${name} accepted your proposal ❤️`
        });

        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
});

app.listen(3000, () => {
    console.log("Server running: http://localhost:3000");
});