# Nivelles Station Trains Dashboard

## 🎯 Goal
Build a small **React** dashboard that displays train information for **Nivelles** station (Brussels–Nivelles and Charleroi–Nivelles lines), using the public [iRail API](https://api.irail.be).

## 📄 Features
- 📊 Table of the next departures from Nivelles (limited to the next 2 hours)  
- ⏱ Display of the **average delay** for the upcoming hour  
- ❌ Display of the **cancellation rate** of trains during the last 3 hours  
- 🕒 Real-time clock display  

## 🛠 Technical approach
- One main request to fetch **departures** from Nivelles (filtered in React).  
- One request to fetch **arrivals** at Nivelles (used to calculate canceled trains).  
- Filtering in React to restrict results to the proper time window (current time ± 1h or 3h).  
- Error handling and concurrent requests management.  
- Automatic refresh every **15 seconds**.  

## 💻 Tech stack
- [React](https://react.dev/)  
- [iRail API](https://api.irail.be)  
- [Tailwind CSS](https://tailwindcss.com/) (bonus: dark theme and SNCB-inspired colors).  
