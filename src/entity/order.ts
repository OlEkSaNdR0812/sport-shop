import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the order' })
  id: number;

  @Column()
  @ApiProperty({ example: 1, description: 'The unique identifier of the sporting goods item' })
  sporting_goodsId: number;

  @Column()
  @ApiProperty({ example: 2, description: 'The quantity of the sporting goods item' })
  quantity: number;

  @Column()
  @ApiProperty({ example: 'pending', description: 'The status of the order' })
  status: string;

  @Column()
  @ApiProperty({ example: '2021-01-01T00:00:00Z', description: 'The date the order was placed' })
  orderDate: Date;
}