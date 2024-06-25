import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  id: number;

  @Column()
  @ApiProperty({ example: 'user@example.com', description: 'The email of the user' })
  email: string;

  @Column()
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  firstName: string;

  @Column()
  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  lastName: string;

  @Column()
  @ApiProperty({ example: 'http://example.com/avatar.jpg', description: 'The profile picture of the user' })
  picture: string;

  @Column()
  @ApiProperty({ example: 'token123', description: 'The access token of the user' })
  accessToken: string;

  @Column({ default: 'user' })
  @ApiProperty({ example: 'user', description: 'The role of the user', default: 'user' })
  role: string;
}