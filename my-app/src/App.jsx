import './App.css'
import Calendrier from './component/tableau/calendrier'

function App() {

  return (
    <Calendrier dateDebut={new Date()} />
  )
}

export default App
