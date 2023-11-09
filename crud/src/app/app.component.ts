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
  movies = [{ title: '' }];
  selectedMovie;

  // By adding ! to the property types, you're telling TypeScript that these properties will be
  // initialized by the time they are used, even though they don't have initial values.
  // The use of ! for non-nullable properties is one of TypeScript's features aimed at catching
  // potential null or undefined errors at compile-time, which is a valuable safety feature.
  title!: string;
  desc!: string;
  year!: number;

  // instead of using a sample data, we use ApiService to fetch the data
  constructor(private api: ApiService) {
    this.getMovies();
    this.selectedMovie = {id: -1, title: '', desc: '', year: '' };
  }

  getMovies() {
    this.api.getAllMovies().subscribe(
      data => {
        this.movies = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }


  // if we don't specify "any" type here - we get an error, it does not know the type
  movieClicked = (movie: any) => {
    this.api.getOneMovie(movie.id).subscribe(
      data => {
        console.log(data);
        this.selectedMovie = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateMovie = () => {
    this.api.updateMovie(this.selectedMovie).subscribe(
      data => {
        console.log(data);
        this.selectedMovie = data;

        // After updating the movie, fetch the updated list of movies
        this.getMovies();
      },
      error => {
        console.log(error);
      }
    );
  }

}
