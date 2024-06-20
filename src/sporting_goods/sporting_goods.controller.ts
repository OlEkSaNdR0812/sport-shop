import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SportingGoodsService } from './sporting_goods.service';
import { SportingGoods } from '../entity/sporting_goods'

@Controller('sportinggoods')
export class SportingGoodsController {
  constructor(private readonly sportingGoodsService: SportingGoodsService) {}

  @Get()
  findAll(): Promise<SportingGoods[]> {
    return this.sportingGoodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SportingGoods> {
    return this.sportingGoodsService.findOne(+id);
  }

  @Post()
  create(@Body() sportingGood: SportingGoods): Promise<SportingGoods> {
    return this.sportingGoodsService.create(sportingGood);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() sportingGood: SportingGoods): Promise<void> {
    return this.sportingGoodsService.update(+id, sportingGood);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.sportingGoodsService.remove(+id);
  }
}
