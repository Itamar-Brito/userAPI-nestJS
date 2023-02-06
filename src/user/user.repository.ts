import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository {
    private users: UserEntity[] = [];

    async save(user: UserEntity) {
        this.users.push(user)
    }

    
    async list(){
        return this.users
    }

    async emailExists(email:string){
        const matchUser = this.users.find(
            user => user.email == email
        );

        return matchUser !== undefined;
    }


    async update(id: string, updateRequest: Partial<UserEntity>){
        const user = this.users.find(
            userSaved  => userSaved.id === id
        )

        if(!user){
            throw new Error("User not found");
        }

        Object.entries(updateRequest).forEach( ([key,value])=> {
            if(key === 'id'){
                return
            }
            user[key] = value
        } );

        return user
    }
}