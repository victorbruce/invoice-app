import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, map, startWith } from 'rxjs';
import { MOBILE_BREAKPOINT } from '../core/contants/breakpoints';

MOBILE_BREAKPOINT;
@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private isMobileSubject = new BehaviorSubject<boolean>(
    window.innerWidth <= MOBILE_BREAKPOINT
  );
  isMobile$ = this.isMobileSubject.asObservable();

  constructor() {
    fromEvent(window, 'resize')
      .pipe(
        map(() => window.innerWidth <= MOBILE_BREAKPOINT),
        startWith(window.innerWidth <= MOBILE_BREAKPOINT)
      )
      .subscribe((isMobile) => this.isMobileSubject.next(isMobile));
  }
}
