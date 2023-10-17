import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { LangRegex } from "../../auth/validation-regex";
import { UserRoleEnum } from "../user.enum";
import { ErrorCodeEnum } from "src/exceptions/error-code.enum";

export class CreateUserInput {
    @IsNotEmpty()
    @Matches(LangRegex, { message: ErrorCodeEnum[ErrorCodeEnum.INVALID_NAME] })
    @MinLength(2)
    @MaxLength(25)
    firstName: string;

    @IsNotEmpty()
    @Matches(LangRegex, { message: ErrorCodeEnum[ErrorCodeEnum.INVALID_NAME] })
    @MinLength(2)
    @MaxLength(25)
    lastName: string;

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

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    nation?: string;
    
    @IsOptional()
    @IsEnum(UserRoleEnum)
    role?: UserRoleEnum;
}