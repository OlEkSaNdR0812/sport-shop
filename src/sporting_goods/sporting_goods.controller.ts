import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SportingGoodsService } from './sporting_goods.service';
import { SportingGoods } from '../entity/sporting_goods';
import { RolesGuard } from 'src/auth/roles/guard';
import { Roles } from 'src/auth/roles/decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/config/multer';
import { join } from 'path';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('sportinggoods')
@Controller('sportinggoods')
@UseGuards(RolesGuard)
export class SportingGoodsController {
  constructor(private readonly sportingGoodsService: SportingGoodsService) {}

  @Post('/:id/uploadImage')
  @UseInterceptors(FileInterceptor('file', { storage }))
  @ApiOperation({ summary: 'Upload image for a sporting good' })
  @ApiResponse({ status: 200, description: 'Image uploaded successfully' })
  async uploadImage(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
    const imagePath = `uploads/${file.filename}`;
    return this.sportingGoodsService.updateImage(id, imagePath);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sporting goods' })
  @ApiResponse({ status: 200, description: 'List of sporting goods', type: [SportingGoods] })
  findAll(): Promise<SportingGoods[]> {
    return this.sportingGoodsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a sporting good by ID' })
  @ApiResponse({ status: 200, description: 'Sporting good found', type: SportingGoods })
  findOne(@Param('id') id: string): Promise<SportingGoods> {
    return this.sportingGoodsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new sporting good' })
  @ApiResponse({ status: 201, description: 'Sporting good created', type: SportingGoods })
  create(@Body() sportingGood: SportingGoods): Promise<SportingGoods> {
    return this.sportingGoodsService.create(sportingGood);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a sporting good by ID' })
  @ApiResponse({ status: 200, description: 'Sporting good updated' })
  update(@Param('id') id: string, @Body() sportingGood: SportingGoods): Promise<void> {
    return this.sportingGoodsService.update(+id, sportingGood);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a sporting good by ID' })
  @ApiResponse({ status: 200, description: 'Sporting good deleted' })
  remove(@Param('id') id: string): Promise<void> {
    return this.sportingGoodsService.remove(+id);
  }
}
