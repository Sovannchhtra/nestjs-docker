import { Injectable } from "@nestjs/common";
import { EntityManager, Repository } from "typeorm";


@Injectable()
export class AbStractRepository<T> extends Repository<T>{
     constructor(
          protected readonly entity:any,
          protected readonly entityManager: EntityManager
     ){
          super(entity,entityManager);
     }
}