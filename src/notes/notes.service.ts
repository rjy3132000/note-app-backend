import { HttpStatus, Injectable } from '@nestjs/common';
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
        try {
            const newNoteData = new this.noteModel({
                ...note,
                user: user._id
            });
            const newNote = await newNoteData.save();
            return newNote;
        } catch (error) {
            return error;
        }
    }

    async getAllNotes() {
        try {
            const allNotes = await this.noteModel.find();
            return allNotes;
        } catch (error) {
            return error;
        }
    }

    async getNoteById(id: string) {
        try {
            
            const note = await this.noteModel.findById(id);           

            if (!note) {
                return HttpStatus.NOT_FOUND;
            }

            return note;

        } catch (error) {
            return error;
        }
    }
}
