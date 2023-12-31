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

  // we can use this function to get the data from the database every 5 seconds (pooling)
  // This approach is relatively simple to implement but can put load on your server,
  // especially if you poll frequently.
  // ngOnInit() {
  //   this.getMovies(); // Initial data fetch

  //   // Periodically fetch updated data (e.g., every 5 seconds)
  //   setInterval(() => {
  //     this.getMovies();
  //   }, 5000);
  // }

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
        // After updating the movie, fetch the updated list of movies
        this.getMovies();
      },
      error => {
        console.log(error);
      }
    );
  }

  createMovie = () => {
    this.api.createMovie(this.selectedMovie).subscribe(
      data => {
        this.movies.push(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteMovie = () => {
    this.api.deleteMovie(this.selectedMovie.id).subscribe(
      data => {
        // After deleting the movie, fetch the updated list of movies
        this.getMovies();
      },
      error => {
        console.log(error);
      }
    );
  }

}
