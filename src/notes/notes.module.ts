import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteSchema } from './schemas/notes.schemas';

@Module({
  imports: [AuthModule, MongooseModule.forFeature([{ name: 'Note', schema: NoteSchema }])],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule {}
