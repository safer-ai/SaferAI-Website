# SaferAI's Website

## Dev instructions

Written in React + Typescript with MaterialUI.

To run the backend locally:

1. Set the OPENAI_API_KEY env variable to your openai key.
2. Run

```bash
python app.py
```

To dev the frontend:

1. Create a `.env` file in `frontend/` containing `REACT_APP_COUNTERGEN_BACK_URL=http://127.0.0.1:5000` (or the URL of the backend you wish to use)
2. Run

```bash
cd frontend; npm start
```

## Deploy

### Deploy on heroku

```bash
git push heroku main
```

### Deploy on an EC2 instance

Setup the instance by following the instructions here <https://www.youtube.com/watch?v=-oD7qNfxKws>
and then enter the following instruction

```bash
ssh -i ~/.ssh/countergen-website-2.pem ubuntu@<SSH-IP>
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
export PORT=<PORT YOUR ARE USING (8080 if you are following the instruction)>
export OPENAI_API_KEY=<YOUR API KEY>
screen
python app.py
```
Ctrl+A then d to close the python process without shutting down the server.

Recover the python process with `screen -r`.
