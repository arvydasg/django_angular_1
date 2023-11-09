import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})

export class AppComponent {
  // just a sample data below, in case we want to return movies list
  movies = [{ title: 'titanic' }, { title: 'avatar' }, { title: 'FAF' }, { title: 'Test' }];

  // instead of using a sample data, we use ApiService to fetch the data
  constructor(private api: ApiService) {
    this.getMovies();
  }

  getMovies() {
    this.api.getAllMovies().subscribe(
      data => {
        this.movies = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  // if we don't specify "any" type here - we get an error, it does not know the type
  movieClicked = (movie: any) => {
    console.log(movie);
  }
}
