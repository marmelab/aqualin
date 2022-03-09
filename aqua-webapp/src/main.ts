import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import helpers from "handlebars-helpers";
import { handlebars } from "hbs";
import { join } from "path";

import { getCustomHandlebarsHelpers } from "./customHandlebarsHelpers";
import { GameModule } from "./game.module";

helpers({ handlebars });
getCustomHandlebarsHelpers();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(GameModule);
  app.useStaticAssets(join(__dirname, "public"));
  app.setBaseViewsDir(join(__dirname, "views"));
  app.setViewEngine("hbs");
  await app.listen(3000);
}
bootstrap();
