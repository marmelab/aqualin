import { Body, Controller, Post } from "@nestjs/common";

import { LiteUser, UserService } from "../../user/user.service";

@Controller("api/users")
export class UserController {
  constructor(private userService: UserService) {}
  @Post("")
  async getcreate(
    @Body() userData: { username: string; password: string },
  ): Promise<LiteUser> {
    return this.userService.create(userData.username, userData.password);
  }
}
