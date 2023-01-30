import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Spotify from 'spotify-web-api-js';
import { SpotifyConfig } from 'src/environments/environment';
import {
  SpotifyArtistaParaArtista,
  SpotifyPlaylistParaPlaylist,
  SpotifySinglePlaylistParaPlaylist,
  SpotifyTrackParaMusica,
  SpotifyTrackParaMusicaArtista,
  SpotifyUserParaUsuario,
} from '../common/spotifyHelpers';
import { IPlaylist } from '../Interfaces/IPlaylist';
import { IUsuario } from '../Interfaces/IUsuario';
import { IArtista } from './../Interfaces/IArtista';
import { IMusica } from './../Interfaces/IMusica';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  spotifyAPI: Spotify.SpotifyWebApiJs = null;
  usuario: IUsuario;

  constructor(private router: Router) {
    this.spotifyAPI = new Spotify();
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
    this.usuario = SpotifyUserParaUsuario(userInfo);
  }

  async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this.spotifyAPI.getUserPlaylists(this.usuario.id, {
      offset,
      limit,
    });
    return playlists.items.map(SpotifyPlaylistParaPlaylist);
  }

  async buscarMusicas(offset = 1, limit = 50): Promise<IMusica[]> {
    const musicas = await this.spotifyAPI.getMySavedTracks({ offset, limit });
    return musicas.items.map((x) => SpotifyTrackParaMusica(x.track));
  }

  async executarMusica(musicaId: string) {
    await this.spotifyAPI.queue(musicaId);
    await this.spotifyAPI.skipToNext();
  }

  async obterMusicaAtual(): Promise<IMusica> {
    const musicaSpotify = await this.spotifyAPI.getMyCurrentPlayingTrack();
    return SpotifyTrackParaMusica(musicaSpotify.item);
  }

  async buscarTopArtistas(limit = 5): Promise<IArtista[]> {
    const artistas = await this.spotifyAPI.getMyTopArtists({ limit });
    return artistas.items.map(SpotifyArtistaParaArtista);
  }

  async buscarTopArtista(id: string): Promise<IMusica[]> {
    let traks = await this.spotifyAPI.getArtistAlbums(id);
    let trakId = traks.items.map((x) => x.id);
    let trak = await this.spotifyAPI.getAlbumTracks(trakId[0] as any);

    return (await trak).items.map((x) => SpotifyTrackParaMusicaArtista(x));
  }

  async comecarMusica() {
    await this.spotifyAPI.play();
  }

  async pausarMusica() {
    await this.spotifyAPI.pause();
  }

  async voltarMusica() {
    await this.spotifyAPI.skipToPrevious();
  }

  async proximaMusica() {
    await this.spotifyAPI.skipToNext();
  }

  async buscarMusicasPlaylist(playlistId: string, offset = 0, limit = 50) {
    const playlistSpotify = await this.spotifyAPI.getPlaylist(playlistId);

    if (!playlistSpotify) return null;

    const playlist = SpotifySinglePlaylistParaPlaylist(playlistSpotify);
    const musicasSpotify = await this.spotifyAPI.getPlaylistTracks(playlistId, {
      offset,
      limit,
    });
    playlist.musicas = musicasSpotify.items.map((musica) =>
      SpotifyTrackParaMusica(musica.track as SpotifyApi.TrackObjectFull)
    );

    return playlist;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
