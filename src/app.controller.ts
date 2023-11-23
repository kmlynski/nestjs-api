import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { NewCategoryDto } from './dtos/new-category.dto';

interface Category {
  id: number;
  name: string;
}

@Controller('categories')
export class AppController {
  private nextId = 8;
  private categories: Category[] = [
    { id: 1, name: 'Groceries' },
    { id: 2, name: 'Cosmetics' },
    { id: 3, name: 'Toys' },
    { id: 4, name: 'Dairy' },
    { id: 5, name: 'Fashion' },
    { id: 6, name: 'Electronics' },
    { id: 7, name: 'Games' },
  ];
  @Get()
  getAll() {
    return this.categories;
  }

  @Get('/:id')
  getCategoryWithId(@Param('id') categoryId: number) {
    const category = this.categories.find((c) => c.id === categoryId);
    if (!category) {
      throw new NotFoundException(`category with id: ${categoryId} not found`);
    }
    return category;
  }

  @Post()
  addNewCategory(@Body() payload: NewCategoryDto) {
    const category: Category = { id: this.nextId++, ...payload };
    this.categories.push(category);
    return category;
  }

  @Delete('/:id')
  deleteCategoriesWithId(@Param('id') categoryId: number) {
    const objectForDeletion = this.categories.find(
      (c) => c.id === Number(categoryId),
    );
    this.categories.splice(this.categories.indexOf(objectForDeletion), 1);
    return { message: 'Object deleted successfully ' };
  }
}
