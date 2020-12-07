const { NODE_ENV } = process.env;
const Response = (cb) => async (req, res, next) => {
  try {
    return res.send(await cb(req, res, next));
  } catch (err) {
    if (NODE_ENV === 'development') {
      console.log(err);
    }
    return next(err);
  }
};

module.exports = { Response };
