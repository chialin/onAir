export class ElementNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ElementNotFoundError";

    Object.setPrototypeOf(this, ElementNotFoundError.prototype);
  }
}
