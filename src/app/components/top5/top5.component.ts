import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { IArtista } from './../../Interfaces/IArtista';

@Component({
  selector: 'app-top5',
  templateUrl: './top5.component.html',
  styleUrls: ['./top5.component.scss'],
})
export class Top5Component implements OnInit {
  artistas: IArtista[] = [];
  artista: any;

  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit(): void {
    this.buscarTopArtistas();
  }

  async buscarTopArtistas() {
    this.artistas = await this.spotifyService.buscarTopArtistas();
  }

  // async irParaPlaylist(artistaId: string) {
  //   // this.menuAtivo = artistaId;
  //   this.artista = await this.spotifyService.buscarTopArtista();
  //   this.router.navigateByUrl(`player/lista/playlist/${this.artista.id}`);
  //   console.log(this.artista);
  // }

  async irParaPlaylist(playlistId: string) {
    this.artista = await this.spotifyService.buscarTopArtista(playlistId);
    // this.menuAtivo = this.artista;
    this.router.navigateByUrl(`player/lista/artista/${playlistId}`);
  }
}
