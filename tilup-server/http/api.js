const _ = require('lodash');

const ENV_NODE = 'de1v';

const apiResponse = func => (req, res, next) => {
  const bindParams = _.assign(req.body, req.params, req.query);

  Promise.resolve()
    .then(() => func.call(null, bindParams, req.user))
    .then((reply) => {
      if (!reply) {
        res.status(404).send({
          message: 'Not found',
        });
      } else if (reply === true) {
        res.status(200).send();
      } else {
        res.status(200).send(reply);
      }
    })
    .catch((error) => {
      const statusCode = error.statusCode ? error.statusCode : 500;
      const message = error.message ? error.message : '무언가 문제가 발생했습니다.';

      if (ENV_NODE === 'dev') {
        next(error);
        return;
      }
      res.status(statusCode).send({
        message,
      });
    });
};

module.exports = apiResponse;
