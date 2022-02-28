import { IArtista } from './../../Interfaces/IArtista';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Component, OnInit } from '@angular/core';
import { newArtista } from 'src/app/common/factories';
import { Data } from '@angular/router';

@Component({
  selector: 'app-top-artista',
  templateUrl: './top-artista.component.html',
  styleUrls: ['./top-artista.component.scss'],
})
export class TopArtistasComponent implements OnInit {
  topArtista: IArtista = newArtista();


  letters = '0123456789ABCDE';
  color: any = '#';

  ativo: boolean = false;
  

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.buscarArtista();
    this.randomColor();
  }

  async buscarArtista() {
    const artistas = await this.spotifyService.buscarTopArtistas(1);
    if (!!artistas) this.topArtista = artistas.pop();

    console.log('Top Artista', artistas);
  }

  randomColor() {
    this.color = '#';
    for (var i = 0; i < 4; i++) {
      this.color += this.letters[Math.floor(Math.random() * 10)];
    }

  }

}

