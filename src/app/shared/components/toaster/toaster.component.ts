import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css'],
})
export class ToasterComponent implements OnInit {
  toaster$: Observable<any>;
  toaster: any = [];

  constructor(private TS: ToasterService) {}

  ngOnInit(): void {
    this.toaster$ = this.TS.toaster.pipe(
      map((toast: any) => (this.toaster = [toast, ...this.toaster])),
      tap((_) =>
        setTimeout(() => this.toaster.pop(), this.toaster.delay || 3000)
      )
    );
  }

  remove(index: number) {
    console.log(index);
    this.toaster = this.toaster.filter((v, i) => i !== index);
  }
}
