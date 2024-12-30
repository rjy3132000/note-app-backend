import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('notes')
@UseGuards(AuthGuard())
export class NotesController {
    constructor() {}

    @Post('/create')
    CreaetNote() {
        return 'Note created';
    }
}
