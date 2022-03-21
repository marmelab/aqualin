import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { isBot } from "../utils/isBot";
import { User } from "./entities/user.entity";

const saltRounds = 10;

export interface LiteUser {
  id: number;
  username: string;
}

@Injectable()
export class UserService {
  #userRepository: Repository<User>;

  constructor(
    @InjectRepository(User)
    userRepository: Repository<User>,
  ) {
    this.#userRepository = userRepository;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.#userRepository.findOne({ where: { username } });
  }

  async create(username: string, password: string): Promise<User> {
    const hash = await bcrypt.hash(password, saltRounds).then((hash) => {
      return hash;
    });
    const user: User = { id: null, username, password: hash };
    return this.#userRepository.save(user);
  }

  async getPlayer(request: Request, response: Response): Promise<User> {
    if (!isBot(request)) {
      let playerId = request.cookies["playerId"];
      if (playerId == null) {
        playerId = uuidv4();
        response.cookie("playerId", playerId, {
          maxAge: 24 * 60 * 60 * 1000 * 365 * 30,
        });
      }
      const dbUser = await this.#userRepository.find({ username: playerId });
      if (dbUser[0]) {
        return dbUser[0];
      }
      return this.create(playerId, playerId);
    }
    return null;
  }
}
