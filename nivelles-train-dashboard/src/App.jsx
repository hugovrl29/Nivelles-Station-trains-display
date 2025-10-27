import { useState, useEffect } from 'react'
import { fetchIRail } from './utils/fetchStation';

function App() {


  const [departures, setDepartures] = useState([])
  const [loading, setLoading] = useState(true)
  const [current_time, setCurrentTime] = useState(Date.now() / 1000)

  //time update
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => clearInterval(interval); // cleaning
  })

  // fetch data
  useEffect(() => {

    async function loadData(first = false) {
      // only display loading screen at first call
      if (first) {
        setLoading(true);
      }

      //extract time for requests
      const current_time = new Date();
      const offsets = Array.from({length: 6 }, (_, i) => i-3);

      // store all departures
      let allDepartures = [];

      //API calls
      try {
        // one call per hour batch
        for (const offset of offsets) {

          const date = new Date(current_time.getTime() + offset * 3600 * 1000);

          //get trains from previous day if offset is yesterday
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1). padStart(2, "0");
          const year = String(date.getFullYear()).slice(2)

          const date_format = day + month + year; // <- ddmmyy format

          const time_format = date
            .toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            .replace(":", ""); // <- hhmm format

          // call
          const data = await fetchIRail("liveboard", {
            date: date_format,
            time: time_format,
          });

          // add data to list
          if(data) {
            allDepartures = allDepartures.concat(data.departures?.departure || []);
          }
        }
      } catch (error) {
        console.error("Error while fetching data:", error);
        setDepartures([]);
      }

      // prevent 429 Too Many Requests Error
      await new Promise(pause => setTimeout(pause, 400));

      setDepartures(allDepartures);
      if(first){
        setLoading(false);
      }
    }

    // first call
    loadData(true);

    //auto-call every 15s
    const interval = setInterval(() => {
      loadData();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // data loading screen
  if (loading) {
    return <p> Chargement des departs...</p>;
  }

  //future departures
  const upcomingDepartures = departures.filter(
    departure => Number(departure.time) >= current_time
  );

  //next hour departures
  const nextDepartures = upcomingDepartures.filter(
    departure => Number(departure.time) <= current_time + 2 * 3600
  );

  //past departures
  const previousDepartures = departures.filter(
    departure => Number(departure.time) <= current_time
  );
  
  // compute mean delay
  const avgDelay = nextDepartures.reduce((sum, train) => sum += Number(train.delay || 0), 0) / nextDepartures.length / 60; // <- minutes

  // canceled trains rate
  const cancelRate = ((previousDepartures.filter( train => train.canceled === "1").length) / previousDepartures.length) * 100;

  //current time
  const today_time = new Date(current_time * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  })

  return (
    <div className="departures-table">
      <h1>Prochains départs de la gare de Nivelles</h1>
      <h2>{today_time}</h2>
      <table>
        <thead>
          <tr>
            <th>Heure</th>
            <th>Destination</th>
            <th>Voie</th>
            <th>Type</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {upcomingDepartures.map((train, index) => {

            const type = train.vehicleinfo?.type || "?";

            const time = new Date(train.time * 1000).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit" });

            const delayMin = Math.floor((parseInt(train.delay || 0, 10)) / 60);

            let status = "A l'heure";
            if (train.canceled === "1") {
              status = "Supprimé"
            } else if (delayMin > 0){
              status = `Retard de ${delayMin} min`;
            }

            return (
              <tr key={index}>
                <th><b>{time}</b></th>
                <th>{train.station}</th>
                <th>{type !== "BUS" ? train.platform : "-"}</th>
                <th>{type}</th>
                <th>{status}</th>
              </tr>
            )
          })}
        </tbody>
      </table>
      {departures.length > 0 ? (
        <>
        <p>Retard moyen pour la prochaine heure: {Math.round(avgDelay)} min</p>
      <p>Taux d'annulation des trains des 3 dernières heures: {cancelRate.toFixed(1)}%</p>
        </>
      ) : (
        <p> Aucune information à propos des trains </p>
      )}
    </div>
  )
}

export default App
