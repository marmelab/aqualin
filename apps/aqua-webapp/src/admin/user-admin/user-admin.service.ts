import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserAdminService extends TypeOrmCrudService<User> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo);
  }
}
