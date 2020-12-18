import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TrainingService } from './exercise.model';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  ongoingTraining = false;
  exerciseSubscription: Subscription;
  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
      (ex) => {
        if (ex) {
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }
      }
    );
  }
}
