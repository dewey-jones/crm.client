import { Injectable } from "@angular/core";
import { Observable ,  BehaviorSubject } from 'rxjs';

@Injectable()
export class AppService {
  private title = new BehaviorSubject<string>('Home');
  private title$ = this.title.asObservable();
  private menuData = new BehaviorSubject<Object>({});
  private menuData$ = this.menuData.asObservable();

  constructor() {}

  setTitle(title: string) {
    this.title.next(title);
  }

  getTitle(): Observable<string> {
    return this.title$;
  }

  setMenuData(menuData: {}) {
    this.menuData.next(menuData);
  }

  getMenuData(): Observable<Object> {
    return this.menuData$;
  }
}