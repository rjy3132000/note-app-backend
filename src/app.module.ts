import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
     ConfigModule.forRoot({
      envFilePath : '.env',
      isGlobal : true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
