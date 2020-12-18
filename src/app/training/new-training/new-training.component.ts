import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TrainingService } from '../exercise.model';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  // @Output() startTraining = new EventEmitter<void>();

  exercises: Exercise[] = [];

  // onStartTraining() {
  //   this.startTraining.emit();

  // }

  constructor(private trainingService: TrainingService) {}

  onSubmit(form: NgForm) {
    console.log('form exe: ' + form.value.pickedExercise);
    this.trainingService.startExercise(form.value.pickedExercise);
  }

  ngOnInit(): void {
    this.exercises = this.trainingService.getAvaliableExercises();
  }
}
