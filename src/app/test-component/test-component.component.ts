import { AfterViewInit, Component, ComponentRef, HostListener, ViewChild, ViewContainerRef } from '@angular/core';
import { TestPlugComponent } from '../test-plug/test-plug.component';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent implements AfterViewInit {
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

  private get lastAnswerElement(): HTMLElement {
    return this.getElementFromContainer(this.containerAnswer, 0);
  }

  private get answerElement(): HTMLElement {
    return this.getElementFromContainer(this.containerAnswer, this.containerAnswer.length - 1);
  }

  private get _marginAnswer() : number{
    return window.innerHeight / 100 * 5;
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
    const scaleDiff = (this.SCALE - 1) / 2 + 1;
    const yPoint = rect.height - this.BLOCK_HEIGHT * scaleDiff - this._marginAnswer;
    return yPoint;
  }

  private _isLoading = false;
  @HostListener('click')
  onClick() {
    if (!this._isLoading){
      this._isLoading = true;
      this._startAnimation();
    }
  }

  private _startAnimation(): void {
    this._animatePreview();
    this._animateQuestion();
    this._animateAnswer();
    this._animateFadeOutAnswer();
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

  private _animateFadeOutAnswer(){
    if (this.containerAnswer.length > 1 && this.lastAnswerElement){
      const rect = this.lastAnswerElement!.getBoundingClientRect();
      this.lastAnswerElement.style.transform = `translate(0, -${rect.height + rect.top + this._marginAnswer}px)`;
    }
  }

  private _animateAnswer(){
    if (this.answerElement){
      this.answerElement.style.transform = `translate(0, -${this.BLOCK_HEIGHT + this._marginAnswer}px)`;
    }
  }

  private _animateNextPreview(){
    const container = (this.containerPreview.element.nativeElement as HTMLElement).parentElement;
    const rect = container!.getBoundingClientRect();
    this.nextPreviewElement.style.transform = `translate(0, -${rect.height / 2 + this.BLOCK_HEIGHT / 2}px)`; 
  }

  constructor() { }

  ngAfterViewInit(): void {
    this._createInitialElements();
  }

  private _createTestComponentInContainer(container: ViewContainerRef): ComponentRef<TestPlugComponent>{
    const viewRef = container.createComponent<TestPlugComponent>(TestPlugComponent);
    viewRef.hostView.detectChanges();
    return viewRef;
  }

  private _createInitialElements(): void {
    this._createPreview();
    this._createTestComponentInContainer(this.containerPreview);
    const questionViewRef = this._createTestComponentInContainer(this.containerQuestion);
    questionViewRef.location.nativeElement.style.transform = `scale(${this.SCALE})`;
  }

  private _createPreview(): void{
    const previewViewRef = this._createTestComponentInContainer(this.containerNextPreview);
    previewViewRef.instance.transitionEnd.subscribe(null, null, () => this._onTransitionEnd());
  }

  private _safeSetTransform(element: HTMLElement, value: string | null): void {
    if (element){
      if (value){
        element.style.transform = value;
      } else {
        const tempTransition = element.style.transition;
        element.style.transition = '0s';
        element.style.removeProperty('transform');
        setTimeout(() => {
          element.style.transition = tempTransition;
        });
      }
    }
  }

  private _onTransitionEnd(): void {
    this._safeSetTransform(this.nextPreviewElement, null);
    this._safeSetTransform(this.questionElement, null);
    this._safeSetTransform(this.answerElement, null);
    this._safeSetTransform(this.previewElement, `scale(${this.SCALE})`);

    this._clearAnswers();
    this._createPreview();
    this._moveQuestionToAnswer();
    this._movePreviewToQuestion();
    this._moveNextPreviewToPreview();
    this._isLoading = false;
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
      this.containerAnswer.insert(viewRef, this.containerAnswer.length);
    }
  }

  private _clearAnswers(): void{
    if (this.containerAnswer.length > 1){
      const viewRef = this.containerAnswer.get(0);
      viewRef?.destroy();
    }
  }
}