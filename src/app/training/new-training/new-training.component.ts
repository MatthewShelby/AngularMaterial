import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../exercise.model';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/Shared/UI.Service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubscription: Subscription;
  isLoading = true;
  private loadingSubscription: Subscription;

  constructor(private trainingService: TrainingService, private uiService: UIService) {}


  onSubmit(form: NgForm) {
    //console.log('form exe: ' + form.value.pickedExercise);
    this.trainingService.startExercise(form.value.pickedExercise);
  }

  ngOnInit(): void {
    this.trainingService.ngOnInit();
    this.exerciseSubscription = this.trainingService.exercisesArrayChanged.subscribe(
      (ex) => {
        this.exercises = ex;
      }
    );
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      (state) => {
        this.isLoading = state;
      }
    );
    //this.trainingService.getAvaliableExercises();
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();

  }
}
