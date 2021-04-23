import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor() {}

  subject = new Subject<any>();
  toaster = this.subject.asObservable();

  show(type: any, title?: string, body?: string, delay?: number) {
    console.log('test');
    this.subject.next({ type, title, body, delay });
  }
}
