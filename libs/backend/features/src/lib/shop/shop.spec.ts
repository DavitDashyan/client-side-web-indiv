import { Test, TestingModule } from '@nestjs/testing';
import { ShopService } from './shop.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

describe('ShopService', () => {
  let service: ShopService;
  let model: Model<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShopService,
        {
          provide: getModelToken('Shop'),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ShopService>(ShopService);
    model = module.get<Model<any>>(getModelToken('Shop'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of shops', async () => {
      const shops = [{ name: 'Shop 1' }, { name: 'Shop 2' }];
      jest.spyOn(model, 'find').mockResolvedValueOnce(shops as any);

      const result = await service.getAll();

      expect(result).toEqual(shops);
    });
  });

  describe('getOne', () => {
    it('should return a shop by ID', async () => {
      const shopId = 'someId';
      const shop = { name: 'Shop 1' };
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(shop as any);

      const result = await service.getOne(shopId);

      expect(result).toEqual(shop);
    });

    it('should throw NotFoundException if shop is not found', async () => {
      const shopId = 'someNonExistentId';
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(null);

      await expect(service.getOne(shopId)).rejects.toThrow(NotFoundException);
    });
  });
});
