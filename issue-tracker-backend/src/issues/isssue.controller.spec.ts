import { Test, TestingModule } from '@nestjs/testing';
import { IsssueController } from './isssue.controller';

describe('IsssueController', () => {
  let controller: IsssueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IsssueController],
    }).compile();

    controller = module.get<IsssueController>(IsssueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
