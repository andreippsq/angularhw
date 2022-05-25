import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IArticle } from 'src/app/model/iarticle';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  articleList: IArticle[] = [];
  filteredArticleList:IArticle[] = [];
  numberOfArticleDisplayed = 3
  startIndex = 0;
  endIndex = 0 + this.numberOfArticleDisplayed - 1;
  isLoading = false;
  articlesSubscription = new Subscription();
  isModalOpen = false;
  selectedArticle: IArticle = {
    id: 0,
    title: '',
    tag: '',
    author: '',
    date: '',
    imgUrl: '',
    saying: '',
    content: ''
  }

  constructor(private articleService: ArticlesService) { }

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles() {
    this.isLoading = false;
    this.articlesSubscription = this.articleService.getArticles().subscribe((response) => {
      this.articleList = response;
      this.filteredArticleList = response.filter((d, i) =>  i >= this.startIndex && i <= this.endIndex )
      this.isLoading = false;
    });
  }

  prevArticles() {
    this.startIndex = this.startIndex - this.numberOfArticleDisplayed;
    this.endIndex = this.endIndex - this.numberOfArticleDisplayed;
    this.filteredArticleList = this.articleList.filter((d, i) =>  i >= this.startIndex && i <= this.endIndex )

  }

  nextArticles() {
    this.startIndex = this.startIndex + this.numberOfArticleDisplayed;
    this.endIndex = this.endIndex + this.numberOfArticleDisplayed;
    this.filteredArticleList = this.articleList.filter((d, i) =>  i >= this.startIndex && i <= this.endIndex )
  }


  resetSelectedArticle() {
    this.selectedArticle = {
      id: 0,
      title: '',
      tag: '',
      author: '',
      date: '',
      imgUrl: '',
      saying: '',
      content: ''
    }
  }

  ngOnDestroy(): void {
    this.articlesSubscription.unsubscribe();
  }

  toggleModal(modalState: boolean) {
    this.isModalOpen = modalState;
  }

  selectArticle(selectedArticle: IArticle) {
    this.selectedArticle = selectedArticle;
    this.toggleModal(true);
  }

}
