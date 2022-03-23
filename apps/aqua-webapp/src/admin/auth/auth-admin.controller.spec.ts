import { Test, TestingModule } from "@nestjs/testing";

import { AuthAdminController } from "./auth-admin.controller";

describe("AuthController", () => {
  let controller: AuthAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthAdminController],
    }).compile();

    controller = module.get<AuthAdminController>(AuthAdminController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
