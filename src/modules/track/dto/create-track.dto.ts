import { Track } from '../entities/track.entity';
export type CreateTrackDto = Omit<Track, 'id'>;