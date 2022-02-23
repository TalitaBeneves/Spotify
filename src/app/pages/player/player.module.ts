import { HomeComponent } from './../home/home.component';
import { RodapeUserComponent } from './../../components/rodape-user/rodape-user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { PlayerRotas } from './player.routes';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { BotaoMenuComponent } from 'src/app/components/botao-menu/botao-menu.component';

@NgModule({
  declarations: [PlayerComponent, MenuComponent, BotaoMenuComponent, RodapeUserComponent, HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(PlayerRotas),
  ],
})
export class PlayerModule {}
