import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { WebappRequest } from "src/types";

export const UserCookie = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<WebappRequest>();
    return request.userCookie;
  },
);
