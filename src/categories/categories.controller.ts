import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { NewCategoryDto } from './dtos/new-category.dto';
import { Category } from './category.interface';
import { categoriesList } from './categories-list';

@Controller('categories')
export class CategoriesController {
  private nextId = 8;

  @Get()
  getAll() {
    return categoriesList;
  }

  @Get('/:id')
  getSingleCategory(@Param('id', ParseIntPipe) categoryId: number) {
    const category = this.findCategoryById(categoryId);
    if (!category) {
      throw new NotFoundException(`category with id: ${categoryId} not found`);
    }
    return category;
  }

  @Post()
  addNewCategory(@Body() payload: NewCategoryDto) {
    const category: Category = { id: this.nextId++, ...payload };
    categoriesList.push(category);
    return category;
  }

  @Delete('/:id')
  removeCategory(@Param('id', ParseIntPipe) categoryId: number) {
    const objectForDeletion = this.findCategoryById(categoryId);
    if (!objectForDeletion) {
      throw new NotFoundException(`category with id: ${categoryId} not found`);
    }
    categoriesList.splice(categoriesList.indexOf(objectForDeletion), 1);
    return { message: 'Object deleted successfully ' };
  }

  private findCategoryById(categoryId: number) {
    return categoriesList.find((c) => c.id === categoryId);
  }
}
