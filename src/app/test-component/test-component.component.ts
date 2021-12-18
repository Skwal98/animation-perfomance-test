import { AfterViewInit, Component, ComponentRef, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TestPlugComponent } from '../test-plug/test-plug.component';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent implements OnInit, AfterViewInit {
  BLOCK_HEIGHT = 110;
  SCALE = 1.5;

  @ViewChild("containerPreview", {read: ViewContainerRef}) containerPreview!: ViewContainerRef;
  @ViewChild("containerQuestion", {read: ViewContainerRef}) containerQuestion!: ViewContainerRef;
  @ViewChild("containerAnswer", {read: ViewContainerRef}) containerAnswer!: ViewContainerRef;
  @ViewChild("containerNextPreview", {read: ViewContainerRef}) containerNextPreview!: ViewContainerRef;
  

  private getElementFromContainer(container: ViewContainerRef, index: number): HTMLElement {
    const containerElement = container.element.nativeElement as HTMLElement;
    const parent = containerElement.parentElement;
    return parent?.children.item(index)! as HTMLElement;
  }

  private get nextPreviewElement(): HTMLElement {
    return this.getElementFromContainer(this.containerNextPreview, 0);
  }

  private get previewElement(): HTMLElement {
    return this.getElementFromContainer(this.containerPreview, 0);
  }

  private get questionElement(): HTMLElement {
    return this.getElementFromContainer(this.containerQuestion, 0);
  }

  private get answerElement(): HTMLElement {
    return this.getElementFromContainer(this.containerAnswer, 0);
  }

  private get _questionYPosition(): number {
    const container = (this.containerQuestion.element.nativeElement as HTMLElement).parentElement;
    const rect = container!.getBoundingClientRect();
    const yPoint = rect.top + rect.height / 2 - this.BLOCK_HEIGHT / 2;
    return yPoint;
  }

  private get _answerYPosition(): number {
    const container = (this.containerAnswer.element.nativeElement as HTMLElement).parentElement;
    const rect = container!.getBoundingClientRect();
    const yPoint = rect.top + rect.height / 2 - this.BLOCK_HEIGHT * 1.5 / 2;
    return yPoint;
  }

  @HostListener('click')
  onClick() {
    this._animatePreview();
    this._animateQuestion();
    this._animateAnswer();
    this._animateNextPreview();
  }

  private _animatePreview(){
    if (this.previewElement){
      const currentY = this.previewElement.getBoundingClientRect().top;
      const diffY = this._questionYPosition - currentY;
      this.previewElement.style.transform = `scale(${this.SCALE}) translate(0, ${diffY / this.SCALE}px)`;
    }
  }
  
  private _animateQuestion(){
    if (this.questionElement){
      const currentY = this.questionElement.getBoundingClientRect().top;
      const diffY = this._answerYPosition - currentY;
      this.questionElement.style.transform = `scale(1) translate(0, ${diffY}px)`;
    }
  }

  private _animateAnswer(){
    if (this.answerElement){
      const container = (this.containerAnswer.element.nativeElement as HTMLElement).parentElement;
      const rect = container!.getBoundingClientRect();
      this.answerElement.style.transform = `translate(0, -${rect.height}px)`;
    }
  }

  private _animateNextPreview(){
    const container = (this.containerPreview.element.nativeElement as HTMLElement).parentElement;
    const rect = container!.getBoundingClientRect();
    this.nextPreviewElement.style.transform = `translate(0, -${rect.height / 2 + this.BLOCK_HEIGHT / 2}px)`; 
  }

  constructor() { }
  ngAfterViewInit(): void {
    this._createPreview();
    setTimeout(() => {
      this._animateNextPreview();
    });
  }

  ngOnInit(): void {
    
  }

  private _createPreview(): void{
    const previewViewRef = this.containerNextPreview.createComponent<TestPlugComponent>(TestPlugComponent);
    previewViewRef.hostView.detectChanges();
    previewViewRef.instance.transitionEnd.subscribe(null, null, () => {
      this.nextPreviewElement.style.removeProperty('transform');
      if (this.previewElement){
        this.previewElement.style.transform = `scale(${this.SCALE})`;
      }
      if (this.questionElement)
      {
       this.questionElement.style.removeProperty('transform');
      }

      this._clearAnswers();
      this._createPreview();
      this._moveQuestionToAnswer();
      this._movePreviewToQuestion();
      this._moveNextPreviewToPreview();
    });

  }

  private _moveNextPreviewToPreview(): void {
    const viewRef = this.containerNextPreview.get(0);
    viewRef?.detach();
    if (viewRef){
      this.containerPreview.insert(viewRef!, 0);
    }
  }

  private _movePreviewToQuestion(): void {
    const viewRef = this.containerPreview.get(0);
    viewRef?.detach();
    if (viewRef){
      this.containerQuestion.insert(viewRef!, 0);
    }
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