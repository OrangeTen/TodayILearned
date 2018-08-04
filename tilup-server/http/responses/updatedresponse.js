const HttpResponse = require('./httpresponse');


class UpdatedResponse extends HttpResponse {
  constructor(body) {
    super();
    this.code = 200;
    this.body = body;
  }
}

module.exports = UpdatedResponse;
