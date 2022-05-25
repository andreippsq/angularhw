import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IDog } from 'src/app/model/idog';
import { DogsService } from 'src/app/services/dogs.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  dogList: IDog[] = [];
  filteredDogList:IDog[] = [];
  numberOfDogDisplayed = 3
  startIndex = 0;
  endIndex = 0 + this.numberOfDogDisplayed - 1;
  isLoading = false;
  dogsSubscription = new Subscription();
  isModalOpen = false;
  selectedDog: IDog = {
    id: 0,
    name: '',
    img: ''
  }

  constructor(private dogService: DogsService) { }

  ngOnInit(): void {
    this.fetchDogs();
  }

  fetchDogs() {
    this.isLoading = false;
    this.dogsSubscription = this.dogService.getDogs().subscribe((response) => {
      this.dogList = response;
      this.filteredDogList = response.filter((d, i) =>  i >= this.startIndex && i <= this.endIndex )
      this.isLoading = false;
    });
  }

  prevDogs() {
    this.startIndex = this.startIndex - this.numberOfDogDisplayed;
    this.endIndex = this.endIndex - this.numberOfDogDisplayed;
    this.filteredDogList = this.dogList.filter((d, i) =>  i >= this.startIndex && i <= this.endIndex )

  }

  nextDogs() {
    this.startIndex = this.startIndex + this.numberOfDogDisplayed;
    this.endIndex = this.endIndex + this.numberOfDogDisplayed;
    this.filteredDogList = this.dogList.filter((d, i) =>  i >= this.startIndex && i <= this.endIndex )
  }


  resetSelectedDog() {
    this.selectedDog = {
      id: 0,
      name: '',
      img: ''
    }
  }

  ngOnDestroy(): void {
    this.dogsSubscription.unsubscribe();
  }

  toggleModal(modalState: boolean) {
    this.isModalOpen = modalState;
  }

  selectDog(selectedDog: IDog) {
    this.selectedDog = selectedDog;
    this.toggleModal(true);
  }

}
