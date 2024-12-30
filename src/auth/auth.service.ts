import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/signup.dto';
import { ResponseDto } from './dto/response.dto';
import { validate } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private generateToken: JwtService,
  ) {}

  async SignUp(signUpData: SignUpDto): Promise<ResponseDto> {
    try {
      const errors = await validate(signUpData);

      if (errors.length > 0) {
        return {
          token: null,
          data: null,
          message:
            'Validation failed: ' +
            errors.map((err) => Object.values(err.constraints)).join(', '),
          status: HttpStatus.BAD_REQUEST,
        };
      }

      const { email } = signUpData;
      const exitngUser = await this.userModel.findOne({ email });
      if (exitngUser) {
        return {
          token: null,
          data: null,
          message: 'Email is already exiting...',
          status: HttpStatus.UNAUTHORIZED,
        };
      }

      const newUser = new this.userModel(signUpData);
      if (newUser) {
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashedPassword;
        const savedUser = await newUser.save();
        const token = this.generateToken.sign({ id: savedUser._id });

        return {
          token,
          data: savedUser,
          message: 'User created successfully',
          status: HttpStatus.CREATED,
        };
      } else {
        return {
          token: null,
          data: null,
          message: 'Bad request',
          status: HttpStatus.BAD_REQUEST,
        };
      }
    } catch (error) {
      return {
        token: null,
        data: null,
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async SignIn(signData: SignInDto): Promise<ResponseDto> {
    try {
      const { email, password } = signData;
      const checkUser = await this.userModel.findOne({ email });
      if (!checkUser) {
        return {
          token: null,
          data: null,
          message: 'Invalid email and password',
          status: HttpStatus.UNAUTHORIZED,
        };
      }
      const isPasswordMatch = await bcrypt.compare(
        password,
        checkUser.password,
      );
      if (!isPasswordMatch) {
        return {
          token: null,
          data: null,
          message: 'Invalid email and password',
          status: HttpStatus.UNAUTHORIZED,
        };
      }
      const token = this.generateToken.sign({ id: checkUser._id });
      return {
        token,
        data: checkUser,
        message: 'Login successful',
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        token: null,
        data: null,
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
