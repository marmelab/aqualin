import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { MailService } from "src/api/mail/mail.service";
import { Repository } from "typeorm";

import { User } from "./entities/user.entity";
import { RESET_PASSWORD_PATH } from "./user.controller";

export type ResetPasswordToken = {
  token: string;
  createdAt: {
    dateInMs: number;
    expires: number; // this is the expiry time in seconds
  };
};
const saltRounds = 10;
const expiresInMs = 3600000;

@Injectable()
export class UserService {
  #userRepository: Repository<User>;

  constructor(
    @InjectRepository(User)
    userRepository: Repository<User>,
    private mailService: MailService,
    private configService: ConfigService,
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
    ipAddress: string,
  ): Promise<User> {
    const hash = await bcrypt.hash(password, saltRounds).then((hash) => {
      return hash;
    });
    const user = new User(username, hash, email);
    user.ipAddress = ipAddress;

    return this.#userRepository.save(user);
  }

  async requestPasswordReset(email: string) {
    const AQUALIN_WEBAPP_URL = this.configService.get("AQUALIN_WEBAPP_URL");
    let user = await this.findOneByEmail(email);
    if (!user) throw new Error("User does not exist");
    const uuid = randomUUID();
    const token = await bcrypt.hash(uuid, saltRounds).then((hash) => {
      return hash;
    });

    user.resetPasswordToken = {
      token,
      createdAt: { dateInMs: Date.now(), expires: expiresInMs },
    };
    user = await this.save(user);

    const link = `${AQUALIN_WEBAPP_URL}/users/${RESET_PASSWORD_PATH}?token=${uuid}&id=${user.id}`;

    this.mailService.sendEmail(
      user.email,
      "Password Reset Request",
      { username: user.username, link },
      "resetPasswordMail",
    );
    return link;
  }

  async resetPassword(userId: number, token: string, password: string) {
    const user = await this.findOne(userId);
    const resetPasswordToken = user.resetPasswordToken;

    if (!resetPasswordToken || this.hasTokenExpired(resetPasswordToken)) {
      throw new Error("Invalid or expired password reset token");
    }
    const isValid = await bcrypt.compare(token, resetPasswordToken.token);

    if (!isValid) {
      throw new Error("Invalid or expired password reset token");
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashPassword;
    user.resetPasswordToken = null;
    await this.save(user);

    this.mailService.sendEmail(
      user.email,
      "Password Reset Succeed",
      { username: user.username },
      "resetPasswordSucceedMail",
    );
  }

  hasTokenExpired(resetPasswordToken: ResetPasswordToken) {
    return (
      Date.now() >
      resetPasswordToken.createdAt.dateInMs +
        resetPasswordToken.createdAt.expires
    );
  }
}
