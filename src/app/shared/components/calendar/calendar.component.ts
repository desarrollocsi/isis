import { Component, OnInit } from '@angular/core';

import { IntermedaryService } from '../../../core/services/intermedary.service';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  week: any = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
    'Domingo',
  ];

  monthSelect: object[];
  data: object[] = [];
  dateSelect: any;
  yearMonth: string;
  modoAleatorio: boolean = false;
  modoRango: boolean = false;

  constructor(private IS: IntermedaryService) {}

  ngOnInit(): void {
    moment.locale('es');
    this.getDays();
    this.onDay(moment().format('YYYY-MM-DD'));
  }

  getDays(
    year: number = moment().year(),
    month: number = moment().month() + 1
  ) {
    this.dateSelect = moment(`${year}-${month}-01`, 'YYYY-MM-DD');
    const endDay = moment
      .utc(`${year}-${month}-01`, 'YYYY-MM-DD')
      .endOf('month')
      .format('DD');

    const arrayDays = Object.keys([...Array(parseInt(endDay))]).map(
      (day: any) => {
        day = +day + 1;
        const dayObject = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
        const date = dayObject.format('YYYY-MM-DD');
        const today = moment().format('YYYY-MM-DD');
        const status = date === today ? true : false;
        return {
          date,
          day: day,
          Week: dayObject.isoWeekday(),
          status,
        };
      }
    );
    this.yearMonth = moment(`${year},${month}`, 'YYYY-MM').format('MMMM,YYYY');
    this.monthSelect = arrayDays;
  }

  changeMonth(flag: number) {
    const fecha =
      flag < 0
        ? this.dateSelect.subtract(1, 'month')
        : this.dateSelect.add(1, 'month');
    this.getDays(fecha.format('YYYY'), fecha.format('MM'));
  }

  onToday() {
    this.modoAleatorio = false;
    this.modoRango = false;
    this.getDays();
  }

  onDay(fecha: any, evento?: MouseEvent) {
    this.IS.getFecha(fecha);
    if (evento) {
      const { ctrlKey } = evento;
      this.modoAleatorio = ctrlKey;
      if (this.modoAleatorio) this.onAleatorio(fecha);
    }
  }

  onAleatorio(fecha: string) {
    this.data.push({ fecha });
    const object = Object.assign([], this.data);
  }
}
