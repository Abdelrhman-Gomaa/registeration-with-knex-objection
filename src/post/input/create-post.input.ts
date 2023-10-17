import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostInput {
    @IsNotEmpty()
    @IsString()
    content: string;
}