import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Notes {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;
}

export const NoteSchema = SchemaFactory.createForClass(Notes);