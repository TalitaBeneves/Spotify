import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { IArtista } from './../../Interfaces/IArtista';

@Component({
  selector: 'app-top5',
  templateUrl: './top5.component.html',
  styleUrls: ['./top5.component.scss'],
})
export class Top5Component implements OnInit {
  @Output() imagemArtista = new EventEmitter();
  @Output() nomeArtista = new EventEmitter();
  artistas: IArtista[] = [];
  artista: any;

  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit(): void {
    this.buscarTopArtistas();
  }

  async buscarTopArtistas() {
    this.artistas = await this.spotifyService.buscarTopArtistas();
  }

  async irParaPlaylist(playlistId: string, img: string, nome: string) {
    this.artista = await this.spotifyService.buscarTopArtista(playlistId);
    this.router.navigateByUrl(`player/lista/artista/${playlistId}`);

    this.imagemArtista.emit(img);
    this.nomeArtista.emit(nome);
  }
}
