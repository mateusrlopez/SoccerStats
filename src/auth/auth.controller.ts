import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    Post,
    Request,
    Response,
    UseGuards,
} from '@nestjs/common';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserResponseDto } from '../user/dto/user-response.dto';
import { LocalGuard } from './guards/local.guard';
import { IAuthService } from './auth.service';
import { IUser } from '../user/entities/user.entity';
import { Public } from '../http/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(@Inject('AUTH_SERVICE') private readonly authService: IAuthService) {}

    @Public()
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(
        @Body() createUserDto: CreateUserDto,
        @Response() res: ExpressResponse
    ): Promise<UserResponseDto> {
        const user = await this.authService.register(createUserDto);
        const token = await this.authService.assignToken(user);

        res.append('Authorization', `Bearer ${token}`);

        return plainToInstance(UserResponseDto, user);
    }

    @Public()
    @UseGuards(LocalGuard)
    @Post('login')
    async login(
        @Request() req: ExpressRequest,
        @Response() res: ExpressResponse
    ): Promise<UserResponseDto> {
        const user = req.user as IUser;
        const token = await this.authService.assignToken(user);

        res.append('Authorization', `Bearer ${token}`);

        return plainToInstance(UserResponseDto, user);
    }

    @Get('me')
    async me(@Request() req: ExpressRequest): Promise<UserResponseDto> {
        const user = req.user as IUser;
        return plainToInstance(UserResponseDto, user);
    }
}