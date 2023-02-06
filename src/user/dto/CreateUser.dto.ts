import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { EmailUnique } from "../validation/EmailUnique.validator";

export class CreateUserDTO {

    @IsNotEmpty({message: 'Nome não pode ser vazio'})
    nome:string;

    @EmailUnique({message:'Já existe um usuário com esse email'})
    @IsEmail(undefined,{message:"O email informado é inválido"})
    email:string;

    @MinLength(6,{message: 'A senha precisa ter pelo menos 6 caracteres'})
    senha:string;
}