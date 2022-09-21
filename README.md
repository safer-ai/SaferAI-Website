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
