import { Injectable } from "@angular/core";
import { Observable ,  BehaviorSubject } from 'rxjs';

@Injectable()
export class AppService {
  private title = new BehaviorSubject<string>('Home');
  private title$ = this.title.asObservable();
  menuItems$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor() {}

  setTitle(title: string) {
    this.title.next(title);
  }

  getTitle(): Observable<string> {
    return this.title$;
  }

  setMenuItems(menuItems: any[]) {
    this.menuItems$.next(menuItems);
    console.log("Obs", this.menuItems$)
    console.log("Param", menuItems)
 }

  getMenuItems(): Observable<Object> {
    return this.menuItems$;
  }
}