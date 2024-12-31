import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notes } from './schemas/notes.schemas';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schemas';

@Injectable()
export class NotesService {
    constructor(
        @InjectModel(Notes.name)
        private noteModel: mongoose.Model<Notes>
    ) {}

    async createNote(note: Notes, user: User) {
        const newNote = await this.noteModel.create({ ...note, user: user._id });
        return newNote;
    }
}
