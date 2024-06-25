import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { StoreService } from './store.service';
import { Order } from '../entity/order';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('store')
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get('inventory')
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'List of orders', type: [Order] })
  findAll(): Promise<Order[]> {
    return this.storeService.findAll();
  }

  @Get('order/:id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({ status: 200, description: 'Order found', type: Order })
  findOne(@Param('id') id: string): Promise<Order> {
    return this.storeService.findOne(+id);
  }

  @Post('order')
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created', type: Order })
  create(@Body() order: Order): Promise<Order> {
    return this.storeService.create(order);
  }

  @Delete('order/:id')
  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiResponse({ status: 200, description: 'Order deleted' })
  remove(@Param('id') id: string): Promise<void> {
    return this.storeService.remove(+id);
  }
}
