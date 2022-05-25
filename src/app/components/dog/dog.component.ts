import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IDog } from 'src/app/model/idog';
import { DogsService } from 'src/app/services/dogs.service';

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css']
})
export class DogComponent implements OnInit, OnDestroy {
  @Input() dog: IDog = {
    name: '',
    img: '',
    id: 0
  }; 

  @Output() selectDog: EventEmitter<IDog> = new EventEmitter<IDog>();
  @Output() fetchDogs: EventEmitter<string> = new EventEmitter<string>();

  deleteDogSubscription = new Subscription();

  constructor(private dogService: DogsService) { }

  ngOnInit(): void {
  }

  editDog() {
    this.selectDog.emit(this.dog);
  }

  deleteDog() {
    const id = this.dog.id || 0;
    this.deleteDogSubscription = this.dogService.deleteDog(id).subscribe((response) => {
      this.fetchDogs.emit('');
    });
  }

  ngOnDestroy(): void {
    this.deleteDogSubscription.unsubscribe();
  }

}
