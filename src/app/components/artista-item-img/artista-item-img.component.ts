import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-artista-item-img',
  templateUrl: './artista-item-img.component.html',
  styleUrls: ['./artista-item-img.component.scss'],
})
export class ArtistaItemImgComponent implements OnInit {
  @Input() imagemSrc = '';
  @Output() click = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onClick(){
    this.click.emit();
  }
}
