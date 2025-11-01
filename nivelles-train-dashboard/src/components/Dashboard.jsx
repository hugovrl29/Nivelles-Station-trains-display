import { useEffect, useState } from "react";
import Clock from "./Clock";
import DeparturesTable from "./DeparturesTable";
import Stats from "./Stats";
import { fetchIRail } from "../utils/fetchStation";

function Dashboard() {
  const [departures, setDepartures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(Date.now() / 1000);

  //time update
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => clearInterval(interval); // cleaning
  }, []);

  // fetch data
  useEffect(() => {
    let abortController = new AbortController();

    async function loadData(first = false) {
      // cancel previous call if needed
      abortController.abort();
      abortController = new AbortController();

      // only display loading screen at first call
      if (first) setLoading(true);

      //extract time for requests
      const currentTime = new Date();
      const offsets = Array.from({ length: 6 }, (_, i) => i - 3);

      // store all departures
      let allDepartures = [];

      //API calls (iRail)
      try {
        // one call per hour batch
        for (const offset of offsets) {
          const date = new Date(currentTime.getTime() + offset * 3600 * 1000);

          //get trains from previous day if offset is yesterday
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = String(date.getFullYear()).slice(2);

          const dateFormat = day + month + year; // <- ddmmyy format

          const timeFormat = date
            .toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            .replace(":", ""); // <- hhmm format

          // call
          const data = await fetchIRail("liveboard", {
            date: dateFormat,
            time: timeFormat,
            signal: abortController.signal,
          });

          // add data to list
          if (data) {
            allDepartures = allDepartures.concat(
              data.departures?.departure || []
            );
          }
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch Aborted");
          return; // if aborted, do nothing
        }
        console.error("Error while fetching data:", error);
        setDepartures([]);
      }

      // prevent 429 Too Many Requests Error
      await new Promise((pause) => setTimeout(pause, 400));

      // clean list (remove duplicates + sort)
      // remove line S35 if present
      allDepartures = allDepartures.filter(
        (departure) => departure.vehicleinfo?.type !== "S35"
      );
      // remove duplicates
      const seen = new Set();

      let uniqueDepartures = allDepartures.filter((departure) => {
        const key = `${departure.platform}-${departure.time}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      // sort
      uniqueDepartures.sort(
        (departure1, departure2) =>
          Number(departure1.time) - Number(departure2.time)
      );

      setDepartures(uniqueDepartures);

      // only display loading at first fetch
      if (first) {
        setLoading(false);
      }
    }

    // first call
    loadData(true);

    //auto-call every 15s
    const interval = setInterval(() => {
      loadData();
    }, 15000);

    return () => {
      clearInterval(interval);
      abortController.abort();
    };
  }, []);

  //future departures
  const upcomingDepartures = departures.filter(
    (departure) =>
      Number(departure.time) + Number(departure.delay) >= currentTime &&
      Number(departure.time) <= currentTime + 2 * 3600
  );

  //next hour departures
  const nextDepartures = upcomingDepartures.filter(
    (departure) =>
      Number(departure.time) + Number(departure.delay) <= // take delay into account
      currentTime + 3600
  );

  //past departures
  const previousDepartures = departures.filter(
    (departure) => Number(departure.time) <= currentTime
  );

  // compute mean delay
  const avgDelay =
    nextDepartures.reduce(
      (sum, train) => (sum += Number(train.delay || 0)),
      0
    ) /
    nextDepartures.length /
    60; // <- minutes

  // canceled trains rate
  const cancelRate =
    (previousDepartures.filter((train) => train.canceled === "1").length /
      previousDepartures.length) *
    100;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Prochains départs de la gare de Nivelles
        </h2>
        <Clock currentTime={currentTime} />
        {/* insert a component here*/}
      </div>
      {loading || !departures || departures.length === 0 ? (
        <p className="text-xl text-center">Chargement des départs...</p>
      ) : (
        <>
          <Stats avgDelay={avgDelay} cancelRate={cancelRate} />
          <div className="max-w-5x1 mx-auto px-4">
            <DeparturesTable departures={upcomingDepartures} />
          </div>
          {/* insert a API based component here*/}
        </>
      )}
    </div>
  );
}

export default Dashboard;
