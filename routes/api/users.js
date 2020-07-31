const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const auth = require('../../middleware/auth')
const config = require('config')

const JWT_SECRET = config.get('jwtSecret');

// user model
const User = require('../../models/user')

// Credit to TraversyMedia for following function
router.post('/register', async (req, res) => {
    const { name, password } = req.body;

    const generic_error = "Error in creating new user"

    // Simple validation
    if (!name || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      const user = await User.findOne({ name });
      if (user) throw Error('User already exists');
  
      const salt = await bcrypt.genSalt(10);
      if (!salt) throw Error(generic_error);
  
      const hash = await bcrypt.hash(password, salt);
      if (!hash) throw Error(generic_error);
  
      const newUser = new User({
        name,
        password: hash,
        team: []
      });
  
      const savedUser = await newUser.save();
      if (!savedUser) throw Error(generic_error);
  
      const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
        expiresIn: 3600
      });
  
      res.status(200).json({
        token,
        user: {
          id: savedUser.id,
          name: savedUser.name,
        }

      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
})

// Credit to TraversyMedia for the following function
router.post('/login', async (req, res) => {
    const { name, password } = req.body;

    // Simple validation
    if (!name || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      // Check for existing user
      const user = await User.findOne({ name });
      if (!user) throw Error('User Does not exist');
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error('Invalid credentials');

      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
      if (!token) throw Error('Couldnt sign the token');
  
      res.status(200).json({
        token,
        user: {
          id: user._id,
          name: user.name,
        }
      });
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
})

router.get('/auth', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw Error('User Does not exist');
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.get('/team', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        if (!user) throw Error('User Does not exist');

        res.status(200).json({
            user: {
              team: user.team
            }
        })
    }
    catch (e) {
         res.status(400).json({ error: e.message });
    }    
})

router.post('/team', auth, async (req, res) => {
    const {poke} = req.body;

    // Simple validation
    if (!poke) {
        return res.status(400).json({ msg: 'Please enter all fields' });
      }

    try{
      const user = await User.findById(req.user.id).select('-password');
        if (!user) throw Error('User Does not exist');

        var size = 0, key;
        for (key in user.team) {
          if (user.team.hasOwnProperty(key)) size++
        }

        if (size >= 6) throw Error('Team is full!');

        await user.team.push({name: poke})

        const savedUser = await user.save()

        res.status(200).json({
            user: {
              team: savedUser.team
            }
        })
    }
    catch (e) {
         res.status(400).json({ error: e.message });
    }    
})

router.delete('/team', auth, async (req, res) => {
  const {poke} = req.body;

  // Simple validation
  if (!poke) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

  try{
      const user = await User.findById(req.user.id).select('-password');
      if (!user) throw Error('User Does not exist');


      const poke_to_delete = await user.team.find(p => p.name === poke)
      if (!poke_to_delete) throw Error('Pokemon Does not exist');

      await user.team.pull(poke_to_delete._id)

      const savedUser = await user.save()

      res.status(200).json({
          user: {
            team: savedUser.team
          }
      })
  }
  catch (e) {
       res.status(400).json({ error: e.message });
  }    
})

module.exports = router