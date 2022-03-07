import { Controller, Get } from '@nestjs/common';

import { WebappService } from './webapp.service';

@Controller()
export class WebappController {
  constructor(private readonly webappService: WebappService) {}

  @Get()
  getHello(): string {
    return this.webappService.getHello();
  }
}
