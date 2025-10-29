# Nivelles Station Trains Dashboard

## 🎯 Goal

Build a small **React** dashboard that displays train information for **Nivelles** station (Brussels–Nivelles and Charleroi–Nivelles lines), using the public [iRail API](https://api.irail.be).

## 📄 Features

- ⏱ Display of the **average delay** for the upcoming hour
- ❌ Display of the **cancellation rate** of trains during the last 3 hours
- 📊 Table of the next departures from Nivelles (limited to the next 2 hours)
- 🕒 Real-time clock display
- ⚙️ Ability to extend the dashboard with additional components

## 🛠 Technical approach

- One request to fetch every **departure** from Nivelles per batch hour (filtered in React).
- Filtering in React to restrict results to the proper time window (current time ± 1h or 3h).
- Automatic refresh every **15 seconds**.

## 💻 Tech stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [iRail API](https://api.irail.be)
- [Tailwind CSS](https://tailwindcss.com/) (bonus: dark theme and SNCB-inspired colors + responsiveness).

## ⚙️ Dashboard extension

1. Ability to add new components (eg: different endpoint, different API, pull requests, ...)

- A generic function `fetchRail()` is already available in `utils/fetchRail.js`. Just reuse it to request any other iRail endpoints.

- For different API requests, a dedicated `useEffect` and `useState` inside that component should be created to manage its lifecycle independently.
- For iRail API requests, the `useState` and `useEffect` in `Dashboard.jsx`can be reused.

2. The dashboard is component based (Clock, Departures table, Stats, ... are implemented as independent components). New features can be added as new components.

```
Add a new component:

- Create the component in `src/components`
- Import it to `src/components/Dashboard` in a new `<div>` block.
```

## Setup

1. Clone the repo

```
git clone https://github.com/hugovrl29/Nivelles-Station-trains-display.git
cd Nivelles-Station-trains-display/nivelles-train-dashboard
```

2. Install dependencies

```
npm install
```

3. Run

```
npm run dev
```
