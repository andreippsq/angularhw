import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { IDog } from 'src/app/model/idog';
import { DogsService } from 'src/app/services/dogs.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit, OnDestroy {
  dogId!: string;
  routeSubscription =  new Subscription();
  dogSubscription =  new Subscription();
  isLoading = false;
  dog: IDog = {
    id: 0,
    name: '',
    img : ''
  }

  constructor(
    private actRoute: ActivatedRoute,
    private dogService: DogsService
    ) {}
  ngOnInit() {
    this.routeSubscription = this.actRoute.paramMap.subscribe((params) => {
      this.dogId = params.get('id')!;
      this.isLoading = true;
      this.dogSubscription = this.dogService.getDog(this.dogId).subscribe((response) => {
        this.dog = response;
        this.isLoading = false;
      })
    });
  }


  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

}
