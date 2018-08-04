const { HttpResponse } = require('./responses');
const { InternalError } = require('./errors');


const apiResponse = func => (req, res, next) => {
  const bindParams = {
    body: req.body,
    params: req.params,
    query: req.query,
    headers: req.headers,
  };

  Promise.resolve()
    .then(() => func.call(null, bindParams, req.user))
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
