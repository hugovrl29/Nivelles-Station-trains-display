function DeparturesTable({ departures }) {
  return (
    <div className="departures-table">
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
          {departures.map((train, index) => {
            const type = train.vehicleinfo?.type || "?";

            const time = new Date(train.time * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            const delayMin = Math.floor(parseInt(train.delay || 0, 10) / 60);

            let status = "A l'heure";
            if (train.canceled === "1") status = "Supprimé";
            else if (delayMin > 0) status = `Retard de ${delayMin} min`;

            return (
              <tr key={index}>
                <td>
                  <b>{time}</b>
                </td>
                <td>{train.station}</td>
                <td>{type !== "BUS" ? train.platform : "-"}</td>
                <td>{type}</td>
                <td>{status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DeparturesTable;
