import { Component, OnInit, Input } from '@angular/core';

interface Loadding {
  isLoading: boolean;
  message?: string;
}

@Component({
  selector: 'app-loading',
  template: `<ng-container *ngIf="loading?.isLoading">
    <div class="container__loadding">
      <div class="loading"></div>
      <span class="loading__message">{{ loading?.message }} ...</span>
    </div>
  </ng-container> `,
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit {
  @Input() loading: Loadding;

  constructor() {}

  ngOnInit(): void {}
}
