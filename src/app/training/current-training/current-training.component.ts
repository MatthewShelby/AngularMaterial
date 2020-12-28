import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Exercise, TrainingService } from '../exercise.model';

import { StopDialogComponent } from './stop-dialog/stop-dialog.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter();
  currentExercise: Exercise;
  finished: boolean;
  DIS = true;
  STOP = 'STOP';
  COLOR = 'accent';

  progress = 0;
  timeLeft;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) {}

  onExit() {
    //console.log('onExit been Called!!');
    const dialogRef = this.dialog.open(StopDialogComponent, {
      data: {
        progress: this.progress,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.onCancelExercise(this.progress);
      } else {
      }
    });
  }

  onStop() {
    if (this.STOP == 'STOP') {
      this.STOP = 'RESUME';
      this.COLOR = 'primary';
      this.DIS = false;
      //console.log('Stop time:' + new Date().getSeconds());
    } else {
      this.STOP = 'STOP';
      this.COLOR = 'accent';
      this.DIS = true;
      //console.log('Resume time:' + new Date().getSeconds());
    }
  }

  ngOnInit(): void {
    this.finished = false;
    this.DIS = true;
    this.currentExercise = this.trainingService.getRunningExercise();
    //console.log('this.currentExercise.dur :');
    //console.log(this.currentExercise.duration);
    const duration = this.trainingService.getRunningExercise().duration;
    this.timeLeft = duration;

    setInterval(() => {
      if (this.progress < 100 && this.STOP == 'STOP') {
        this.progress += 1;
      } else if (this.progress >= 100 && !this.finished) {
        this.trainingService.onCompleteExercise();
        this.finished = true;
      }
    }, Math.round(duration * 10));

    setInterval(() => {
      if (this.timeLeft > 0 && this.STOP == 'STOP') {
        this.timeLeft -= 1;
      }
    }, 1000);
  }
}
