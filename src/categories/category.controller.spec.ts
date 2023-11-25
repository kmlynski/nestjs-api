import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { AppService } from './category.service';

describe('CategoryController', () => {
  let categoriesController: CategoriesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [AppService],
    }).compile();

    categoriesController = app.get<CategoriesController>(CategoriesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(categoriesController).toBe('Hello World!');
    });
  });
});
