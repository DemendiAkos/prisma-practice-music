import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

import { PrismaService } from 'src/prisma.service';
import { groupBy } from 'rxjs';


@Injectable()
export class SongsService {
  constructor(public db: PrismaService) {}

  create(createSongDto: CreateSongDto) {
    return this.db.song.create({
      data: createSongDto
    });
  }

  async findAll() {
    return this.db.song.findMany();
  }

  findOne(id: number) {
    return this.db.song.findUnique({
      where: { id: id }
    });
  }

  async update(id: number, updateSongDto: UpdateSongDto) {
    try {
      return await this.db.song.update({
        where: { id: id },
        data: updateSongDto
      })
    } catch {
      return undefined
    }
  }

  async remove(id: number) {
    try {
      await this.db.song.delete({
        where: { id: id }
      })
      return true

    } catch {
      return false
    }
  }


  async findFree() {
    return this.db.song.findMany({
      where: { price: 0 }
    })
  }

  async findTop(count?: number) {

    count = Number(count);
    if (!count) {
      count = 10;
    }

    return this.db.song.findMany({
      take: count,
      orderBy: { rating: 'desc' }
    })
  }

  async findPop() {
  return (await this.db.song.groupBy({
   by: ['artist'],
   _count: true,
   orderBy: {
    _count: {
      artist: 'desc'
    }
   }
  })).map((x) => ({
   artist: x.artist,
   NumberofSongs: x._count
  }))
  }

  

}


