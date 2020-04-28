import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pos-home',
  templateUrl: './pos-home.component.html',
  styleUrls: ['./pos-home.component.scss']
})
export class PosHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToPage(value) {
    this.router.navigate([value]);

  }

}
