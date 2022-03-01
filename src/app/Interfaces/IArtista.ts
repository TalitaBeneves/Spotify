import { IMusica } from './IMusica';

export interface IArtista {
  genero: string;
  id: string;
  nome: string;
  imagemUrl: string;
  musicas?: IMusica[];
}
