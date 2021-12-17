import { AfterViewInit, Component, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TestPlugComponent } from '../test-plug/test-plug.component';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent implements OnInit, AfterViewInit {

  @ViewChild("containerPreview", {read: ViewContainerRef}) containerPreview!: ViewContainerRef;
  @ViewChild("containerQuestion", {read: ViewContainerRef}) containerQuestion!: ViewContainerRef;
  @ViewChild("containerAnswer", {read: ViewContainerRef}) containerAnswer!: ViewContainerRef;

  @HostListener('click')
  onClick() {
    this._clearAnswers();
    this._createPreview();
    this._moveQuestionToAnswer();
    this._movePreviewToQuestion();
  }

  constructor() { }
  ngAfterViewInit(): void {
    this._createPreview();
  }

  ngOnInit(): void {
    
  }

  private _createPreview(): void{
    const viewRef = this.containerPreview.createComponent<TestPlugComponent>(TestPlugComponent);
    viewRef.changeDetectorRef.detectChanges();
  }

  private _movePreviewToQuestion(): void {
    const viewRef = this.containerPreview.get(0);
    viewRef?.detach();
    this.containerQuestion.insert(viewRef!, 0);
  }

  private _moveQuestionToAnswer(): void {
    const viewRef = this.containerQuestion.get(0);
    viewRef?.detach();
    if (viewRef){
      this.containerAnswer.insert(viewRef, 0);
    }
  }

  private _clearAnswers(): void{
    const viewRef = this.containerAnswer.get(0);
    viewRef?.destroy();
  }
}

/*transform: translate(0, -450px) scale(1.5);
    transition: transform 2s;*/