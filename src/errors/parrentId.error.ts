
import CustomError from "./custom.error";

export default class ParentIdCheckError extends CustomError {
  statusCode = 400;
  errors;

  constructor(errors: string) {
    super("ParentId check");
    this.errors = errors;
    console.log(" erro uuni");
    Object.setPrototypeOf(this, ParentIdCheckError.prototype);
  }

  serializeErrors(): any {
    const formattedErrors = { message: this.errors };
    return formattedErrors;
  }
}
