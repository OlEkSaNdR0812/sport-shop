import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class SportingGoods {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the sporting goods item' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Basketball', description: 'The name of the sporting goods item' })
  name: string;

  @Column()
  @ApiProperty({ example: 29.99, description: 'The price of the sporting goods item' })
  price: number;

  @Column()
  @ApiProperty({ example: 'A high-quality basketball', description: 'The description of the sporting goods item' })
  description: string;

  @Column()
  @ApiProperty({ example: 'ball', description: 'The category of the sporting goods item' })
  category: string;

  @Column()
  @ApiProperty({ example: true, description: 'Whether the sporting goods item is in stock' })
  inStock: boolean;

  @Column({ nullable: true })
  @ApiProperty({ example: 'http://example.com/image.jpg', description: 'The image URL of the sporting goods item', nullable: true })
  imageUrl: string;
}