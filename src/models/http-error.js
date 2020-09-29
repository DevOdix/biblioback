class HttpError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.mess = message;
    this.code = errorCode;
  }
}

module.exports = HttpError;
