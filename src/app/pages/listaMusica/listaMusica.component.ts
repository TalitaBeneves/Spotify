import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/common/factories';
import { PlayerService } from 'src/app/services/player.service';
import { IMusica } from './../../Interfaces/IMusica';
import { SpotifyService } from './../../services/spotify.service';

@Component({
  selector: 'app-listaMusica',
  templateUrl: './listaMusica.component.html',
  styleUrls: ['./listaMusica.component.scss'],
})
export class ListaMusicaComponent implements OnInit, OnDestroy {
  bannerImagemUrl = '';
  bannerTexto = '';
  subs: Subscription[] = [];
  musicas: IMusica[] = [];

  titulo = '';
  musicaAtual: IMusica = newMusica();

  constructor(
    private activeRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    this.obterMusicas();
    this.obterMusicaAtual();
  }

  obterMusicaAtual(){
    const sub = this.playerService.musicaAtual.subscribe(musica => {
      this.musicaAtual = musica;
    });

    this.subs.push(sub);
  }

  obterMusicas() {
    const sub = this.activeRoute.paramMap.subscribe(async (params) => {
      const tipo = params.get('tipo');
      const id = params.get('id');
      await this.obterDadosPagina(tipo, id);
    });

    this.subs.push(sub);
  }

  async obterDadosPagina(tipo: string, id: string) {
    if (tipo === 'playlist') await this.obterDadosPlaylist(id);
    else await this.obterDadosArtitas(id);
  }

  async obterDadosPlaylist(playlistId: string) {
    const playlistMusicas = await this.spotifyService.buscarMusicasPlaylist(
      playlistId
    );
    // console.log(playlistMusicas)
    this.definirDadosPagina(
      playlistMusicas.nome,
      playlistMusicas.imagemUrl,
      playlistMusicas.musicas
    );
    this.titulo = '' + playlistMusicas.nome;
  }

  async obterDadosArtitas(playlistId: string) {}

  definirDadosPagina(
    bannerTexto: string,
    bannerImage: string,
    musicas: IMusica[]
  ) {
    this.bannerImagemUrl = bannerImage;
    this.bannerTexto = bannerTexto;
    this.musicas = musicas;
  }

  async executarMusica(musica: IMusica) {
    await this.spotifyService.executarMusica(musica.id);
    this.playerService.definirMusicaAtual(musica);
  }

  obterArtistas(musica: IMusica) {
    return musica.artistas.map((artista) => artista.nome).join(', ');
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
