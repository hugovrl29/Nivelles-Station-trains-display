function Stats({ avgDelay, cancelRate }) {
  // text color for delay
  let avgColor = "text-green-400";
  if (avgDelay >= 5) avgColor = "text-orange-400";
  if (avgDelay >= 15) avgColor = "text-red-500";

  // text color for cancelations
  let cancelColor = "text-green-400";
  if (cancelRate > 1) cancelColor = "text-orange-400";
  if (cancelRate >= 20) cancelColor = "text-red-500";

  return (
    <div className="text-sm text-left">
      <p>
        Retard moyen (prochaine heure):{" "}
        <span className={`text-lg font-bold ${avgColor}`}>
          {Math.round(avgDelay)} min
        </span>
      </p>
      <p>
        Taux d'annulation (3 dernières heures):{" "}
        <span className={`text-lg font-bold ${cancelColor}`}>
          {cancelRate.toFixed(1)}%
        </span>
      </p>
    </div>
  );
}

export default Stats;
