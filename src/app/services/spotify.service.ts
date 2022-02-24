import { IMusica } from './../Interfaces/IMusica';
import { IArtista } from './../Interfaces/IArtista';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Spotify from 'spotify-web-api-js';
import { SpotifyConfig } from 'src/environments/environment';
import { SpotifyArtistaParaArtista, SpotifyPlaylistParaPlaylist, SpotifyTrackParaMusica, SpotifyUserParaUsuario } from '../common/spotifyHelpers';
import { IPlaylist } from '../Interfaces/IPlaylist';
import { IUsuario } from '../Interfaces/IUsuario';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  spotifyAPI: Spotify.SpotifyWebApiJs = null;
  usuario: IUsuario;

  constructor(private router: Router) {
    this.spotifyAPI = new Spotify();
  }

  async iniciarUsuario() {
    if (!!this.usuario) return true;

    const token = localStorage.getItem('token');

    if (!token) return false;

    try {
      this.definirAcessoToken(token);
      await this.obterSpotifyUsuario();
      return !!this.usuario;
    } catch (error) {
      return false;
    }
  }

  async obterSpotifyUsuario() {
    const userInfo = await this.spotifyAPI.getMe();
    console.log(userInfo)
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

  obterTokenCallback() {
    if (!location.hash) return '';

    const params = location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  definirAcessoToken(token: string) {
    this.spotifyAPI.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async buscarPlaylistUsuario(offset = 0, limit = 50):Promise<IPlaylist[]> {
    const playlists = await this.spotifyAPI.getUserPlaylists();
    console.log(playlists)
    return playlists.items.map(SpotifyPlaylistParaPlaylist)
  }

  async buscarTopArtistas(limit = 10):Promise<IArtista[]>{
    const artistas = await this.spotifyAPI.getMyTopArtists({ limit })
    console.log(artistas);
    return artistas.items.map(SpotifyArtistaParaArtista);
  }

  async buscarMusicas(offset = 0, limit = 50):Promise<IMusica[]> {
    const musicas = await this.spotifyAPI.getMySavedTracks({ offset, limit });
    return musicas.items.map(x => SpotifyTrackParaMusica(x.track));
  }

  async executarMusica(musicaId: string) {
    await this.spotifyAPI.queue(musicaId);
    await this.spotifyAPI.skipToNext();
  }

  async obterMusicaAtual():Promise<IMusica>{
    const musicaSpotify = await this.spotifyAPI.getMyCurrentPlayingTrack();
    return SpotifyTrackParaMusica(musicaSpotify.item);
    }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
