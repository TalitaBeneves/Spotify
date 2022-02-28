import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/common/factories';
import { IMusica } from './../../Interfaces/IMusica';
import { PlayerService } from './../../services/player.service';
import { SpotifyService } from './../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  musicas: IMusica[] = [];
  musicaAtual: IMusica = newMusica();
  subs: Subscription[] = [];
  play: boolean = false;
  // play: string = 'bi bi-pause-circle';
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
      this.play= !this.play;
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
