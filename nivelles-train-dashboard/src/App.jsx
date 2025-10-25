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
        setDepartures(data.departures?.departure || []);
      }
      setLoading(false);
    }
  loadData();

  }, [])

  if (loading) {
    return <p> Chargement des departs...</p>;
  }
  

  return (
    <div className="p-4">
      <h1>Prochains départs de la gare de Nivelles</h1>
      <table>
        <tr>
          <th>Heure</th>
          <th>Destination</th>
          <th>Voie</th>
          <th>Type</th>
          <th>Statut</th>
        </tr>
        {departures.map((train) => {

          const type = train.vehicleinfo?.type || "?";

          const time = new Date(train.time * 1000).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit" });

          const delayMin = Math.floor((parseInt(train.delay || 0, 10)) / 60);

          let status = "A l'heure";
          if (train.canceled === "1") {
            status = "Supprimé"
          } else if (delayMin > 0){
            status = `Retard de +${delayMin} min`;
          }

          return (
            <tr>
              <th><b>{time}</b></th>
              <th>{train.station}</th>
              <th>{type !== "BUS" ? train.platform : "-"}</th>
              <th>{type}</th>
              <th>{status}</th>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default App
