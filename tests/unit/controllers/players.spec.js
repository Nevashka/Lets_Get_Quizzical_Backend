const playersController = require('../../../controllers/players')
const Player = require('../../../models/Player')

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('Players Controller', () => {

  beforeEach(() =>  jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe('index', () => { 
    test('it returns players with 200 status code', async() => {
      let testPlayers = ['p1', 'p2', 'p3']
      jest.spyOn(Player, 'all', 'get')
        .mockResolvedValue(testPlayers);
      await playersController.index(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(testPlayers)
    })
   });

})


