import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { ErrorCodeEnum } from "src/exceptions/error-code.enum";

export class LoginInput {
    @IsNotEmpty()
    @IsEmail(
      { allow_utf8_local_part: false },
      { message: ErrorCodeEnum[ErrorCodeEnum.INVALID_EMAIL] }
    )
    email: string;

    @IsString()
    @Matches(/[A-Za-z]/, { message: ErrorCodeEnum[ErrorCodeEnum.INVALID_PASSWORD] })
    @MinLength(8)
    @MaxLength(26)
    @IsNotEmpty()
    password: string;
}