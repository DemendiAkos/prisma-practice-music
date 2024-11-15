import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException, Query } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto);
  }

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get('/free')
  findFree() {
    return this.songsService.findFree();
  }

  @Get('/top')
  findTop(@Query('count') count?: number) {
    return this.songsService.findTop(count);
  }

  @Get('/popularArtists')
  findPop() {
    return this.songsService.findPop();
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const song = await this.songsService.findOne(+id);
    if (!song) {
      throw new NotFoundException('Song not found');
    }
    return song;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    const song = await this.songsService.update(+id, updateSongDto);
    if (!song) {
      throw new NotFoundException('Song not found');
    }
    return song;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const song = await this.songsService.remove(+id);
    if(!song) {
      throw new NotFoundException('Song not found');
    } else {
      return { message: 'Song deleted successfully' }
    }
  }

}
