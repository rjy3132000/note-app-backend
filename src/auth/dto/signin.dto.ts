import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignInDto {

    @IsNotEmpty()
    @IsString({message : 'Invalid email'})
    readonly email : string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password : string;
}