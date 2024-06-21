import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SportingGoods {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  inStock: boolean;
}