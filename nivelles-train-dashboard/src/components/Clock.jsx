function Clock({ currentTime }) {
  //current time
  const todayTime = new Date(currentTime * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return <span className="text-2xl font-mono">{todayTime}</span>;
}

export default Clock;
