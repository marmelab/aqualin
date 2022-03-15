export class InvalidTargetError extends Error {
  constructor() {
    super("Invalid target coordinates");
  }
}
