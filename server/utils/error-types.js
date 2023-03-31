export class RequestError extends Error {
  constructor(code, message) {
    super(message); // calls `Error` class' constructor with `message`

    this.name = 'RequestError'; // reassign from 'Error' to 'RequestError'
    this.statusCode = code;
  }
}

export class BadReqError extends RequestError {
  constructor(message) {
    super(400, message);
  }
}

export class AuthError extends RequestError {
  constructor(message) {
    super(401, message);
  }
}

export class ForbiddenError extends RequestError {
  constructor(message = 'Insufficient permissions') {
    super(403, message);
  }
}

export class NotFoundError extends RequestError {
  constructor(docName) {
    super(404, `That ${docName} does not exist`);
  }
}

export class ConflictError extends RequestError {
  constructor(message) {
    super(409, message);
  }
}

export class ExcessReqError extends RequestError {
  constructor() {
    super(429, 'Too many requests'); //*** should be used with rate-limiting according to MDN
  }
}
