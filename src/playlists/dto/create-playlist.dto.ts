import { IsDefined } from "class-validator";

export class CreatePlaylistDto {
    @IsDefined()
    name: string;
}
