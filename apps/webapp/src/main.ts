import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { handlebars } from "hbs";
import { join } from "path";

import { WebappModule } from "./webapp.module";

import helpers = require("handlebars-helpers");

helpers({ handlebars });
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(WebappModule);
  app.useStaticAssets(join(__dirname, "../../../apps/webapp", "public"));
  app.setBaseViewsDir(join(__dirname, "../../../apps/webapp", "views"));
  app.setViewEngine("hbs");
  await app.listen(3000);
}
bootstrap();
