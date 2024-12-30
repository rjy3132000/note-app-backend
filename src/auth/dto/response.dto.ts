import { IsOptional } from "class-validator";

export class ResponseDto {
    @IsOptional()
    readonly token: string;

    readonly data: any;

    readonly message: string;

    readonly status: number;
}