import { Request } from "express";

// a more complete list can be found here https://user-agents.net/bots

const bots = [
  /bot/i,
  /discord/i,
  /facebook/i,
  /twitter/i,
  /google/i,
  /tinyurl/i,
];

export const isBot = (request: Request) => {
  if (!request.headers) {
    return true;
  }
  if (request.headers["user-agent"].match(/bot/i)) {
    return true;
  }
  return bots.some((b) => request.headers["user-agent"].match(b));
};
