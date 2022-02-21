import { SpotifyService } from './../../services/spotify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.verificarTokeCallBack();
  }

  verificarTokeCallBack() {
    const token = this.spotifyService.obterTokenCallBack();
    if (!!token) {
      this.spotifyService.definirAcessoToken(token);
    }
  }

  abrirLogin() {
    location.href = this.spotifyService.obterUrlLogin();
  }
}
