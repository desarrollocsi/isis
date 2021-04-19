import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor() {}

  subject = new BehaviorSubject<any>(null);
  toaster = this.subject.asObservable().pipe(filter((data) => data !== null));

  show(type: any, title?: string, body?: string, delay?: number) {
    this.subject.next({ type, title, body, delay });
  }
}
