import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserRepository } from "../user.repository";

@Injectable()
@ValidatorConstraint({async:true})
export class EmailUniqueValidator implements ValidatorConstraintInterface{

    constructor(private userRepository: UserRepository ){}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {

        const userExists = await this.userRepository.emailExists(value);

        return !userExists;
    }
}

export const EmailUnique = (validateOptions: ValidationOptions) => {
    return (objeto: Object, proprieties: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: proprieties,
            options: validateOptions,
            constraints:[],
            validator: EmailUniqueValidator
        })
    }
    

}