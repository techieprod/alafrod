import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    elem;
    constructor(@Inject(DOCUMENT) private document: any) {
    }

    ngOnInit() {
        this.elem = document.documentElement;
      //  this.openFullscreen();
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
      // closeFullscreen() {
      //   if (this.document.exitFullscreen) {
      //     this.document.exitFullscreen();
      //   } else if (this.document.mozCancelFullScreen) {
      //     /* Firefox */
      //     this.document.mozCancelFullScreen();
      //   } else if (this.document.webkitExitFullscreen) {
      //     /* Chrome, Safari and Opera */
      //     this.document.webkitExitFullscreen();
      //   } else if (this.document.msExitFullscreen) {
      //     /* IE/Edge */
      //     this.document.msExitFullscreen();
      //   }
      // }
}
