# CounterGen Website

Written in React + ts with MUI.

To run the backend:

1. Set the OPENAI_API_KEY env variable to your openai key.
2. Run

```bash
python app.py
```

To deploy:

```bash
git push heroku main
```

To dev the frontend:

1. Create a `.env` file in `frontend/` containing `REACT_APP_COUNTERGEN_BACK_URL=http://127.0.0.1:5000` (or the URL of whathever backend you wish to use, for example `https://countergen.heroku.app`)
2. Run

```bash
cd frontend; npm start
```

Setup the instance by following the instructions here https://www.youtube.com/watch?v=-oD7qNfxKws
and then enter the following instruction

```bash
ssh -i ~/.ssh/countergen-website-2.pem ubuntu@ec2-184-73-128-253.compute-1.amazonaws.com
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

(recover with screen -r)
