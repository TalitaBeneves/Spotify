import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { IArtista } from './../../Interfaces/IArtista';

@Component({
  selector: 'app-top5',
  templateUrl: './top5.component.html',
  styleUrls: ['./top5.component.scss']
})
export class Top5Component implements OnInit {

  artistas: IArtista[] = []

  constructor(private spotifyService: SpotifyService, private router: Router) { }

  ngOnInit(): void {
    this.buscarTopArtistas();
  }

  async buscarTopArtistas(){
    this.artistas = await this.spotifyService.buscarTopArtistas();
    console.log(this.artistas)
  }

  irParaPlaylist(artistaId: string){
    this.router.navigateByUrl(`player/lista/artista/${artistaId}`)
  }

}
