const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const AppTypeException = require('../errors/AppTypeException');
const { findOrFail } = require('../libs/sequelize-help');

const hash = (value) => bcrypt.hash(value, 10);

module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define('User', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Nome é um campo requerido',
        },
      },
    },
    type: {
      type: DataTypes.ENUM('customer'),
      defaultValue: 'customer',
      validate: {
        isIn: {
          args: [['customer']],
          msg: 'Tipo de usuário não permitido!',
        },
      },
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email já esta sendo utilizado em outra conta',
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Email passado não é válido!',
        },
        notNull: {
          msg: 'Email é um campo requerido',
        },
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Campo de senha é obrigatório',
        },
        len: {
          args: [5, 25],
          message: 'Campo de senha tem que ser maior que 5 e menor que 8',
        },
      },
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  }, {
    hooks: {
      async beforeCreate(user) {
        user.setDataValue('password', await hash(user.password));
      },
    },
  });

  User.associate = function associate({ AuthTokenModel }) {
    this.hasMany(AuthTokenModel, {
      foreignKey: 'id',
      as: 'tokens',
    });

    User.prototype.toJSON = function toJSON() {
      const values = { ...{}, ...this.get() };
      delete values.password;
      return values;
    };

    this.prototype.comparePassword = async function comparePassword(password) {
      return bcrypt.compare(password, this.password);
    };

    User.prototype.autorize = async function autorize() {
      const user = this;
      const authToken = await AuthTokenModel.generate(user.id);

      return { user, authToken };
    };
  };

  User.authenticate = async function authenticate(username, password) {
    const user = await User.findOne({
      where: {
        email: username,
      },
    });
    if (!user) {
      throw new AppTypeException('AUTH_USER_NOT_EXIST');
    }
    if (await user.comparePassword(password)) {
      return user.autorize();
    }

    throw new AppTypeException('USER_CREDENTIALS_INVALID');
  };

  User.findOrFail = (options) => findOrFail(User)({
    ...options,
    where: {
      ...options.where,
      deletedAt: {
        [Op.is]: null,
      },
    },
  });

  return User;
};
