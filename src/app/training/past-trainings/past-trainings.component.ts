import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise, TrainingService } from '../exercise.model';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css'],
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator  ;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  ngOnInit(): void {
    console.log('p-t onInint called.');
    const toAdd: Exercise[] = [
      {
        id: 'aaa',
        name: 'AAA',
        duration: 20,
        calories: 30,
        date: new Date(),
        state: 'cancelled',
      },
      {
        id: 'sec',
        name: 'SEC',
        duration: 11,
        calories: 90,
        date: new Date(),
        state: 'cancelled',
      },
      {
        id: 'sss',
        name: 'SSS',
        duration: 50,
        calories: 30,
        date: new Date(),
        state: 'completed',
      },
      {
        id: 'sec2',
        name: 'SEC2',
        duration: 171,
        calories: 770,
        date: new Date(),
        state: 'cancelled',
      },
      {
        id: 'sec',
        name: 'SEC',
        duration: 11,
        calories: 90,
        date: new Date(),
        state: 'cancelled',
      },
      {
        id: 'sss',
        name: 'SSS',
        duration: 50,
        calories: 30,
        date: new Date(),
        state: 'completed',
      },
      {
        id: 'sec2',
        name: 'SEC2',
        duration: 171,
        calories: 770,
        date: new Date(),
        state: 'cancelled',
      },
      {
        id: 'lola',
        name: 'LOLA',
        duration: 40,
        calories: 12,
        date: new Date(),
        state: 'completed',
      },
    ];

    const toAdd2: Exercise = {
      id: 'aaaaa',
      name: 'AaaAA',
      duration: 20,
      calories: 30,
      date: new Date(),
      state: 'completed',
    };

    console.log('lenght: ' + this.dataSource.data.length);

    this.dataSource.data = this.trainingService.getExercises();
    this.dataSource.data = this.dataSource.data.concat(toAdd);
    this.dataSource.data.push(toAdd2);

    console.log('lenght: ' + this.dataSource.data.length);
  }
}
