import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-plug',
  templateUrl: './test-plug.component.html',
  styleUrls: ['./test-plug.component.scss']
})
export class TestPlugComponent implements OnInit, AfterViewInit {

  id!: string;
  constructor(private _cd: ChangeDetectorRef) { 
  }

  @HostListener('transitionend')
  onTransitionEnd() {
    console.log('transitionend');
  }

  ngAfterViewInit(): void {
    this.id = makeid(10);
    this._cd.detectChanges();
  }

  ngOnInit(): void {
  }

}

function makeid(length: number) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}