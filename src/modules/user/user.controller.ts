import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { validate } from 'class-validator';
import { StatusCodes } from 'http-status-codes';

import { UserService } from './user.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

import { ERROR } from 'src/common/messages';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll(@Res() res) {
    const users = this.userService.findAll();
    res.status(StatusCodes.OK).json(users);
  }
  @Get(':id')
  findOne(@Param('id') id: string, @Res() res) {
    if (!validate(id)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: ERROR.ID });
      return;
    }
    if (!this.userService.findOne(id)) {
      res.status(StatusCodes.NOT_FOUND).json({ error: ERROR.USER_NOT_FOUND });
      return;
    }
    const user = this.userService.findOne(id);
    res.status(StatusCodes.OK).json(user);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Res() res) {
    if (!createUserDto.login || !createUserDto.password) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: ERROR.LOGIN_PASSWORD_REQUIRED });
      return;
    }
    const user = this.userService.create(createUserDto);
    const { password, ...userWithoutPassword } = user;
    res.status(StatusCodes.CREATED).json(userWithoutPassword);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Res() res,
  ) {
    if (!validate(id)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: ERROR.ID });
      return;
    }
    if (!updatePasswordDto.newPassword || !updatePasswordDto.oldPassword) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: ERROR.BOTH_PASSWORDS_REQUIRED ,
      });
      return;
    }
    if (!this.userService.findOne(id)) {
      res.status(StatusCodes.NOT_FOUND).json({ error: ERROR.USER_NOT_FOUND });
      return;
    }
    const currentUserPassword = this.userService.findOne(id).password;
    if (updatePasswordDto.oldPassword !== currentUserPassword) {
      res.status(StatusCodes.FORBIDDEN).json({
        error: ERROR.INCORRECT_OLD_PASSWORD,
      });
      return;
    }
    const updatedUser = this.userService.update(id, updatePasswordDto);
    const { password, ...userWithoutPassword } = updatedUser;
    res.status(StatusCodes.OK).json(userWithoutPassword);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res) {
    if (!validate(id)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: ERROR.ID });
      return;
    }
    if (!this.userService.findOne(id)) {
      res.status(StatusCodes.NOT_FOUND).json({ error: ERROR.USER_NOT_FOUND });
      return;
    }
    this.userService.remove(id);
    res.status(StatusCodes.NO_CONTENT).send();
  }
}
