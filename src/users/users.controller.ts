import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Patch,
  Delete,
} from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { IAuthenticationResponse, IRequestUser } from './user.structures';
import { LoginDTO } from './dtos/login.dto';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersGuard } from './users.guard';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateUserDocs,
  DeleteUserDocs,
  GetUserDocs,
  LoginDocs,
  UpdateUserDocs,
} from './users.docs';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(UsersGuard)
  @GetUserDocs()
  findById(@Request() { user }: IRequestUser): Promise<User | undefined> {
    return this.userService.findById(user.id);
  }

  @Post()
  @CreateUserDocs()
  create(@Body() data: CreateUserDTO): Promise<User> {
    return this.userService.create(data);
  }

  @Patch()
  @UseGuards(UsersGuard)
  @UpdateUserDocs()
  update(
    @Request() { user }: IRequestUser,
    @Body() dataToUpdate: UpdateUserDTO,
  ): Promise<User> {
    return this.userService.update(user, dataToUpdate);
  }

  @Delete()
  @UseGuards(UsersGuard)
  @DeleteUserDocs()
  delete(@Request() { user }: IRequestUser): Promise<void> {
    return this.userService.delete(user.id);
  }

  @Post('/login')
  @LoginDocs()
  login(@Body() loginData: LoginDTO): Promise<IAuthenticationResponse> {
    return this.userService.login(loginData);
  }
}
