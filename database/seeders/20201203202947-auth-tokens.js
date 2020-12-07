module.exports = {
  async up(queryInterface) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + 200);

    return queryInterface.bulkInsert('AuthTokens', [
      {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDcwMjczMDAsImV4cCI6MTYyNDMwNzMwMH0.4BvWBtMDq6jP_R556DJFajxqxchJL055Yl3f8mqd5ek',
        userId: 1,
        expiresIn,
      }, {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDcwMjc0MzcsImV4cCI6MTYyNDMwNzQzN30.rtpgg33lSdQ2utO_HUcpz3dbtngbW2yLFxQ70vFKH0Q',
        userId: 2,
        expiresIn,
      },
    ]);
  },

  down: async (queryInterface) => queryInterface.bulkDelete('AuthTokens', null, {}),
};
