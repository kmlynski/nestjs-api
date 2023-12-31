import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { NewProductDto } from './dto/new-product.dto';
import { Product } from './product.interface';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Logger } from '@nestjs/common';
import * as fsp from 'node:fs/promises';

@Controller('products')
export class ProductsController {
  private logger = new Logger(ProductsController.name);
  constructor(private productsService: ProductsService) {}

  @Post()
  addNew(@Body() product: NewProductDto): Product {
    this.logger.log('About to add');
    this.logger.log(product);
    return this.productsService.createNew(product);
  }

  // @Get('test-file')
  // async getAllFromFile() {
  //   try {
  //     const fileData = await fsp.readFile('not-existing-file.txt');
  //     return { fileData };
  //   } catch {
  //     throw new NotFoundException(
  //       'Missing file. Cannot find not-existing-file.txt',
  //     );
  //   }
  // }
  @Get('test-file')
  async getAllFromFile() {
    const fileData = await fsp.readFile('not-existing-file.txt');
    return { fileData };
  }

  @Get()
  getAll(@Query('name') searchByName: string): Product[] {
    return this.productsService.getAll(searchByName);
  }

  @Get(':productId')
  getOne(@Param('productId') productId: number): Product {
    return this.productsService.getOneById(productId);
  }

  @Patch(':productId')
  update(
    @Param('productId') productId: number,
    @Body() product: UpdateProductDto,
  ): Product {
    return this.productsService.update(productId, product);
  }

  @Delete(':productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('productId') productId: number): void {
    return this.productsService.removeById(productId);
  }
}
