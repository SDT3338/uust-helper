import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Lost {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  description: string;
  @Column()
  photo: string;
  @Column()
  phone: string;
}
