# CounterGen website

This repo contains the website that presents CounterGen and provide a web interface for it.

## Dev instructions

Written in React + ts with MUI.

To run the backend:

1. Set the OPENAI_API_KEY env variable to your openai key.
2. Run

```bash
python app.py
```

To dev the frontend:

1. Create a `.env` file in `frontend/` containing `REACT_APP_COUNTERGEN_BACK_URL=http://127.0.0.1:5000` (or the URL of whathever backend you wish to use, for example `https://countergen.heroku.app`)
2. Run

```bash
cd frontend; npm start
```

## Deploy

Remove `REACT_APP_COUNTERGEN_BACK_URL=http://127.0.0.1:5000` in the `.env` file

### Deploy on heroku

```bash
git push heroku main
```

### Deploy on beanstalk

1. Add your aws credentials to the appropriate `.aws` folder

2. In frontend folder, run

```bash
npm run build
```

3. In project folder, run

```bash
pip install -r requirements-dev.txt
```

4. Copy the content of the `frontend/build` folder as well as `requirements.txt` and `application.py`
   in the root directory of another folder. Remove the CORS from the `application.py`, send `index.html` instead of `__file__[:-6] + "frontend/build/index.html"`, replace the Flask constructor by `Flask(__name__)`, and remove arguments from the `application.run` command.

5. In the new folder you created, run

```bash
eb init -p python-3.7 countergen-web --region us-east-2
eb create
```

Follow the instruction and stick with the defaults.

```bash
git init
git add .
git commit -m "Deploy"
eb deploy
```

### Deploy on an EC2 instance

Setup the instance by following the instructions here <https://www.youtube.com/watch?v=-oD7qNfxKws>
and then enter the following instruction

```bash
ssh -i ~/.ssh/countergen-website-2.pem ubuntu@[SSH-IP]
git clone https://github.com/FabienRoger/Countergen-Website
sudo apt update
sudo apt install python-is-python3
sudo apt install python3-pip
sudo apt install npm
cd ~/Countergen-Website/frontend
npm install
npm run build
cd ~/Countergen-Website
sudo apt install libpq-dev python3-dev
pip install -r requirements.txt
export PORT=8080
export OPENAI_API_KEY=
screen
python app.py
```

Ctrl+A then d

(recover with `screen -r`)
