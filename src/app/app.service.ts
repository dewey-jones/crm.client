import { Injectable } from "@angular/core";
import { Observable ,  BehaviorSubject } from 'rxjs';

@Injectable()
export class AppService {
  private title = new BehaviorSubject<string>('Home');
  private title$ = this.title.asObservable();
  //public menuItems$: any[] = [];
  public menuItems$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor() {}

  setTitle(title: string) {
    this.title.next(title);
  }

  getTitle(): Observable<string> {
    return this.title$;
  }

  setMenuItems(menuItems: any[]) {
    this.menuItems$.next(menuItems);
 }

  getMenuItems(): any[] {
    return this.menuItems$;
  }
}