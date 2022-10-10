
describe('Players endpoints', () => {
  let api

  beforeEach(async () => {
    await resetTestDB()
  });

  beforeAll( async () => {
    api = app.listen(port, () => console.log('Test server running on port 5000'))
  });

  afterAll( async () => {
    console.log('Gracefully stopping test server')
    await api.close()
  });

  it('should return a list of all players', async () => {
    const res = await request(api).get('/players')
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(3)
  })
})
