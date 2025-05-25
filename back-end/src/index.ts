import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "./db";
import { sendOtpEmail } from "./sendOtpEmail";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Create users table if not exists
pool.query(`
  CREATE TABLE IF NOT EXISTS user_table (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

//password conditions
function validatePassword(password: string): string | null {
  if (password.length <= 8 || password.length >= 20) {
    return "Password must be between 8 and 20 characters.";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must include at least one lowercase letter.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must include at least one uppercase letter.";
  }

  if (!/\d/.test(password)) {
    return "Password must include at least one number.";
  }

  if (!/[@#$%&]/.test(password)) {
    return "Password must include at least one special character (@, #, $, %, &).";
  }

  if (/[^A-Za-z\d@#$%&]/.test(password)) {
    return "Password contains invalid characters or spaces.";
  }

  return null; // valid
}

// Signup
app.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const existingEmail = await pool.query(
      "SELECT * FROM user_table WHERE email = $1",
      [email]
    );

    const existingUsername = await pool.query(
      "SELECT * FROM user_table WHERE username = $1",
      [username]
    );

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // checks valid email id based on regex
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: "Invalid email address." });
      return;
    }

    if (existingEmail.rows.length > 0) {
      // checks if email exist already
      res.status(400).json({ error: "Email already exists" });
      return;
    }

    const usernameRegex = /^[A-Za-z0-9_]{4,15}$/; // checks if username is valid
    if (!usernameRegex.test(username)) {
      res.status(400).json({
        error:
          "Username must be 4-15 characters and can only contain letters, numbers, and underscores.",
      });
      return;
    }

    if (existingUsername.rows.length > 0) {
      // checks if email exist already
      res.status(400).json({ error: "Username already exists" });
      return;
    }

    const passwordError = validatePassword(password); // checks if password is valid
    if (passwordError) {
      res.status(400).json({ error: passwordError });
      return;
    }
    
    const generateOTP = () =>
      Math.floor(100000 + Math.random() * 900000).toString();
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // expires in 5 minutes
    await pool.query(
      `
      INSERT INTO email_otps (email, otp, expires_at)
      VALUES ($1, $2, $3)
      ON CONFLICT (email)
      DO UPDATE SET otp = EXCLUDED.otp, expires_at = EXCLUDED.expires_at
    `,
      [email, otp, expiresAt]
    );
    
    await sendOtpEmail(email, otp);
  
    res.status(200).json({ message: "OTP generated" });
    return;
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
});

// otp verification
app.post("/verify-otp", async (req, res) => {
  const { email, otp, username,password } = req.body;

  try {
    const result = await pool.query(
      `
      SELECT * FROM email_otps
      WHERE email = $1
    `,
      [email]
    );
  
    if (result.rowCount === 0) {
      res.status(400).json({ error: "OTP not found" });
      return
    }

    const record = result.rows[0];
    const now = new Date();

    if (record.otp !== otp) {
      res.status(400).json({ error: "Invalid OTP" });
      return
    }
 
    if (now > record.expires_at) {
      res.status(400).json({ error: "OTP expired" });
      return
    }
  
    await pool.query(
      `INSERT INTO user_table (email, username, password, joined_at)
       VALUES ($1, $2, $3, NOW())`,
      [email, username, password]
    );
  
    // Optional: delete OTP entry after successful verification
    await pool.query("DELETE FROM email_otps WHERE email = $1", [email]);

    res.status(200).json({ message: "OTP verified" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Verification failed" });
  }
});


app.post("/login", async (req, res) => {
  const { EmailOrUsername, password } = req.body;
  
  if (!EmailOrUsername || !password) {
    res.status(400).json({ error: "Missing credentials" });
    return
  }

  const user = await pool.query(
    "SELECT * FROM user_table WHERE email = $1 OR username = $1",
    [EmailOrUsername]
  );
  
  if (!user.rows.length) {
    res.status(401).json({ error: "No such Email / Username exist. Create new Account" });
    return
  }

  
  if (password!=user.rows[0].password) {
    res.status(401).json({ error: "Invalid email or password" });
    return
  }

  // Login successful
  res.status(200).json({ message: "Login successful", user: user.rows[0] });
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
