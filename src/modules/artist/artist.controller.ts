import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { validate } from 'uuid';

import { ArtistService } from './artist.service';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

import { ERROR } from 'src/common/messages';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}
  @Post()
  create(@Body() createArtistDto: CreateArtistDto, @Res() res) {
    if (!createArtistDto.name || !createArtistDto.grammy) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: ERROR.INVALID_ARTIST_REQUEST });
      return;
    }
    const createdArtist = this.artistService.create(createArtistDto);
    res.status(StatusCodes.CREATED).json(createdArtist);
  }
  @Get()
  findAll(@Res() res) {
    const users = this.artistService.findAll();
    res.status(StatusCodes.OK).json(users);
  }
  @Get(':id')
  findOne(@Param('id') id: string, @Res() res) {
    if (!validate(id)) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: ERROR.ID });
      return;
    }
    const artist = this.artistService.findOne(id);
    if (!artist) {
      res.status(StatusCodes.NOT_FOUND).json({ error: ERROR.ARTIST_NOT_FOUND });
      return;
    }
    res.status(StatusCodes.OK).json(artist);
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
    @Res() res,
  ) {
    if (!validate(id)) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: ERROR.ID });
      return;
    }
    if (!this.artistService.findOne(id)) {
      res.status(StatusCodes.NOT_FOUND).json({ error: ERROR.ARTIST_NOT_FOUND });
      return;
    }
    const updatedArtist = this.artistService.update(id, updateArtistDto);
    res.status(StatusCodes.OK).json(updatedArtist);
  }
  @Delete(':id')
  remove(@Param('id') id: string, @Res() res) {
    if (!validate(id)) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: ERROR.ID });
      return;
    }
    if (!this.artistService.findOne(id)) {
      res.status(StatusCodes.NOT_FOUND).json({ error: ERROR.ARTIST_NOT_FOUND });
      return;
    }
    this.artistService.remove(id);
    res.status(StatusCodes.NO_CONTENT).send();
  }
}
