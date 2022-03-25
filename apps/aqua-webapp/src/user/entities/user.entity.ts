import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { ResetPasswordToken } from "../user.service";

@Entity()
export class User {
  constructor(username: string, password: string, email: string) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: true,
    unique: true,
  })
  email: string;

  @Column("jsonb", { nullable: true })
  resetPasswordToken: ResetPasswordToken;

  @Column({
    nullable: false,
    default: false,
  })
  admin: boolean = false;

  @Column({
    nullable: false,
    default: false,
  })
  banned: boolean = false;

  @Column({
    nullable: true,
  })
  ipAddress: string;
}
