import { useState, useEffect } from 'react'
import { fetchIRail } from './utils/fetchStation';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <div className="departures-table">
      <h1>Prochains départs de la gare de Nivelles</h1>
      <Dashboard />
    </div>
  )
}

export default App;
