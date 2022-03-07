import { Injectable } from '@nestjs/common';

@Injectable()
export class WebappService {
  getHello(): string {
    return 'Hello World!';
  }
}
