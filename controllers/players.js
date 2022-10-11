const Player = require('../models/Player')

async function index (req,res) {

  try {
    const players = await Player.all;
    res.status(200).json(players)
  } catch (err) {
    res.status(500).json({err})
  }
}

module.exports = { index }
