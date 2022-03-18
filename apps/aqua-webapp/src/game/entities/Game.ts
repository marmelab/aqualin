import { GameState } from "@aqua/core";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("jsonb", { nullable: false, default: {} })
  gameState: GameState;

  @Column({
    nullable: true,
  })
  @ManyToOne(() => User)
  color: User;

  @ManyToOne(() => User)
  symbol: User;

  @Column({ default: 0 })
  nbActions: number = 0;
}
