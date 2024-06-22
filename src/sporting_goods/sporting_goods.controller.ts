import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { SportingGoodsService } from './sporting_goods.service';
import { SportingGoods } from '../entity/sporting_goods'
import { RolesGuard } from 'src/auth/roles/guard';
import { Roles } from 'src/auth/roles/decorator';

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
  @UseGuards(RolesGuard)
  @Roles('admin')
  create(@Body() sportingGood: SportingGoods): Promise<SportingGoods> {
    return this.sportingGoodsService.create(sportingGood);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() sportingGood: SportingGoods): Promise<void> {
    return this.sportingGoodsService.update(+id, sportingGood);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string): Promise<void> {
    return this.sportingGoodsService.remove(+id);
  }
}
