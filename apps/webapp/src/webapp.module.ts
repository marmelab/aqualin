import { Module } from '@nestjs/common';

import { WebappController } from './webapp.controller';
import { WebappService } from './webapp.service';

@Module({
  imports: [],
  controllers: [WebappController],
  providers: [WebappService],
})
export class WebappModule {}
