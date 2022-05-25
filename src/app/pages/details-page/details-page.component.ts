import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { IArticle } from 'src/app/model/iarticle';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit, OnDestroy {
  articleId!: string;
  routeSubscription =  new Subscription();
  articleSubscription =  new Subscription();
  isLoading = false;
  article: IArticle = {
    id: 0,
    title: '',
    tag: '',
    author: '',
    date: '',
    imgUrl : '',
    saying: '',
    content: ''
  }

  constructor(
    private actRoute: ActivatedRoute,
    private articleService: ArticlesService
    ) {}
  ngOnInit() {
    this.routeSubscription = this.actRoute.paramMap.subscribe((params) => {
      this.articleId = params.get('id')!;
      this.isLoading = true;
      this.articleSubscription = this.articleService.getArticle(this.articleId).subscribe((response) => {
        this.article = response;
        this.isLoading = false;
      })
    });
  }


  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

}
