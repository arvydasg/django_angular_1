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


### I agree, it's too much work to set this up

I agree, it's too much work to set this up on a brand new machine. Be it raspberry pi or or just another laptop.. I will create a docker image instead tomorrow.