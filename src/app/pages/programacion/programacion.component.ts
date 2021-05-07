import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.css'],
})
export class ProgramacionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log(moment().format('YYYY-MM-DD hh:mm:ss'));
    // console.log(moment().startOf('year'));
    // console.log(moment('2021-04-22 14:52:06').startOf('hour').fromNow());
    console.log(moment('2021-04-22 14:52:06').startOf('year').fromNow());
    console.log(moment('2021-04-22 14:52:06').startOf('days').fromNow());
    console.log(moment('2021-04-22 14:52:06').startOf('hour').fromNow());
  }
}
