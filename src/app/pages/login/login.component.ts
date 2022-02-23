import { SpotifyService } from './../../services/spotify.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private spotifyService: SpotifyService, private router: Router,) {}

  ngOnInit(): void {
    this.verificarTokeCallBack();
  }

  verificarTokeCallBack() {
    const token = this.spotifyService.obterTokenCallback();
    if (!!token) {
      this.spotifyService.definirAcessoToken(token);
      this.router.navigate(['/player'])
    }
  }

  abrirLogin() {
    location.href = this.spotifyService.obterUrlLogin();
  }
}
