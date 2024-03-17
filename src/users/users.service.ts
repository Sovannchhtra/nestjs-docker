import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository:UserRepository){}

  async create(createUserDto: CreateUserDto) {
    const userEntitry = this.userRepository.create(createUserDto);
    const user = await this.userRepository.save(userEntitry);
    if(!user) throw new HttpException('User not create',HttpStatus.BAD_REQUEST);
    return user;
  }

  async findAll(query: PaginateQuery):Promise<Paginated<User>> {
    return paginate(query,this.userRepository,{
      sortableColumns:['firstName','lastName'],
      searchableColumns:['firstName','lastName'],
      defaultSortBy: [['id', 'DESC']],
    })
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({where:{ id }})
    if(!user) throw new HttpException('User not found',HttpStatus.NOT_FOUND);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({where:{ id }});
    if(!user) throw new HttpException('User not found',HttpStatus.NOT_FOUND);
    const userUpdate = await this.userRepository.save({
      ...user,
      ...updateUserDto
    });
    return userUpdate;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({where:{ id }});
    if(!user) throw new HttpException('User not found',HttpStatus.NOT_FOUND);

    const userDelete = await this.userRepository.delete(id);
    if(!userDelete) throw new HttpException('User not found ', HttpStatus.BAD_REQUEST);

    return {
      message:"Delete user successfully"
    }
  }
}
