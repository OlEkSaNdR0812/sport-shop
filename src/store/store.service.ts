import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entity/order';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  findOne(id: number): Promise<Order> {
    return this.ordersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.ordersRepository.delete(id);
  }

  async create(order: Order): Promise<Order> {
    return this.ordersRepository.save(order);
  }
}
