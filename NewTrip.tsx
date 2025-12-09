import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { useTravel } from '../context/TravelContext';

export default function NewTrip() {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addTrip } = useTravel();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !startDate || !endDate) {
      setError('All fields are required');
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      setError('End date must be after start date');
      return;
    }

    addTrip({ name, startDate, endDate });
    navigate('/trips');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-100 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/trips')}
          className="mb-6 flex items-center text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <Card className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create New Trip</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Trip Name"
              type="text"
              placeholder="e.g., Summer Adventure in Europe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <Input
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full mt-6">
              Create Trip
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
