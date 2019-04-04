import { Service } from 'typedi';
import * as cv from 'opencv4nodejs';
import { drawBlueRect, grabFrames } from './utils';
import { Observable, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Service()
export class OpenCvService {
  webcamPort: number = 0;
  faceRecognized: boolean = false;
  $rawFacesDetected: BehaviorSubject<boolean> = new BehaviorSubject(false);
  $facesDetected: Observable<boolean> = this.$rawFacesDetected.pipe(
    debounceTime(1000),
    distinctUntilChanged()
  );
  
  constructor() {
    this.detectFacesAndEyes();
  }

  detectFaces(img: cv.Mat): cv.Rect[] {
    const frontalFaceClassifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT);
    const faceResult = frontalFaceClassifier.detectMultiScale(img, 1.2, 2, 0, new cv.Size(50, 50));

    // get best result
    const faceRects = faceResult.objects;
    return faceRects;
  }

  detectUpperBodies(img: cv.Mat): cv.Rect[] {
    const upperBodyClassifier = new cv.CascadeClassifier(cv.HAAR_UPPERBODY);
    const upperBodyResult = upperBodyClassifier.detectMultiScale(img, 1.2, 3, 0, new cv.Size(50, 50));

    const bodyRects = upperBodyResult.objects;
    return bodyRects;
  }

  // detectEyes(faceRegion: cv.Mat): cv.Rect[] {
  //   const eyeClassifier = new cv.CascadeClassifier(cv.HAAR_EYE_TREE_EYEGLASSES);
  //   const eyeResult = eyeClassifier.detectMultiScale(faceRegion);

  //   // get best result
  //   const eyeRects = this.sortByNumDetections(eyeResult)
  //     .slice(0, 2)
  //     .map(idx => eyeResult.objects[idx]);

  //   return eyeRects;
  // }

  detectFacesAndEyes() {
    return grabFrames(0, 1, (frame) => {
      // console.time('detection time');
      const frameResized = frame.resizeToMax(800);
  
      // detect faces
      const faceRects = this.detectFaces(frameResized);
      if (faceRects.length > 0) {
        if (!this.faceRecognized) {
          this.$rawFacesDetected.next(true);
        }
        faceRects.forEach(faceRect => drawBlueRect(frameResized, faceRect));
        // const faceRegion = frameResized.getRegion(faceRect);
        
        // Detect eyes
        // const eyeRects = this.detectEyes(faceRegion);
        // console.log(eyeRects.length);
        // if (eyeRects.length > 0) {
        //   eyeRects.forEach(eyeRect => drawGreenRect(faceRegion, eyeRect));
        // }
        this.faceRecognized = true;
      } else {
        if (this.faceRecognized) {
          this.$rawFacesDetected.next(false);
        }
        this.faceRecognized = false;
      }

      // const bodyRects = this.detectUpperBodies(frameResized);
      // bodyRects.forEach(bodyRect => drawGreenRect(frameResized, bodyRect));
  
      cv.imshow('face detection', frameResized);
      // console.timeEnd('detection time');
    });
  }

  sortByNumDetections(result: { numDetections: number[] }): number[] {
    return result.numDetections
    .map((num, idx) => ({ num, idx }))
    .sort(((n0, n1) => n1.num - n0.num))
    .map(({ idx }) => idx);
  }
}