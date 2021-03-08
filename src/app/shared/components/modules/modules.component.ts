import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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
    this.modules$ = this.AS.getMenu(0);
  }

  onHome(data: any) {
    this.router.navigate(['home']);
    this.IS.getMenus(data.id);
  }
}
