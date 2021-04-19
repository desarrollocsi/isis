import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthStorageService } from '../../../core/services/auth-storage.service';
import { IntermedaryService } from '../../../core/services/intermedary.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css'],
})
export class ModulesComponent implements OnInit {
  modules$: Observable<any>;

  constructor(
    private AS: AuthStorageService,
    private router: Router,
    private IS: IntermedaryService
  ) {}

  ngOnInit(): void {
    this.modules$ = this.AS.getModulos();
  }

  onHome(id: string) {
    this.IS.getMenus(id);
    this.AS.setModulos(id);
    this.router.navigate(['home']);
  }
}
