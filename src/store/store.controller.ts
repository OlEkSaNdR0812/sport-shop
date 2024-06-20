import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { StoreService } from './store.service';
import { Order } from '../entity/order';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get('inventory')
  findAll(): Promise<Order[]> {
    return this.storeService.findAll();
  }

  @Get('order/:id')
  findOne(@Param('id') id: string): Promise<Order> {
    return this.storeService.findOne(+id);
  }

  @Post('order')
  create(@Body() order: Order): Promise<Order> {
    return this.storeService.create(order);
  }

  @Delete('order/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.storeService.remove(+id);
  }
}
