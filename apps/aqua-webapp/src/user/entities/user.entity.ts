import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
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
