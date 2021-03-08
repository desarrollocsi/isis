import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  template: `
    <app-navbar></app-navbar>
    <div class="container-pages">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .container-pages {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
    `,
  ],
})
export class PagesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
