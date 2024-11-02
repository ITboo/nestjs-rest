import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

import { db } from 'src/database/data';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    db.artists.push(artist);
    return artist;
  }
  findAll() {
    return db.artists;
  }
  findOne(id: string) {
    return db.artists.find((artist) => artist.id === id);
  }
  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.findOne(id);
    Object.assign(artist, updateArtistDto);
    return artist;
  }
  remove(id: string) {
    const artistIndex = db.artists.findIndex((artist) => artist.id === id);
    db.artists.splice(artistIndex, 1);
  }
}