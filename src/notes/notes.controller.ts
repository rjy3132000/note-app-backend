import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotesService } from './notes.service';
import { NotesDto } from './dto/notes.dto';

@Controller('notes')
@UseGuards(AuthGuard())
export class NotesController {
    constructor(
        private notesServise: NotesService
    ) {}

    @Post('')
    CreaetNote(@Body() note: NotesDto, @Req() req) {
        return this.notesServise.createNote(note, req.user);
    }

    @Get('')
    GetAllNotes() {
        return this.notesServise.getAllNotes();
    }

    @Get('/:id')
    GetNoteById(@Param('id') id:string) {
        return this.notesServise.getNoteById(id);
    }
}
