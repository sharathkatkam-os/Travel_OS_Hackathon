import { useNavigate } from 'react-router-dom';
import { Plus, Calendar } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useTravel } from '../context/TravelContext';

export default function TripList() {
  const navigate = useNavigate();
  const { trips, selectTrip } = useTravel();

  const handleTripClick = (tripId: string) => {
    selectTrip(tripId);
    navigate(`/trip/${tripId}`);
  };

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const startMonth = startDate.toLocaleDateString('en-US', { month: 'short' });
    const endMonth = endDate.toLocaleDateString('en-US', { month: 'short' });
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();

    if (startMonth === endMonth) {
      return `${startMonth} ${startDay}–${endDay}`;
    }
    return `${startMonth} ${startDay} – ${endMonth} ${endDay}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-100 p-4 pb-20">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8 pt-4">
          <h1 className="text-3xl font-bold text-gray-800">My Trips</h1>
          <button
            onClick={() => navigate('/new-trip')}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {trips.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Calendar className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg">No trips yet</p>
              <p className="text-sm mt-2">Create your first trip to get started!</p>
            </div>
            <Button onClick={() => navigate('/new-trip')} className="mt-4">
              Create Trip
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {trips.map((trip) => (
              <Card
                key={trip.id}
                onClick={() => handleTripClick(trip.id)}
                className="p-6 cursor-pointer"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {trip.name}
                </h3>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
