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

  monthSelect: any[];
  dateSelect: any;
  dateValue: any;
  MesAnio: string;
  day: any;

  constructor(private IS: IntermedaryService) {}

  ngOnInit(): void {
    moment.locale('es');
    const mes = moment().format('MM');
    const anio = moment().format('YYYY');
    this.getDaysFromDate(mes, anio);
  }

  getDaysFromDate(month: string, year: string) {
    const startDate = moment.utc(`${year}-${month}-01`);
    const endDate = startDate.clone().endOf('month');
    this.MesAnio = moment(startDate).format('MMMM,YYYY');
    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true);
    const numberDays = Math.round(diffDays);

    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format('dddd'),
        value: a,
        indexWeek: dayObject.isoWeekday(),
      };
    });
    this.day = moment().format('D');
    this.monthSelect = arrayDays;
  }

  changeMonth(flag: number) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, 'month');
      this.getDaysFromDate(prevDate.format('MM'), prevDate.format('YYYY'));
    } else {
      const nextDate = this.dateSelect.clone().add(1, 'month');
      this.getDaysFromDate(nextDate.format('MM'), nextDate.format('YYYY'));
    }
  }

  clickDay(day: any) {
    const monthYear = this.dateSelect.format('YYYY-MM');
    const parse = `${monthYear}-${day.value}`;
    const objectDate = moment(parse);
    this.dateValue = moment(objectDate).format('YYYY-MM-DD');
    this.IS.getFecha(this.dateValue);
  }
}
