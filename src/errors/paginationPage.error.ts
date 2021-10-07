import CustomError from "./custom.error";

class PageCheckError extends CustomError {
  statusCode = 400;
  errors;
  constructor(errors: string) {
    super("Page Checking");
    this.errors = errors;
    Object.setPrototypeOf(this, PageCheckError.prototype);
  }

  serializeErrors(): any {
    return {
      message: this.errors,
      field: "Requested Page Number",
    };
  }
}

module.exports = PageCheckError;
