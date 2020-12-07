module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'admin',
        email: 'admin@admin.com.br',
        type: 'root',
        password: '$2b$10$Gas7qNPk.jVn/J1Gn2UPmOapW.0hIgrU.VySJdewNtRqocvbO.Oju',
      },
      {
        name: 'vilas',
        email: 'william.vboas@gmail.com',
        type: 'customer',
        password: '$2b$10$Gas7qNPk.jVn/J1Gn2UPmOapW.0hIgrU.VySJdewNtRqocvbO.Oju',
      },
    ]);
  },

  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
