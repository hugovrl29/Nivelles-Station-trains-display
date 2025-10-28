function DeparturesTable({ departures }) {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <table className="min-w-full border">
        <thead className="bg-blue-800">
          <tr className="border-b border-gray-200 hover::bg-gray-100 transition">
            <th className="px-4 py-2 text-xl font-semibold text-center">
              Heure
            </th>
            <th className="px-4 py-2 text-xl font-semibold text-center">
              Destination
            </th>
            <th className="px-4 py-2 text-xl font-semibold text-center">
              Voie
            </th>
            <th className="px-4 py-2 text-xl font-semibold text-center">
              Type
            </th>
            <th className="px-4 py-2 text-xl font-semibold text-center">
              Statut
            </th>
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

            //status + color
            let status = "à l'heure";
            let statusColor =
              "from-green-500 from-30% via-green-600 via-50% to-green-700 to-70%";
            if (train.canceled === "1") {
              status = "supprimé";
              statusColor =
                "from-red-500 from-30% via-red-600 via-50% to-red-700 to-70%";
            } else if (delayMin > 0) {
              status = `+${delayMin} min`;
              statusColor =
                "from-yellow-500 from-30% via-yellow-600 via-50% to-orange-600 to-70%";
            }

            // type colors
            let typeColor =
              "from-gray-300 from-30% via-gray-400 via-50% to-gray-500 to-70%";
            if (type === "IC")
              typeColor =
                "from-blue-400 from-30% via-blue-500 via-50% to-blue-600 to-70%";
            else if (type.startsWith("S"))
              typeColor =
                "from-yellow-400 from-30% via-yellow-500 via-50% to-yellow-600 to-70%";

            return (
              <tr
                key={index}
                className="border-b border-gray-200 hover::bg-gray-100 transition"
              >
                <td className="px-4 py-2 text-xl font-bold text-center">
                  {time}
                </td>
                <td className="px-4 py-2 font-bold text-left">
                  {train.station}
                </td>
                <td className="px-4 py-2 text-xl font-bold text-center">
                  {type !== "BUS" ? train.platform : "-"}
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`inline-block w-14 px-3 py-1 rounded-xl text-white font-bold bg-gradient-to-b ${typeColor}`}
                  >
                    {type}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`inline-block w-30 px-3 py-1 rounded-sm text-white font-semibold bg-gradient-to-b ${statusColor}`}
                  >
                    {status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DeparturesTable;
