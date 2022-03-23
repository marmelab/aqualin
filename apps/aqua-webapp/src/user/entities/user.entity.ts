import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  constructor(username: string, password: string, mail: string) {
    this.username = username;
    this.password = password;
    this.mail = mail;
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
  mail: string;

  @Column({
    nullable: false,
    default: false,
  })
  admin: boolean = false;
}
