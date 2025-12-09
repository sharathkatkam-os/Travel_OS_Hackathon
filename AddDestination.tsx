import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { useTravel } from '../context/TravelContext';

export default function AddDestination() {
  const { tripId } = useParams();
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addDestination } = useTravel();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!city) {
      setError('City name is required');
      return;
    }

    if (tripId) {
      addDestination(tripId, { city, notes });
      navigate(`/trip/${tripId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-100 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(`/trip/${tripId}`)}
          className="mb-6 flex items-center text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <Card className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Destination</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="City"
              type="text"
              placeholder="e.g., Paris, Tokyo, New York"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                placeholder="Add any notes about this destination..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none placeholder-gray-400"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full mt-6">
              Create Destination
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
