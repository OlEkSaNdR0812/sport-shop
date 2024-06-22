import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sporting_goodsId: number;

  @Column()
  quantity: number;

  @Column()
  status: string;

  @Column()
  orderDate: Date;
}
