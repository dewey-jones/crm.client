import { Injectable } from "@angular/core";
import { Observable ,  BehaviorSubject } from 'rxjs';

@Injectable()
export class AppService {
  private title = new BehaviorSubject<string>('Home');
  private title$ = this.title.asObservable();
  private menuItems = new BehaviorSubject<any[]>([]);
  private menuItems$ = this.menuItems.asObservable();

  constructor() {}

  setTitle(title: string) {
    this.title.next(title);
  }

  getTitle(): Observable<string> {
    return this.title$;
  }

  setMenuItems(menuItems: any[]) {
    this.menuItems.next(menuItems);
 }

  getMenuItems(): Observable<any[]> {
    return this.menuItems$;
  }
}