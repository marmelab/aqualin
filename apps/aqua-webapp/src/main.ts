import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import cookieParser from "cookie-parser";
import helpers from "handlebars-helpers";
import { handlebars } from "hbs";
import { join } from "path";

import { getCustomHandlebarsHelpers } from "./customHandlebarsHelpers";
import { MainModule } from "./main.module";

helpers({ handlebars });
getCustomHandlebarsHelpers();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainModule);
  app.useStaticAssets(join(__dirname, "public"));
  app.setBaseViewsDir(join(__dirname, "views"));
  app.setViewEngine("hbs");
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.AQUALIN_ADMIN_URL || "http://localhost:3001",
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
