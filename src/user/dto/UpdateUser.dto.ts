import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EmailUnique } from "../validation/EmailUnique.validator";

export class UpdateUserDTO {

    @IsNotEmpty({message: 'Nome não pode ser vazio'})
    @IsOptional()
    nome:string;

    @EmailUnique({message:'Já existe um usuário com esse email'})
    @IsEmail(undefined,{message:"O email informado é inválido"})
    @IsOptional()
    email:string;

    @MinLength(6,{message: 'A senha precisa ter pelo menos 6 caracteres'})
    @IsOptional()
    senha:string;
}