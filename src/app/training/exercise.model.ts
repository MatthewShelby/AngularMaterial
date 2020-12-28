export interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date;
  state?: 'completed' | 'cancelled' | null;
}

import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable, OnDestroy } from '@angular/core';
import {delay} from 'rxjs/operators'


@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesArrayChanged = new Subject<Exercise[]>();
  finishedExercisesArrayChanged = new Subject<Exercise[]>();
  private runningExerceise: Exercise;
  private avaliableExercises: Exercise[];
  private finishedExercises: Exercise[] = [];
  private firabaseSubscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService) {}

  ngOnInit() {
    this.uiService.loadingStateChanged.next(true);
    //delay(4000)
    this.firabaseSubscriptions.push(
      this.db
        .collection('avEx')
        .snapshotChanges()
        .pipe(
          map((docArray) => {
            return docArray.map((a) => {
              const data = a.payload.doc.data() as Exercise;
              const id = a.payload.doc.id;
              return { id, ...data };
            });
          })
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.avaliableExercises = exercises;
            this.exercisesArrayChanged.next([...this.avaliableExercises]);
            this.uiService.loadingStateChanged.next(false);
          },
          (error) => {
            console.log(error);
            this.uiService.loadingStateChanged.next(false);
          }
        )
    );
  }

  getExercises() {
    this.firabaseSubscriptions.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe(
          (exercises: Exercise[]) => {
            this.finishedExercisesArrayChanged.next(exercises);
          },
          (error) => {
            console.log(error);
          }
        )
    );
  }

  getAvaliableExercises() {
    return this.avaliableExercises.slice();
  }

  cancelSubscription() {
    console.log('sub lenght: ' + this.firabaseSubscriptions);
    this.firabaseSubscriptions.forEach((sub) => {
      console.log(sub);

      sub.unsubscribe();
      console.log(sub);
    });
    console.log('sub lenght: ' + this.firabaseSubscriptions);
  }

  startExercise(selectedId: string) {
    this.runningExerceise = this.avaliableExercises.find(
      (ex) => ex.id == selectedId
    );
    this.exerciseChanged.next({ ...this.runningExerceise });
  }

  getRunningExercise() {
    return { ...this.runningExerceise };
  }

  onCompleteExercise() {
    this.addDataToDatabase({
      ...this.runningExerceise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExerceise = null;
    this.exerciseChanged.next(null);
  }

  onCancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExerceise,
      duration: this.runningExerceise.duration * (progress / 100),
      calories: this.runningExerceise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExerceise = null;
    this.exerciseChanged.next(null);
  }

  private addDataToDatabase(exercise: Exercise) {
    const guid: string = Guid.create().toString();
    exercise.id = guid;
    exercise.duration = Math.round(exercise.duration);
    this.db.collection('finishedExercises').add(exercise);
  }
}
import { Guid } from 'guid-typescript';
import { error } from '@angular/compiler/src/util';
import { Subscription } from 'rxjs';
import { UIService } from '../Shared/UI.Service';
