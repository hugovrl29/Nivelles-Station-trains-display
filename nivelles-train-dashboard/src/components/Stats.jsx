function Stats({ avgDelay, cancelRate }) {
  return (
    <div className="stats">
      <p>Retard moyen pour la prochaine heure: {Math.round(avgDelay)} min</p>
      <p>
        Taux d'annulation des trains des 3 dernières heures:{" "}
        {cancelRate.toFixed(1)}%
      </p>
    </div>
  );
}

export default Stats;
