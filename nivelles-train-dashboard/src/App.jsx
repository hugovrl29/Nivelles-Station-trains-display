import { useState, useEffect } from 'react'
import { fetchIRail } from './utils/fetchStation';

function App() {


  const [departures, setDepartures] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {

    async function loadData() {
      setLoading(true);
      const data = await fetchIRail("liveboard", {arrdep: "departure"});

      if (data) {
        setDepartures(data.departures?.departure.slice(0, 8) || []);
      }
      setLoading(false);
    }
  loadData();

  }, [])

  if (loading) {
    return <p> Loading departures...</p>;
  }
  

  return (
    <div className="p-4">
      <h1>Next 3 Departures from Nivelles</h1>
      <ul>
        {departures.map((train, index) => {

          const type = train.vehicleinfo?.type || "?";

          const time = new Date(train.time * 1000).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit" });

          const delayMin = Math.floor((parseInt(train.delay || 0, 10)) / 60);

          let status = "On time";
          if (train.canceled === "1") {
            status = "Canceled"
          } else if (delayMin > 0){
            status = `Delayed +${delayMin} min`;
          }

          return (
            <li key={index}>
              {type} - {time} - {train.station} {type !== "BUS" ? `- Track ${train.platforminfo.normal}` : ""} - {status}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App
