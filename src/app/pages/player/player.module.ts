import { HomeComponent } from './../home/home.component';
import { RodapeUserComponent } from './../../components/rodape-user/rodape-user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { PlayerRotas } from './player.routes';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { BotaoMenuComponent } from 'src/app/components/botao-menu/botao-menu.component';
import { TopArtistasComponent } from 'src/app/components/top-artista/top-artista.component';
import { PainelComponent } from 'src/app/components/painel/painel.component';
import { BuscarComponent } from 'src/app/components/buscar/buscar.component';
import { Top5Component } from 'src/app/components/top5/top5.component';

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
  ],
  imports: [CommonModule, RouterModule.forChild(PlayerRotas)],
})
export class PlayerModule {}
