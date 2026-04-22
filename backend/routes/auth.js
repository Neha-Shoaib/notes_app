const express= require("express");
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User")
const auth = require("../middlewares/auth");

const router = express.Router();

// SIGNUP 
router.post("/signup", async (req,res) =>{
    try{
        const{name,email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();
        
        res.json({message: "User created successfully"});
    }
    catch(err){
       res.status(500).json(err);
    }
});

// Login 
router.post("/login", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: "Email or password missing" });
    }

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET, // ✅ FIXED HERE
      { expiresIn: "1d" }
    );

    res.json({ token, user });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json(err);
  }
});

router.get("/test", auth, (req, res) => {
  res.json({ message: "You are authorized" });
});
module.exports = router;


