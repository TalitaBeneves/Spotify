import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArtistaItemImgComponent } from 'src/app/components/artista-item-img/artista-item-img.component';
import { BotaoMenuComponent } from 'src/app/components/botao-menu/botao-menu.component';
import { BuscarComponent } from 'src/app/components/buscar/buscar.component';
import { CardPlayerComponent } from 'src/app/components/card-player/card-player.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { PainelComponent } from 'src/app/components/painel/painel.component';
import { TopArtistasComponent } from 'src/app/components/top-artista/top-artista.component';
import { Top5Component } from 'src/app/components/top5/top5.component';
import { ListaMusicaComponent } from '../listaMusica/listaMusica.component';
import { RodapeUserComponent } from './../../components/rodape-user/rodape-user.component';
import { HomeComponent } from './../home/home.component';
import { PlayerComponent } from './player.component';
import { PlayerRotas } from './player.routes';

@NgModule({
  declarations: [
    PlayerComponent,
    MenuComponent,
    BotaoMenuComponent,
    RodapeUserComponent,
    HomeComponent,
    TopArtistasComponent,
    PainelComponent,
    BuscarComponent,
    Top5Component,
    ArtistaItemImgComponent,
    CardPlayerComponent,
    ListaMusicaComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(PlayerRotas)],
})
export class PlayerModule {}
