import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppService {
  private title = new BehaviorSubject<string>('Home');
  private title$ = this.title.asObservable();
  private menuData = new BehaviorSubject<Array<Object>>([{}]);
  private menuData$ = this.menuData.asObservable();

  constructor() {}

  setTitle(title: string) {
    this.title.next(title);
  }

  getTitle(): Observable<string> {
    return this.title$;
  }

  setMenuData(menuData: [{}]) {
    this.menuData.next(menuData);
  }

  getMenuData(): Observable<Array<Object>> {
    return this.menuData$;
  }
}