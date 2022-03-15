export class RiverTokenNotSelectedError extends Error {
  constructor() {
    super("The river token slot is empty");
  }
}
