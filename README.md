# Pawmates

Pawmates is a Tinder-like app for dogs to find love. It includes a Node/Express backend with MongoDB and a React + Vite frontend using TailwindCSS and DaisyUI for styling.

## Features

- User authentication
- Swipe-based match interface
- Real-time chat using Socket.io
- Profiles and messaging

## Repo layout

- `api/` — Express server and API routes
- `client/` — React + Vite frontend
  - `src/components` — UI components (SignUpForm, LoginForm, SwipeArea, etc.)
  - `src/pages` — App pages (HomePage, AuthPage, ProfilePage, ChatPage)
- `socket/` — Socket.io server integration
- `seeds/` — Seed data for development

## Requirements

- Node.js >= 18
- npm
- MongoDB running locally or a connection string

## Environment variables

Create a `.env` file in the project root (or in `api/` if you prefer). Example values:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/pawmates
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

The backend reads `api/config/db.js` and `api/server.js` for configuration.

## Install

From the project root install server deps:

```bash
cd api
npm install
```

Then install client deps (the project uses some packages that assert React <=18; if you run into peer dependency errors use the legacy flag):

```bash
cd ../client
npm install --legacy-peer-deps
```

Notes:

- If `npm install` fails with peer dependency errors (react-spring/react-tinder-card), re-run with `--legacy-peer-deps`.

## Run (development)

Start the backend server from the project root:

```bash
npm run dev
```

Start the frontend from `client/`:

```bash
cd client
npm run dev
```

The frontend runs on `http://localhost:5173` by default. If you need it to be available on your LAN, run `npm run dev -- --host` or set `server.host` in `client/vite.config.js`.

## Styling notes / troubleshooting

- The client uses TailwindCSS + DaisyUI. DaisyUI provides themes that can change base element styles (including input backgrounds). If inputs appear dark despite `bg-white` classes, DaisyUI's theme may be applying a background color to form elements. To force a light look, either configure DaisyUI themes in `tailwind.config.js` or add a more specific CSS override.

- If you see import resolution errors (e.g. `lucide-react`, `socket.io-client`) after installing dependencies, ensure they exist in `client/package.json` and run `npm install --legacy-peer-deps`.

## Where to look in the code

- Main app entry: `client/src/main.jsx`
- App layout and routes: `client/src/App.jsx`
- Signup form: `client/src/components/SignUpForm.jsx`
- Tailwind setup: `client/src/index.css`, `client/tailwind.config.js`
- Vite config: `client/vite.config.js`

## Tests

No automated tests are included yet.

## Contributing

Open a PR, keep changes small and focused, and run the dev servers locally to test.

## License

MIT (no license file included)
