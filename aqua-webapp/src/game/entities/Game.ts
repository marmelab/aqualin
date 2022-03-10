import { GameState } from "@aqua/core";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("jsonb", { nullable: false, default: {} })
  gameState: GameState;

  @Column({
    nullable: true,
  })
  color: string;

  @Column({
    nullable: true,
  })
  symbol: string;
}
