import { IArtista } from './../../Interfaces/IArtista';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top5',
  templateUrl: './top5.component.html',
  styleUrls: ['./top5.component.scss']
})
export class Top5Component implements OnInit {

  artistas: IArtista[] = []

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.buscarTopArtistas();
  }

  async buscarTopArtistas(){
    this.artistas = await this.spotifyService.buscarTopArtistas();
    console.log(this.artistas)
  }

}
