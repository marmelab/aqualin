import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

import { WebappModule } from "./webapp.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(WebappModule);
  app.setBaseViewsDir(join(__dirname, "../../../apps/webapp", "views"));
  app.setViewEngine("hbs");
  await app.listen(3000);
}
bootstrap();
