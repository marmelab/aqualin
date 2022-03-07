import { NestFactory } from "@nestjs/core";

import { WebappModule } from "./webapp.module";

async function bootstrap() {
  const app = await NestFactory.create(WebappModule);
  await app.listen(3000);
}
bootstrap();
