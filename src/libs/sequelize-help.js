const AppTypeException = require('../errors/AppTypeException');

const findOrFail = (Model) => async (options) => {
  const data = await Model.findOne(options);
  if (!data) {
    throw new AppTypeException('DATA_NOT_FOUND');
  }
  return data;
};

module.exports = { findOrFail };
