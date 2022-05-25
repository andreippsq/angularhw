import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IDog } from 'src/app/model/idog';
import { DogsService } from 'src/app/services/dogs.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy, OnChanges {
  @Input() isModalOpen = false;
  @Input() selectedDog: IDog = {
    id: 0,
    name: '',
    img: ''
  }

  @Output() toggleModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() fetchDogs: EventEmitter<string> = new EventEmitter<string>();
  @Output() resetSelectedDog: EventEmitter<string> = new EventEmitter<string>();

  dogForm = new FormGroup({});

  addDogSubscription = new Subscription();
  updateDogSubscription = new Subscription();

  constructor(private dogService: DogsService) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...

    if (changes['isModalOpen'] && changes['selectedDog']) {
      this.dogForm = new FormGroup({
        name: new FormControl(this.selectedDog.name),
        img: new FormControl(this.selectedDog.img),
      });
    }
    console.log(changes)
  }

  closeModal() {
    this.toggleModal.emit(false);
    this.resetSelectedDog.emit('');
  }

  saveDog() {
    const body = this.dogForm.getRawValue();
    this.addDogSubscription = this.dogService.addDog(body).subscribe((response) => {
      console.log(response);
      this.closeModal();
      this.fetchDogs.emit('');
      this.resetSelectedDog.emit('');
    });
  }

  updateDog() {
    const body = {...this.dogForm.getRawValue(), id: this.selectedDog.id};
    this.updateDogSubscription = this.dogService.updateDog(body).subscribe((response) => {
      console.log(response);
      this.closeModal();
      this.fetchDogs.emit('');
      this.resetSelectedDog.emit('');
    });
  }

  ngOnDestroy(): void {
    this.addDogSubscription.unsubscribe();
    this.updateDogSubscription.unsubscribe();
  }


}
