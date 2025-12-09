import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import TripList from './pages/TripList';
import NewTrip from './pages/NewTrip';
import TripOverview from './pages/TripOverview';
import DayView from './pages/DayView';
import AddDestination from './pages/AddDestination';
import AddActivity from './pages/AddActivity';
import MapView from './pages/MapView';
import Notes from './pages/Notes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/trips" element={<TripList />} />
        <Route path="/new-trip" element={<NewTrip />} />
        <Route path="/trip/:tripId" element={<TripOverview />} />
        <Route path="/trip/:tripId/day/:dayNumber" element={<DayView />} />
        <Route path="/trip/:tripId/add-destination" element={<AddDestination />} />
        <Route path="/trip/:tripId/day/:dayNumber/add-activity" element={<AddActivity />} />
        <Route path="/trip/:tripId/map" element={<MapView />} />
        <Route path="/trip/:tripId/notes" element={<Notes />} />
      </Routes>
    </Router>
  );
}

export default App;
