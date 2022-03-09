export class InvalidTarget extends Error {
  constructor() {
    super("The river token target coordinates are occupied");
  }
}
