const HttpResponse = require('./httpresponse');


class DeletedResponse extends HttpResponse {
  constructor() {
    super();
    this.code = 204;
  }
}

module.exports = DeletedResponse;
