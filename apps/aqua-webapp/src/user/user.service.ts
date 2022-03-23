import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import bcrypt from "bcrypt";
import { Repository } from "typeorm";

import { User } from "./entities/user.entity";

const saltRounds = 10;

@Injectable()
export class UserService {
  #userRepository: Repository<User>;

  constructor(
    @InjectRepository(User)
    userRepository: Repository<User>,
  ) {
    this.#userRepository = userRepository;
  }

  async save(user: User): Promise<User | undefined> {
    return this.#userRepository.save(user);
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.#userRepository.findOne({ where: { username } });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.#userRepository.findOne({ where: { email } });
  }
  async findOne(id: number): Promise<User | undefined> {
    return this.#userRepository.findOne(id);
  }

  async create(
    username: string,
    password: string,
    email: string,
  ): Promise<User> {
    const hash = await bcrypt.hash(password, saltRounds).then((hash) => {
      return hash;
    });
    const user = new User(username, hash, email);
    return this.#userRepository.save(user);
  }
}
