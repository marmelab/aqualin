import { ResetPasswordToken } from "src/api/auth/auth.service";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    nullable: false,
    unique: true,
  })
  email: string;

  @Column("jsonb", { nullable: true, default: {} })
  resetPasswordTtoken: ResetPasswordToken;

  @Column({
    nullable: false,
    default: false,
  })
  admin: boolean = false;
}
