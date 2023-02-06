import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { EmailUniqueValidator } from "./validation/EmailUnique.validator";

@Module({
    controllers:[UserController],
    providers:[UserRepository, EmailUniqueValidator]
})
export class UserModule {}