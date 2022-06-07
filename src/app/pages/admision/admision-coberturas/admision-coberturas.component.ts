import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admision-coberturas',
  templateUrl: './admision-coberturas.component.html',
  styleUrls: ['./admision-coberturas.component.css'],
})
export class AdmisionCoberturasComponent implements OnInit {
  @Input() coberturas: any;

  constructor() {}

  ngOnInit(): void {}
}
