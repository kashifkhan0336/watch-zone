
import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';

@Controller('media')
export class MediaController {
    @Get("/movie/:id")
    getMovie(@Param() params: any): string {
        return params.id
    }

    @Get("/movies/")
    getMovies(): string[] {
        return ["Dark Knight", "Batman begins"]
    }

    @Get("/movies/:genre")
    getMoviesByGenre(@Param() params: any): Array<{ name: string }> {
        if (params.genre == "action") {
            return [
                {
                    name: "Dark Knight"
                }
            ]
        }
        if (params.genre == "comedy") {
            return [
                {
                    name: "Mr Bean"
                }
            ]
        }
    }
}
