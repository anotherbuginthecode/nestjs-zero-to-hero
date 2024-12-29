import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './product.interface';
import { ProductDto } from './dto/product.dto';

describe('productsController', () => {
  let controller: ProductsController;
  const products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      description: 'Description 1',
      quantity: 10,
      in_stock: true,
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      description: 'Description 2',
      quantity: 10,
      in_stock: true,
    },
  ];
  const dto = {
    name: 'Product 3',
    price: 300,
    description: 'Description 3',
    quantity: 10,
    in_stock: true,
  }
  const mockProductsService = {
    getProducts: jest.fn().mockImplementation(() => products),
    getProductById: jest.fn().mockImplementation((id: number) => products.find(p => p.id === id)),
    addProduct: jest.fn().mockImplementation((dto) => {
      return {id: Date.now(), ...dto};
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
      ],
    }).overrideProvider(ProductsService).useValue(mockProductsService).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  describe('Find Methods', () => {
    it('should return an array of products', async () => {
      expect(await controller.getAll()).toEqual(products);
      expect(mockProductsService.getProducts).toHaveBeenCalled();
    });

    it('should return a single product', async () => {
      expect(await controller.getOne({id: 1})).toEqual(products[0]);
      expect(mockProductsService.getProductById).toHaveBeenCalledWith(1);
    });
  });

  describe('Create Method', () => {
    it('should create a new product', async () => {
      expect(await controller.create(dto)).toEqual({id: expect.any(Number), dto});
      expect(mockProductsService.addProduct).toHaveBeenCalledWith(dto);
    });
  });
});
