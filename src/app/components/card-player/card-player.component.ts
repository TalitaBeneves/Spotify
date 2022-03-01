import { SpotifyService } from 'src/app/services/spotify.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/common/factories';
import { IMusica } from './../../Interfaces/IMusica';
import { PlayerService } from './../../services/player.service';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.scss'],
})
export class CardPlayerComponent implements OnInit, OnDestroy {
  musica: IMusica = newMusica();
  subs: Subscription[] = [];

  playBoolean: boolean = false;
  play: string = 'bi bi-play-fill';

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.obterMusicaTocando();
    this.trocarIcon();
  }

  obterMusicaTocando() {
    const sub = this.playerService.musicaAtual.subscribe((musica) => {
      this.musica = musica;
    });

    this.subs.push(sub);
  }

  obterArtistas(musica: IMusica) {
    return musica.artistas.map((artista) => artista.nome).join(', ');
  }

  trocarIcon() {
    if (this.playBoolean) {
      this.playBoolean = false;
      this.play = 'bi bi-pause-circle';
      this.comecarMusica();
    } else if (this.playBoolean === false) {
      this.playBoolean = true;
      this.play = 'text';
      this.play = 'bi bi-play-fill';
      this.pausarMusica();
    }
  }

  comecarMusica() {
    this.playerService.comecarMusica();
  }

  pausarMusica() {
    this.playerService.pausarMusica();
  }

  voltarMusica() {
    this.playerService.voltarMusica();
  }

  proximaMusica() {
    this.playerService.proximaMusica();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

}
