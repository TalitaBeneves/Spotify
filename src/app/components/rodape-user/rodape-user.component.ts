import { SpotifyService } from 'src/app/services/spotify.service';
import { IUsuario } from 'src/app/Interfaces/IUsuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rodape-user',
  templateUrl: './rodape-user.component.html',
  styleUrls: ['./rodape-user.component.scss'],
})
export class RodapeUserComponent implements OnInit {
  usuario: IUsuario;

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    this.usuario = this.spotifyService.usuario;
  }

  logout() {
    this.spotifyService.logout();
  }
}
