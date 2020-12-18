export interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date;
  state?: 'completed' | 'cancelled' | null;
}

import { Subject } from 'rxjs/Subject';

export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  private runningExerceise: Exercise;
  private exercises: Exercise[] = [];
  private avaliableExercises: Exercise[] = [
    {
      id: 'crunches',
      name: 'Crunches',
      duration: 30,
      calories: 8,
    },
    {
      id: 'touch-toes',
      name: 'Touch Toes',
      duration: 180,
      calories: 15,
    },
    {
      id: 'side-lunges',
      name: 'Side Lunges',
      duration: 120,
      calories: 18,
    },
    {
      id: 'burpees',
      name: 'Burpees',
      duration: 60,
      calories: 8,
    },
  ];

  getExercises() {
    console.log('getExercise called. lenght: ' + this.exercises.length);

    return this.exercises.slice();
  }

  getAvaliableExercises() {
    return this.avaliableExercises.slice();
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
    this.exercises.push({
      ...this.runningExerceise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExerceise = null;
    this.exerciseChanged.next(null);
  }

  onCancelExercise(progress: number) {
    console.log('pushing cancelled exercise. lenght: ' + this.exercises.length);
    this.exercises.push({
      ...this.runningExerceise,
      duration: this.runningExerceise.duration * (progress / 100),
      calories: this.runningExerceise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    console.log('pushing cancelled exercise. lenght: ' + this.exercises.length);

    this.runningExerceise = null;
    this.exerciseChanged.next(null);
  }
}
