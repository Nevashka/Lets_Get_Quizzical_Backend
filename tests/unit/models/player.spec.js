const db = require('../../../dbConfig/init')
const Player = require('../../../models/Player')

const pg = require('pg');
jest.mock('pg');

describe('Player Model', () => {

  beforeEach(() => jest.clearAllMocks())

  afterAll(() => jest.resetAllMocks())

  describe('All', () => {

    test('Resolves with players on db query', async () => {
        
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [{}, {}, {}]});
      const all = await Player.all
      expect(all).toHaveLength(3)
    })
  })
})
