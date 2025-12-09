import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import Card from '../components/ui/Card';
import { useTravel } from '../context/TravelContext';

export default function MapView() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { trips } = useTravel();

  const trip = trips.find(t => t.id === tripId);

  if (!trip) {
    return null;
  }

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
          <h1 className="text-2xl font-bold text-gray-800">Map View</h1>
          <p className="text-gray-600">{trip.name}</p>
        </Card>

        <Card className="p-8 relative overflow-hidden">
          <div className="aspect-square bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl relative">
            <svg className="w-full h-full" viewBox="0 0 400 400">
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>

              {trip.destinations.length > 1 && (
                <path
                  d={trip.destinations.map((_, i) => {
                    const total = trip.destinations.length;
                    const x = 100 + Math.cos((i / total) * Math.PI * 2) * 120;
                    const y = 200 + Math.sin((i / total) * Math.PI * 2) * 120;
                    return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
                  }).join(' ') + ' Z'}
                  fill="none"
                  stroke="url(#pathGradient)"
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  opacity="0.5"
                />
              )}

              {trip.destinations.map((destination, index) => {
                const total = Math.max(trip.destinations.length, 1);
                const angle = (index / total) * Math.PI * 2;
                const x = 200 + Math.cos(angle) * 120;
                const y = 200 + Math.sin(angle) * 120;

                return (
                  <g key={destination.id}>
                    <circle
                      cx={x}
                      cy={y}
                      r="30"
                      fill="white"
                      stroke="url(#pathGradient)"
                      strokeWidth="3"
                      className="drop-shadow-lg"
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r="12"
                      fill="url(#pathGradient)"
                    />
                  </g>
                );
              })}
            </svg>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="grid gap-2">
                {trip.destinations.length === 0 ? (
                  <div className="text-center text-gray-400">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>No destinations yet</p>
                  </div>
                ) : (
                  trip.destinations.map((destination, index) => (
                    <div
                      key={destination.id}
                      className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md"
                    >
                      <span className="font-semibold text-blue-600">{index + 1}.</span>{' '}
                      <span className="text-gray-800">{destination.city}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
