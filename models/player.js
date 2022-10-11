const db = require ('../dbConfig/init');

class Player {
  
  constructor(data) {
    this.id = data.id
    this.username = data.username
    this.score = data.score
  }

  static get all() {
    return new Promise(async(res,rej) => {
      try{
        const playersData = await db.query('SELECT * FROM players;')
        const players = playersData.rows.map(d => new Player(d))
        res(players);
      } catch (err) {
        rej (`Error retrieving player: ${err}`)
      }
    })
  }
}

module.exports = Player;
