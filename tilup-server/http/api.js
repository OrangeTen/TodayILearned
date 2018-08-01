const _ = require('lodash');

const { HttpResponse } = require('./responses');
const { InternalError } = require('./errors');


const apiResponse = func => (req, res, next) => {
  const bindParams = _.assign(req.body, req.params, req.query);

  Promise.resolve()
    .then(() => func.call(null, bindParams, req.fbUser))
    .then((response) => {
      if (!(response instanceof HttpResponse)) {
        throw new InternalError('내부 Response가 HttpResponse를 확장한 클래스여야합니다.');
      }

      return response;
    })
    .then((response) => {
      res.status(response.code).send(response.body);
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = apiResponse;
