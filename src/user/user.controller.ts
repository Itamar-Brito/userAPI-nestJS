import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { UserRepository } from "../user/user.repository";
import { CreateUserDTO } from "./dto/CreateUser.dto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from 'uuid'
import { ListUserDTO } from "./dto/ListUser.dto";
import { UpdateUserDTO } from "./dto/UpdateUser.dto";

@Controller('/user')
export class UserController {

    constructor(private userRepository: UserRepository) { }

    @Post()
    async createUser(@Body() request: CreateUserDTO) {
        const userEntity = new UserEntity();

        userEntity.nome = request.nome
        userEntity.email = request.email
        userEntity.senha = request.senha
        userEntity.id = uuid()

        this.userRepository.save(userEntity)
        
        return {
            message: 'User Created',
            user: new ListUserDTO(userEntity.id,userEntity.nome )
        }
    }

    @Get()
    async listUsers() {
        const allUsers = await this.userRepository.list()
        const userList = allUsers.map(
            user => new ListUserDTO(
                user.id,
                user.nome
            )
        )
        return userList
    }

    @Put('/:id')
    async updateUser(@Param('id') id:string, @Body() updateRequest: UpdateUserDTO ){
        const updatedUser =  await this.userRepository.update(id,updateRequest )

        return {
            message: 'User Updated',
            user: new ListUserDTO(updatedUser.id,updatedUser.nome )
        }
    }

}