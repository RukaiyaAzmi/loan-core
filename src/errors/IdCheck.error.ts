
import CustomError from "./custom.error";

export default class IdCheckError extends CustomError {
  statusCode = 400;
  errors;

  constructor(errors: string) {
    super("uniqie check");
    this.errors = errors;
    console.log(" erro uuni");
    Object.setPrototypeOf(this, IdCheckError.prototype);
  }

  serializeErrors(): any {
    const formattedErrors = { message: this.errors };
    return formattedErrors;
  }
}
