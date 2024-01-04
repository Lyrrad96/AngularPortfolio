import { Component } from '@angular/core';

@Component({
  selector: 'app-hscroll',
  templateUrl: './hscroll.component.html',
  styleUrls: ['./hscroll.component.css']
})
export class HscrollComponent {
  arr = Array.from({length: 100}, (a: any, i: any)=>i+1, 100)
  ngOnInit(){
    this.arr
    console.log(this.arr)
  }
}
