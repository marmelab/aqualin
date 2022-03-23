import { GameState, Score } from "@aqua/core";
import { User } from "src/user/entities/user.entity";
import { Status } from "src/utils/status";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("jsonb", { nullable: false, default: {} })
  gameState: GameState;

  @ManyToOne(() => User, { nullable: true, eager: true })
  color: User;

  @ManyToOne(() => User, { nullable: true, eager: true })
  symbol: User;

  @Column({ default: 0 })
  nbActions: number = 0;

  @Column({ default: Status.waitingSecondPlayer })
  status: string;

  @Column("jsonb", { nullable: true, default: null })
  score: Score;
}
