import { SpotifyService } from './../../services/spotify.service';
import { Subscription } from 'rxjs';
import { async } from '@angular/core/testing';
import { IMusica } from './../../Interfaces/IMusica';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { newMusica } from 'src/app/common/factories';
import { ActivatedRoute } from '@angular/router';

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

  musicaAtual: IMusica = newMusica();

  constructor(private activeRoute: ActivatedRoute, private spotifyService: SpotifyService) {}


  ngOnInit() {
    this.obterMusicas();
  }

  obterMusicas(){
   const sub = this.activeRoute.paramMap.subscribe(async params => {
     const tipo = params.get('tipo');
     const id = params.get('id');
     await this.obterDadosPagina(tipo, id);
    })

    this.subs.push(sub);
  }

  async obterDadosPagina(tipo: string, id: string){
    if(tipo === 'playlist')
      await this.obterDadosPlaylist(id);
    else
      await this.obterDadosArtitas(id);
  }

  async obterDadosPlaylist(playlistId: string){

  }

  async obterDadosArtitas(playlistId: string){

  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
