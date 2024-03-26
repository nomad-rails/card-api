import { Test, TestingModule } from '@nestjs/testing';
import { MainController } from './main.controller';
import { MainService } from './main.service';

describe('MainController', () => {
  let controller: MainController;
  let service: MainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainController],
      providers: [MainService],
    }).compile();

    controller = module.get<MainController>(MainController);
    service = module.get<MainService>(MainService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('ping', () => {
    it('should return the result of MainService.ping', () => {
      // Arrange
      const expectedResult = 'pong';
      jest.spyOn(service, 'ping').mockReturnValue(expectedResult);

      // Act
      const result = controller.ping();

      // Assert
      expect(result).toBe(expectedResult);
      expect(service.ping).toHaveBeenCalled();
    });
  });
});
