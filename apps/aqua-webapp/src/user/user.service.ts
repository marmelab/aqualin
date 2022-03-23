import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import bcrypt from "bcrypt";
import { Repository } from "typeorm";

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

  async findOneByMail(mail: string): Promise<User | undefined> {
    return this.#userRepository.findOne({ where: { mail } });
  }

  async create(
    username: string,
    password: string,
    mail: string,
  ): Promise<User> {
    const hash = await bcrypt.hash(password, saltRounds).then((hash) => {
      return hash;
    });
    const user = new User(username, hash, mail);
    return this.#userRepository.save(user);
  }
}
