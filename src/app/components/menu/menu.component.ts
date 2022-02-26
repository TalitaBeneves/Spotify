import { SpotifyService } from 'src/app/services/spotify.service';
import { Component, OnInit } from '@angular/core';
import { IPlaylist } from 'src/app/Interfaces/IPlaylist';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuAtivo = 'Home';

  playlists: IPlaylist[] = [];

  constructor(private router: Router, private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.buscarPlaylists();
  }

  botaoAtivo(botao: string) {
    this.menuAtivo = botao;
    this.router.navigateByUrl('player/home');
  }

  irParaPlaylist(playlistId: string){
    this.menuAtivo = playlistId;
    this.router.navigateByUrl(`player/lista/playlist/${playlistId}`)
  }

  async buscarPlaylists(){
    this.playlists = await this.spotifyService.buscarPlaylistUsuario();
    console.log(this.playlists)
  }
}
