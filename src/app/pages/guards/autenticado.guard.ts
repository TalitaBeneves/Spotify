import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from 'src/app/services/spotify.service';

@Injectable({
  providedIn: 'root',
})
export class AutenticadoGuard implements CanLoad {
  constructor(private router: Router, private spotifyService: SpotifyService) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    const token = localStorage.getItem('token');

    if (!token) {
      return this.semToken();
    }

    return new Promise((res) => {
      const usuariCriado = this.spotifyService.iniciarUsuario();
      if (usuariCriado) res(true);
      else res(this.semToken());
    });
  }

  semToken() {
    localStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }
}
