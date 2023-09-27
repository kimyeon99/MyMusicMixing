"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicModule = void 0;
const common_1 = require("@nestjs/common");
const music_service_1 = require("./music.service");
const music_controller_1 = require("./music.controller");
const music_entity_1 = require("../entify/music.entity");
const typeorm_1 = require("@nestjs/typeorm");
const playlist_entity_1 = require("../entify/playlist.entity");
let MusicModule = class MusicModule {
};
exports.MusicModule = MusicModule;
exports.MusicModule = MusicModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([music_entity_1.Music, playlist_entity_1.Playlist])],
        controllers: [music_controller_1.MusicController],
        providers: [music_service_1.MusicService],
        exports: [MusicModule]
    })
], MusicModule);
//# sourceMappingURL=music.module.js.map