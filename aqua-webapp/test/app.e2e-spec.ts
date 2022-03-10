import { NestExpressApplication } from "@nestjs/platform-express";
import { Test, TestingModule } from "@nestjs/testing";
import helpers from "handlebars-helpers";
import { handlebars } from "hbs";
import { join } from "path";
import request from "supertest";

import { getCustomHandlebarsHelpers } from "../src/customHandlebarsHelpers";
import { GameModule } from "../src/game.module";

describe("GameController (e2e)", () => {
  let app: NestExpressApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [GameModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useStaticAssets(join(__dirname, "../static/", "public"));
    app.setBaseViewsDir(join(__dirname, "../static/", "views"));
    app.setViewEngine("hbs");
    await app.init();
  });
  helpers({ handlebars });
  getCustomHandlebarsHelpers();

  it("/ (GET)", () => {
    return request(app.getHttpServer())
      .get("/")
      .expect(200)
      .expect(/Aqualin/);
  });
});
