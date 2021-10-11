import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { ProgramaciondesalasService } from '../services';

@Component({
  selector: 'app-cie-search',
  templateUrl: './cie-search.component.html',
  styleUrls: ['./cie-search.component.css'],
})
export class CieSearchComponent implements OnInit, OnChanges {
  @Input('data') searchCies: any;
  @Output() selectCie = new EventEmitter<string>();
  countRow: number;
  isCLose: boolean = true;

  get isScroll() {
    return this.countRow > 10;
  }

  constructor(private ProgramaciondesalasService: ProgramaciondesalasService) {}

  ngOnInit(): void {}

  close() {
    this.ProgramaciondesalasService.closeSearch.next(true);
    this.isCLose = false;
  }

  onSelectCie({ codigo, descripcion }) {
    this.selectCie.emit(`${codigo} - ${descripcion}`);
    this.close();
  }

  ngOnChanges() {
    this.countRow = this.searchCies && this.searchCies.length;
  }
}
