import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';

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
  getCategoriesWithId(@Param('id') categoryId: number) {
    this.categories.find((c) => c.id === categoryId);
    return this.categories[categoryId];
  }
  @Post()
  addNewCategory(@Body() payload: { name: string }) {
    const category: Category = { id: this.nextId++, ...payload };
    this.categories.push(category);
    return category;
  }

  @Delete('/:id')
  deleteCategoriesWithId(@Param('id') categoryId: string) {
    const objectForDeletion = this.categories.find(
      (c) => c.id === Number(categoryId),
    );
    this.categories.splice(this.categories.indexOf(objectForDeletion), 1);
    return { message: 'Object deleted successfully ' };
  }
}
