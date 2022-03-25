import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BannedIp {
  @PrimaryGeneratedColumn()
  id: number;

  // Can be 123.123.123.123 OR CIDR
  // IPv6 compatible
  @Column()
  ipAddress: string;
}
