import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-programaciondesalas',
  template: `<div class="container p__6rem">
    <div class="container__flex">
      <div class="row__25 mb__1rem">
        <app-calendar></app-calendar>
      </div>
      <div class="row__100">
        <router-outlet></router-outlet>
      </div>
    </div>
  </div> `,
  styles: [
    `
      .container__flex {
        display: flex;
        flex-direction: column;
      }

      .w__100 {
        width: 100%;
      }

      .mb__1rem {
        margin-bottom: 1rem;
      }

      @media (min-width: 768px) and (min-width: 992px) {
        .container__flex {
          flex-direction: row;
        }

        .row__25 {
          width: 25%;
        }

        .row__100 {
          width: 100%;
          margin-left: 2rem;
        }
      }
    `,
  ],
})
export class ProgramaciondesalasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
