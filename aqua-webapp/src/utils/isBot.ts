import { Request } from "express";

// a more complete list can be found here https://user-agents.net/bots

export const isBot = (request: Request) => {
  if (!request.headers) {
    return true;
  }
  if (request.headers["user-agent"].match(/bot/i)) {
    return true;
  }
  if (request.headers["user-agent"].match(/discord/i)) {
    return true;
  }
  if (request.headers["user-agent"].match(/facebook/i)) {
    return true;
  }
  if (request.headers["user-agent"].match(/twitter/i)) {
    return true;
  }
  if (request.headers["user-agent"].match(/google/i)) {
    return true;
  }
  if (request.headers["user-agent"].match(/reddit/i)) {
    return true;
  }
  if (request.headers["user-agent"].match(/tinyurl/i)) {
    return true;
  }
  return false;
};
