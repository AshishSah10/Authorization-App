const router = require("express").Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require("../models/user.model");
const auth = require("../middleware/auth");

router.post('/register', async(req, res) => {
    try{
        //  const [ email, password ] = {...req.body};
        const { email, password } = req.body;
        console.log("inside post")
        const existingUser = await User.findOne({email: email});
        if(existingUser){
            res.status(400).json({ error : "User Email already exists.!!" });
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        res.json({savedUser});
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async(req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({msg : "Email does not exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg : "wrong user credentials"});
        const userToken = await jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY);
        res.json({
            userToken,
            user: {
                id: user._id
            }
        })
    }catch(err){
        res.status(500).json({error : err.message});
    }
})

router.get('/', auth, async (req, res) => {
    try {
      // reading the data from user
      // const id = req.query.id
      // console.log(id)
      const user = await User.findById(req.user)
      res.json({
        id: user._id,
        email: user.email,
        password: user.password
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
});

module.exports = router;