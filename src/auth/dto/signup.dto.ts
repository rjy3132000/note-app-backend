import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    readonly name : string;

    @IsNotEmpty()
    @IsString({message : 'Invalid email'})
    readonly email : string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password : string;
}