/**
 *
 * @param {*} sequelize
 */

const AppTypeException = require('../errors/AppTypeException');

const ClearFields = (fields, fixeds = {}) => {
  const {
    createdAt, deletedAt, updatedAt, ...rest
  } = fields;
  return {
    ...rest,
    ...fixeds
  };
};

const EasyForm = (sequelize) => async ({
  data = {},
  fields = {},
  model = {},
  subFields = {},
  options = {},
}) => {
  const updateMain = async ({ id, ...rest }, transaction) => {
    if (id) {
      const findMethod = model.findOrFail ? 'findOrFail' : 'findOne';

      if (!await model[findMethod]({ where: { id } })) {
        throw new AppTypeException('DATA_NOT_FOUND');
      }
      await model.update(rest, {
        where: { id },
        transaction,
      });
      return { id };
    }
    const created = await model.create(rest, { transaction });
    return { id: created.id };
  };

  const include = [];
  const mainValue = await sequelize.transaction(async (transaction) => {
    const createOrUpdate = await updateMain(ClearFields(fields, data), transaction);

    if (!createOrUpdate) return null;

    await Promise.all(Object.keys(subFields).map(async (fieldName) => {
      const subModelItem = subFields[fieldName];
      const subModel = subModelItem.model;
      const subDataFields = subModelItem.data || {};

      const { [fieldName]: fieldValue } = fields;

      include.push(fieldName);

      const fieldsLocale = fields;
      delete fieldsLocale[fieldName];

      if (Array.isArray(fieldValue)) {
        const ids = await subModel.findAll({
          where: {
            [options.sourceKey]: createOrUpdate.id,
          },
          attributes: ['id'],
        });

        await Promise.all(ids
          .filter(({ id }) => id && !fieldValue.find((item) => item.id === id))
          .map(async ({ id }) => {
            const resultItem = await subModel.findOne({ where: { id } });
            if (resultItem) {
              return resultItem.destroy({
                transaction,
              });
            }
            return true;
          }));

        // Listagem de dados dentro do campo que é um array
        await Promise.all(fieldValue.map(async ({ id, ...rest }) => {
          const restLocale = rest;
          if (options.sourceKey) {
            restLocale[options.sourceKey] = createOrUpdate.id;
          }
          if (id) {
            return subModel.update(ClearFields(restLocale, subDataFields), {
              where: {
                id,
              },
              transaction,
            });
          }

          return subModel.create(ClearFields(restLocale, subDataFields), { transaction });
        }));
      }
    }));

    return createOrUpdate;
  });

  if (mainValue) {
    return model.findOne({
      where: {
        id: mainValue.id,
      },
      include,
    });
  }
};

module.exports = EasyForm;
