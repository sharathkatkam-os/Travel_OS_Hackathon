import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Clock } from 'lucide-react';
import Card from '../components/ui/Card';
import { Button } from "../components/ui/Button";  // ✅ Correct
import { useTravel } from '../context/TravelContext';

export default function DayView() {
  const { tripId, dayNumber } = useParams();
  const navigate = useNavigate();
  const { trips } = useTravel();

  const trip = trips.find(t => t.id === tripId);
  const dayNum = parseInt(dayNumber || '1');
  const activitiesForDay = trip?.activities.filter(a => a.dayNumber === dayNum) || [];

  if (!trip) {
    return null;
  }

  const sortedActivities = [...activitiesForDay].sort((a, b) => {
    return a.time.localeCompare(b.time);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-100 p-4 pb-20">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(`/trip/${tripId}`)}
          className="mb-6 flex items-center text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <Card className="p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Day {dayNum}</h1>
          <p className="text-gray-600">{trip.name}</p>
        </Card>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Activities</h2>
            <Button
              onClick={() => navigate(`/trip/${tripId}/day/${dayNum}/add-activity`)}
              variant="secondary"
              className="text-sm"
            >
              <Plus className="w-4 h-4 mr-1 inline" />
              Add Activity
            </Button>
          </div>

          {sortedActivities.length === 0 ? (
            <Card className="p-8 text-center text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No activities planned yet</p>
              <p className="text-sm mt-2">Add your first activity to get started</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {sortedActivities.map((activity) => (
                <Card key={activity.id} className="p-5">
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium mr-4">
                      {activity.time}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {activity.title}
                      </h3>
                      {activity.notes && (
                        <p className="text-sm text-gray-600">{activity.notes}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
