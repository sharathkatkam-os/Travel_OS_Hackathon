import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Plus, Calendar, Map, StickyNote } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useTravel } from '../context/TravelContext';
import { useEffect } from 'react';

export default function TripOverview() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { currentTrip, selectTrip, trips } = useTravel();

  useEffect(() => {
    if (tripId && (!currentTrip || currentTrip.id !== tripId)) {
      selectTrip(tripId);
    }
  }, [tripId, currentTrip, selectTrip]);

  if (!currentTrip) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-100 p-4 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const trip = trips.find(t => t.id === tripId) || currentTrip;

  const getDayCount = () => {
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  const dayCount = getDayCount();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-100 p-4 pb-20">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/trips')}
          className="mb-6 flex items-center text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Trips
        </button>

        <Card className="p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{trip.name}</h1>
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>
              {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
            </span>
          </div>
        </Card>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Destinations
            </h2>
            <Button
              onClick={() => navigate(`/trip/${tripId}/add-destination`)}
              variant="secondary"
              className="text-sm"
            >
              <Plus className="w-4 h-4 mr-1 inline" />
              Add
            </Button>
          </div>

          {trip.destinations.length === 0 ? (
            <Card className="p-6 text-center text-gray-500">
              No destinations yet
            </Card>
          ) : (
            <div className="space-y-3">
              {trip.destinations.map((destination) => (
                <Card key={destination.id} className="p-4">
                  <h3 className="font-semibold text-gray-800">{destination.city}</h3>
                  {destination.notes && (
                    <p className="text-sm text-gray-600 mt-1">{destination.notes}</p>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Daily Schedule
            </h2>
          </div>

          <div className="space-y-3">
            {Array.from({ length: dayCount }, (_, i) => i + 1).map((dayNumber) => {
              const activitiesForDay = trip.activities.filter(a => a.dayNumber === dayNumber);
              return (
                <Card
                  key={dayNumber}
                  onClick={() => navigate(`/trip/${tripId}/day/${dayNumber}`)}
                  className="p-4 cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-800">Day {dayNumber}</h3>
                      <p className="text-sm text-gray-600">
                        {activitiesForDay.length} {activitiesForDay.length === 1 ? 'activity' : 'activities'}
                      </p>
                    </div>
                    <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            onClick={() => navigate(`/trip/${tripId}/map`)}
            variant="secondary"
            className="flex items-center justify-center"
          >
            <Map className="w-5 h-5 mr-2" />
            Map View
          </Button>
          <Button
            onClick={() => navigate(`/trip/${tripId}/notes`)}
            variant="secondary"
            className="flex items-center justify-center"
          >
            <StickyNote className="w-5 h-5 mr-2" />
            Notes
          </Button>
        </div>
      </div>
    </div>
  );
}
