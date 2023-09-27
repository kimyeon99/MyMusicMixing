"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const music_service_1 = require("./music/music.service");
const express = require("express");
const path_1 = require("path");
const playlist_service_1 = require("./playlist/playlist.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use('/static', express.static((0, path_1.join)(__dirname, '..', 'public')));
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    const musicService = app.get(music_service_1.MusicService);
    await musicService.uploadFiles('../frontend/src/musics');
    const playlistService = app.get(playlist_service_1.PlaylistService);
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map