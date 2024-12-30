import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(private auth: AuthService) {}

    @Post('/signup')
    SignUp(@Body() signUpData: SignUpDto) {
        return this.auth.SignUp(signUpData);
    }

    @Post('/signin')
    SignIn(@Body() signInData: SignInDto) {
        return this.auth.SignIn(signInData);
    }
}
