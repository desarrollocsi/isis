import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cie-search',
  templateUrl: './cie-search.component.html',
  styleUrls: ['./cie-search.component.css'],
})
export class CieSearchComponent implements OnInit {
  @Input() data: any;
  @Output() selectCie = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onSelectCie({ codigo, descripcion }) {
    this.selectCie.emit(`${codigo} - ${descripcion}`);
  }
}
