import { PlayerService } from './../../services/player.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMusica } from './../../Interfaces/IMusica';
import { SpotifyService } from './../../services/spotify.service';
import { newMusica } from 'src/app/common/factories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  musicas: IMusica[] = [];
  play: boolean = false;
  musicaAtual: IMusica = newMusica();
  subs: Subscription[] = [];

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.obterMusicas();
    this.obterMusicaAtual();
  }

  async obterMusicas() {
    this.musicas = await this.spotifyService.buscarMusicas();

  }

  obterArtistas(musica: IMusica) {
    return musica.artistas.map((artista) => artista.nome).join(', ');
  }

  obterMusicaAtual() {
    const sub = this.playerService.musicaAtual.subscribe((musica) => {
      this.musicaAtual = musica;
      console.log(this.musicaAtual)
    });

    this.subs.push(sub);
  }

  async executarMusica(musica: IMusica) {
    await this.spotifyService.executarMusica(musica.id);
    this.playerService.definirMusicaAtual(musica);
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
