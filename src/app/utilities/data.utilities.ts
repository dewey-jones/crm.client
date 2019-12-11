import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class DataUtilities {

  constructor() {}
  
  assignMatching(obj1, obj2): object {
    //https://stackoverflow.com/a/40573612/426806
    return Object.keys(obj1).reduce((a, key) => ({ ...a, [key]: obj2[key] }), {});
  }

}