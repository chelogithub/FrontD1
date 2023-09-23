import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisualStyleService {
  dMode: boolean;

  constructor() { }

    checkDarkMode(){
      if(window.matchMedia('(prefers-color-scheme: dark)').matches)
      {
        console.log("dark mode ON");
        this.dMode=true;
      }else{
        console.log("dark mode OFF");
        this.dMode=false;
      }
    return (this.dMode);
    }

 }

