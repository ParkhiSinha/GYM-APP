import 'dotenv/config'
import express from "express";
import cors from "cors";
import { sendEmail } from "./utils/sendEmail.js";

const app = express();
const router = express.Router();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  res.send("Welcome to Gym App Backend");
})

app.post("/send/mail", async (req, res) => {
  
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide all details",
    });
  }
  try {
    await sendEmail({
      email: "sinhaparkhi22@gmail.com",
      subject: "GYM WEBSITE CONTACT",
      message,
      userEmail: email,
    });
    res.status(200).json({
      success: true,
      message: "Message Sent Successfully.",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`);
});
