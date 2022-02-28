import { IMusica } from "./IMusica";

export interface IArtista {
  id: string,
  nome: string,
  genero: string,
  imagemUrl: string,
  URI: string,
  musicas?: IMusica[]
}
