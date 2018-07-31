const HttpResponse = require('./http');


class CreatedResponse extends HttpResponse {
  constructor(body) {
    super();
    this.code = 201;
    this.body = body;
  }
}

module.exports = CreatedResponse;
