const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { AppTypeException } = require('../errors');

const { APP_SECRET } = process.env;

module.exports = (Sequelize, DataTypes) => {
  const AuthToken = Sequelize.define('AuthToken', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    expiresIn: {
      type: DataTypes.DATE,
    },
  });

  AuthToken.associate = function associate(models) {
    AuthToken.belongsTo(models.UserModel, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  AuthToken.verify = async function validation(token) {
    try {
      jwt.verify(token, APP_SECRET);
      const authToken = await AuthToken.findOne({
        where: {
          token,
          expiresIn: {
            [Op.gte]: new Date(),
          },
        },
        include: ['user'],
      });

      if (!authToken) {
        throw new jwt.TokenExpiredError();
      }

      return authToken;
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new AppTypeException('TOKEN_EXPIRED');
      }
      if (err instanceof jwt.JsonWebTokenError) {
        throw new AppTypeException('TOKEN_INVALID');
      }
      throw new AppTypeException('AUTH_FAIL');
    }
  };

  AuthToken.generate = async function generate(userId) {
    if (!userId) {
      throw new AppTypeException('USER_CREDENTIALS_INVALID');
    }

    const token = jwt.sign({ userId: this.id }, APP_SECRET, { expiresIn: '200 days' });

    const now = new Date();
    return AuthToken.create({
      token,
      userId,
      expiresIn: now.setDate(now.getDate() + 200),
    });
  };

  return AuthToken;
};
