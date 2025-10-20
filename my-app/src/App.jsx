import './App.css'
import './component/tableau/calendrier'

function App() {

  return (
    <>
      <Calendrier dateDebut={new Date()} />
    </>
  )
}

export default App
