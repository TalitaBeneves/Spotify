import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss'],
})
export class PainelComponent implements OnInit {
  @Output() bannerImagemUrl = new EventEmitter();
  @Output() nomeArtista = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  pegandoImg(e) {
    this.bannerImagemUrl.emit(e);
  }
  pegandoNome(e) {
    this.nomeArtista.emit(e);
  }
}
