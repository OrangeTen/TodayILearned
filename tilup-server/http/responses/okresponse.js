const HttpResponse = require('./httpresponse');


class OkResponse extends HttpResponse {
  constructor(body) {
    super();
    this.code = 200;
    this.body = body;
  }
}

module.exports = OkResponse;
