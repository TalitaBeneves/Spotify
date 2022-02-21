import { Injectable } from '@angular/core';
import { SpotifyConfig } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { IUsuario } from '../pages/Interfaces/IUsuario';
import { async } from '@angular/core/testing';
import { SpotifyUserParaUsuario } from '../Common/spotifyHelpers';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  spotifyAPI: Spotify.SpotifyWebApiJs = null;
  usuario: IUsuario;

  constructor() {
    this.spotifyAPI = new Spotify();
  }

  async iniciarUsuario() {
    if (!!this.usuario)
      return true;

    const token = localStorage.getItem('token');

    if (!token)
      return false;

    try {
      this.definirAcessoToken(token);
      await this.obterSpotifyUser();
      return !!this.usuario;
    }
    catch (error) {
      return false;
    }
  }

  async obterSpotifyUser() {
    const userInfo = await this.spotifyAPI.getMe();
    this.usuario = SpotifyUserParaUsuario(userInfo);
  }

  obterUrlLogin() {
    const authEndpoint = `${SpotifyConfig.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfig.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfig.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfig.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  obterTokenCallBack() {
    if (!location.hash) return '';

    const params = location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  definirAcessoToken(token: string) {
    this.spotifyAPI.setAccessToken(token);
    localStorage.setItem('token', token);
  }
}
