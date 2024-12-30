import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
     ConfigModule.forRoot({
      envFilePath : '.env',
      isGlobal : true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    NotesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
