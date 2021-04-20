import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agendamedica',
  templateUrl: './agendamedica.component.html',
  styleUrls: ['./agendamedica.component.css'],
})
export class AgendamedicaComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  agendaSecretaria() {
    this.router.navigate(['home/agendasecretaria']);
  }
}
