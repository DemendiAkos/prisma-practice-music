import { IsDefined, isDefined, IsOptional } from "class-validator";

export class Playlist {
    @IsDefined()
    playlistID: number;
    @IsDefined()
    name: string;
}
