import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    elem;
    constructor(
      public router: Router, @Inject(DOCUMENT) private document: any
    ) {}

    ngOnInit() {
        // this.elem = document.documentElement;
        // this.openFullscreen();
    }

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }






    openFullscreen() {
        if (this.elem.requestFullscreen) {
          this.elem.requestFullscreen();
        } else if (this.elem.mozRequestFullScreen) {
          /* Firefox */
          this.elem.mozRequestFullScreen();
        } else if (this.elem.webkitRequestFullscreen) {
          /* Chrome, Safari and Opera */
          this.elem.webkitRequestFullscreen();
        } else if (this.elem.msRequestFullscreen) {
          /* IE/Edge */
          this.elem.msRequestFullscreen();
        }
      }

      /* Close fullscreen */
      closeFullscreen() {
        if (this.document.exitFullscreen) {
          this.document.exitFullscreen();
        } else if (this.document.mozCancelFullScreen) {
          /* Firefox */
          this.document.mozCancelFullScreen();
        } else if (this.document.webkitExitFullscreen) {
          /* Chrome, Safari and Opera */
          this.document.webkitExitFullscreen();
        } else if (this.document.msExitFullscreen) {
          /* IE/Edge */
          this.document.msExitFullscreen();
        }
      }
}
