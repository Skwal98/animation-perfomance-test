import { AfterViewInit, Component, ElementRef, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { animate, AnimationBuilder, style } from '@angular/animations';

@Component({
  selector: 'app-perfomance-animation',
  templateUrl: './perfomance-animation.component.html',
  styleUrls: ['./perfomance-animation.component.scss']
})
export class PerfomanceAnimationComponent implements AfterViewInit {
  @ViewChild("aaa") aaa!: TemplateRef<any>; 
  @ViewChild("container", {read: ViewContainerRef}) container!: ViewContainerRef;
  @ViewChildren("text") text!: ElementRef[]; 
  @ViewChild("count") countInput!: ElementRef<HTMLInputElement>;
  
  constructor(private _builder: AnimationBuilder) {}

  ngAfterViewInit(): void {
    this.generateBlock();    
  }

  makeWidthAnimation() {
    const myAnimation = this._builder.build([
      style({ width: 0 }),
      animate(1000, style({ width: '500px' }))
    ]);

    this.text.forEach(x=> {
      const player = myAnimation.create(x.nativeElement);
      player.play();
    })
  }

  makeTransitionAnimation(){
    this.text.forEach(x=> {
      const xPoint = getRandomInt(0, document.body.clientWidth);
      const yPoint = getRandomInt(0, document.body.clientHeight);

      const myAnimation = this._builder.build([
        style({ transform: 'translate(0, 0)' }),
        animate(1000, style({ transform: `translate(${xPoint}px, ${yPoint}px)` }))
      ]);

      const player = myAnimation.create(x.nativeElement);
      player.play();
    })
  }

  generateBlock() {
    this.container.clear();
    const count = this.countInput.nativeElement.value as unknown as number;

    for(let i =0 ; i< count; i++) {
      var view = this.container.createEmbeddedView(this.aaa);
    }
  }
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}
