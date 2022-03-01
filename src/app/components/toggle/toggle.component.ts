import { ThemeService } from '../../services/theme.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent implements OnInit {
  isDark: boolean;
  trocaIcon: boolean = false;

  constructor(private themeService: ThemeService) {
    this.themeService.initTheme();
    this.isDark = this.themeService.isDarkMode();
  }

  ngOnInit(): void {}

  toogleDark() {
    this.isDark = this.themeService.isDarkMode();
    this.isDark
      ? this.themeService.update('light-mode')
      : this.themeService.update('dark-mode');
      this.trocaIcon= !this.trocaIcon;
  }
}
