import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit2, Save } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useTravel } from '../context/TravelContext';

export default function Notes() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { trips, updateTripNotes } = useTravel();

  const trip = trips.find(t => t.id === tripId);
  const [notes, setNotes] = useState(trip?.notes || '');
  const [isEditing, setIsEditing] = useState(false);

  if (!trip) {
    return null;
  }

  const handleSave = () => {
    if (tripId) {
      updateTripNotes(tripId, notes);
      setIsEditing(false);
    }
  };

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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Trip Notes</h1>
              <p className="text-gray-600">{trip.name}</p>
            </div>
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                variant="secondary"
                className="flex items-center"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            ) : (
              <Button
                onClick={handleSave}
                className="flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            )}
          </div>
        </Card>

        <Card className="p-6">
          {isEditing ? (
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your trip notes here..."
              className="w-full h-96 px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none placeholder-gray-400 resize-none"
            />
          ) : (
            <div className="min-h-96">
              {notes ? (
                <p className="text-gray-700 whitespace-pre-wrap">{notes}</p>
              ) : (
                <p className="text-gray-400 text-center py-20">
                  No notes yet. Click Edit to add some!
                </p>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
