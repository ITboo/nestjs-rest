import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

import { db } from 'src/database/data';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    db.tracks.push(track);
    return track;
  }
  findAll() {
    return db.tracks;
  }
  findOne(id: string) {
    return db.tracks.find((track) => track.id === id);
  }
  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.findOne(id);
    Object.assign(track, updateTrackDto);
    return track;
  }
  remove(id: string) {
    const trackIndex = db.tracks.findIndex((track) => track.id === id);
    db.tracks.splice(trackIndex, 1);
  }
}
