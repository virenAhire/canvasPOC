import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvas') myCanvas!: ElementRef;
  @ViewChild('image') myImg!: ElementRef;
  @ViewChild('video') myVideo!: ElementRef;

  ngAfterViewInit(): void {
    this.#processVideo();
  }

  #processVideo() {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true,
      })
      .then((stream) => {
        const video: HTMLVideoElement = this.myVideo.nativeElement;
        video.srcObject = stream;
        const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
        const context = canvas.getContext('2d');
        requestAnimationFrame(() => this.#animate(context!, video));
      });
  }
  showBanner() {
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    const context = canvas.getContext('2d');
    const img: HTMLImageElement = this.myImg.nativeElement;
    requestAnimationFrame(() => this.#animateImage(context!, img));
  }

  #animate(context: CanvasRenderingContext2D, video: HTMLVideoElement) {
    context.drawImage(video, 0, 0, 300, 150);
    requestAnimationFrame(() => this.#animate(context!, video));
  }
  #animateImage(context: CanvasRenderingContext2D, img: HTMLImageElement) {
    context.drawImage(img, 0, 60, 300, 150);
    requestAnimationFrame(() => this.#animateImage(context!, img));
  }
}
