import { Test, TestingModule } from '@nestjs/testing';

import { WebappController } from './webapp.controller';
import { WebappService } from './webapp.service';

describe('WebappController', () => {
  let webappController: WebappController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WebappController],
      providers: [WebappService],
    }).compile();

    webappController = app.get<WebappController>(WebappController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(webappController.getHello()).toBe('Hello World!');
    });
  });
});
