import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlaylistsService {
  
  constructor(public db: PrismaService) {}
  


  create(createPlaylistDto: CreatePlaylistDto) {
    return this.db.playlist.create({
      data: createPlaylistDto
    });
  }

  addSongToPlaylist(playlistid: number, songid: number) {
    return this.db.playlist.update({
      where: { playlistID: playlistid },
      data: {
        songs: {
          connect: { id: songid }
        }
      }
    });
  }
  
  async findAll() {
    return this.db.playlist.findMany();
  }

  async findOne(id: number) {
    return (await this.db.playlist.findUnique({
      where: { playlistID: id },
      include: {
        songs: true
      }
    }));
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }
}
