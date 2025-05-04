import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class OpenClose {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day: string; // Example: "Monday"

  @Column()
  openTime: string; // Example: "09:00"

  @Column()
  closeTime: string; // Example: "17:00"
}
