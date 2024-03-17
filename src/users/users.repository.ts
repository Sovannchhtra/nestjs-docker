import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { AbStractRepository } from "../shared/repository.abstract";
import { EntityManager } from "typeorm";

@Injectable()
export class UserRepository extends AbStractRepository<User>{
     constructor(
          protected readonly entityManager:EntityManager
     ){
          super(User,entityManager);
     }
}