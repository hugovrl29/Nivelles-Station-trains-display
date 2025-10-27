function Clock({currentTime}) {
    //current time
    const todayTime = new Date(currentTime * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    })

    return <h2>{todayTime}</h2>
}

export default Clock;