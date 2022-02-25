import { IMusica } from './../Interfaces/IMusica';
import { IArtista } from './../Interfaces/IArtista';
import { IPlaylist } from '../Interfaces/IPlaylist';

export function newArtista(): IArtista {
  return {
    id: '',
    imagemUrl: '',
    nome: '',
  };
}

export function newMusica(): IMusica {
  return {
    id: '',
    album: {
      id: '',
      imagemUrl: '',
      nome: '',
    },
    artistas: [],
    tempo: '',
    titulo: ''
  }
}

export function newPlaylist(): IPlaylist {
  return {
    id: '',
    imagemUrl: '',
    nome: '',
    musicas: []
  }
}
