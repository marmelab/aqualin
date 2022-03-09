export class RiverTokenNotSelected extends Error {
  constructor() {
    super("The river token slot is empty");
  }
}
