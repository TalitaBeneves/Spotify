import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

import { ArtistaItemImgComponent } from 'src/app/components/artista-item-img/artista-item-img.component';
import { BannerComponent } from 'src/app/components/banner/banner.component';
import { BotaoMenuComponent } from 'src/app/components/botao-menu/botao-menu.component';
import { ToggleComponent } from 'src/app/components/toggle/toggle.component';
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
    ToggleComponent,
    Top5Component,
    ArtistaItemImgComponent,
    CardPlayerComponent,
    ListaMusicaComponent,
    BannerComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatButtonModule,
    FormsModule,
    RouterModule.forChild(PlayerRotas),
  ],
})
export class PlayerModule {}
