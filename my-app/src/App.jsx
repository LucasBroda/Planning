import './App.css'
import Calendrier from './component/tableau/calendrier'
import { CalendarProvider } from './contexts/CalendarContext'
import { ActivityProvider } from './contexts/ActivityContext'

function App() {
  return (
    <CalendarProvider>
      <ActivityProvider>
        <Calendrier />
      </ActivityProvider>
    </CalendarProvider>
  )
}

export default App
