# django_angular_1

Did this tutorial as my first exposure to angular and drf.

- Part 1 -  https://youtu.be/z_H-oxQVsPw?si=dYxyphs5cYtG0J9C
- Part 2 - https://youtu.be/kXxmhFk6STc?si=M0plgKBl32YINQ9P

## How to run this

1. Clone this repo.

### Setup Backend
- While in the same folder as manage.py file, create python virtual environment with `python3 -m venv venv`.
- Activate the environment with `source venv/bin/activate`.
- install needed python dependencies with `pip install -r requirements.txt`.
- do the database migrations to create the needed tables and so on with `python manage.py makemigrations` and `python manage.py migrate`.
- create django superuser with `python manage.py createsuperuser`.
- start django service with `python manage.py runserver`.
- go to http://127.0.0.1:8000/ to see your api.
- create some movies from http://127.0.0.1:8000/admin or from drf in http://127.0.0.1:8000/.

### Setup Frontend
- Make sure you have nvm installed. To install - `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash` and then `source ~/.bashrc` and finally   `nvm -v`.
- Over it install node latest version by `nvm install --lts` and then `nvm use --lts`, then `node -v`
- make sure npm is installed by `npm -v`
- Activate node with `nvm use --lts`.
- install angular by `npm install -g @angular/cli` and `ng version`
- install project dependencies by `npm install`
- Start angular service while in `crud` folder with `ng serve` command (or `NODE_OPTIONS="--max_old_space_size=512" ng serve`) if you are low on system resources.
- go to http://localhost:4200/ and you should see a list of movies.


### I agree, it's too much work to set this up, let's dockerize

I agree, it's too much work to set this up on a brand new machine. Be it raspberry pi or or just another laptop.. I will create a docker image instead tomorrow.

This tomorrow has come.

I have managed to setup Docker images for both frontend and backend. One each. For backend:

#### For backend

Create Dockerfile in the same directory as your `manage.py` file is, this should be the content:

```bash
# Use an official Python runtime as a parent image
FROM python:3.10

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

Then to create the image, run:

```bash
docker build -t da_back .
```

After it's build, you should see it in your Docker Desktop application or when you run `docker images` in your terminal.

To run this image, do:

```bash
docker run -p 8000:8000 da_back
# or run the service in datached mode(free the terminal)
docker run -d -p 8000:8000 da_back
```

Open http://127.0.0.1:8000/ and backend(drf) should be running.

#### For frontend

Create Dockerfile in the same directory as your `package.json` file is, this should be the content:

```bash
# Use the official Node.js LTS image as a base image
FROM node:lts

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the contents of the local src directory to the working directory
COPY . .

# Install the Angular CLI globally
RUN npm install -g @angular/cli

# Expose port 4200
EXPOSE 4200

# Start the application with --host 0.0.0.0 to allow external connections
CMD ["ng", "serve", "--host", "0.0.0.0"]
```

Then to create the image, run:

```bash
docker build -t da_front .
```

After it's build, you should see it in your Docker Desktop application or when you run `docker images` in your terminal.

To run this image, do:

```bash
docker run -p 4200:4200 da_front
# or run the service in datached mode(free the terminal)
docker run -d -p 8000:8000 da_front
```

Open http://127.0.0.1:4200/ and backend(drf) should be running.

#### Cherry on the cake - `docker-compose.yml` file

Create a `docker-compose.yml` in the same directory as README.md. The content of this file:

```bash
version: '3'

services:
  backend:
    image: da_back # this is the name of my backend image
    ports:
      - "8000:8000"

  frontend:
    image: da_front # this is the name of my frontend image
    ports:
      - "4200:4200"
```

Now when you run:

```bash
docker compose up
```

It then runs both of those docker images at the same time. Amazing!

