import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotesService } from './notes.service';
import { NotesDto } from './dto/notes.dto';

@Controller('notes')
@UseGuards(AuthGuard())
export class NotesController {
    constructor(
        private notesServise: NotesService
    ) {}

    @Post('/create')
    CreaetNote(@Body() note: NotesDto, @Req() req) {
        return this.notesServise.createNote(note, req.user);
    }
}
