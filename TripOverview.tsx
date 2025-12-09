import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Map, StickyNote, Sparkles, X, Clock, DollarSign, Navigation } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useTravel } from '../context/TravelContext';
import { useEffect, useState } from 'react';

const CITY_IMAGES: Record<string, string> = {
  'Paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80',
  'Tokyo': 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&q=80',
  'New York': 'https://images.unsplash.com/photo-1496442226666-8d4a0e62e6e9?w=1200&q=80',
  'London': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80',
  'Dubai': 'https://images.unsplash.com/photo-1512453979798-5ea932a23518?w=1200&q=80',
  'Rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80',
  'Barcelona': 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=1200&q=80',
  'Amsterdam': 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1200&q=80',
  'Sydney': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&q=80',
  'default': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80'
};

const ACTIVITY_IMAGES: Record<string, string> = {
  'museum': 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800&q=80',
  'restaurant': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
  'park': 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80',
  'shopping': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
  'landmark': 'https://images.unsplash.com/photo-1471623320832-752e8bbf8413?w=800&q=80',
  'beach': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  'food': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
  'default': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80'
};

const MOCK_ITINERARY_TEMPLATES: Record<string, any> = {
  'Paris': {
    day1: [
      { title: 'Eiffel Tower', time: '09:00 AM', notes: 'Start your journey at the iconic Eiffel Tower with panoramic city views.' },
      { title: 'Louvre Museum', time: '01:00 PM', notes: 'Explore world-famous art including the Mona Lisa.' },
      { title: 'Seine River Cruise', time: '07:00 PM', notes: 'Romantic dinner cruise with spectacular city lights.' }
    ],
    day2: [
      { title: 'Notre-Dame Cathedral', time: '10:00 AM', notes: 'Visit the historic Gothic masterpiece.' },
      { title: 'Latin Quarter', time: '02:00 PM', notes: 'Wander through charming streets and cafes.' }
    ]
  },
  'Tokyo': {
    day1: [
      { title: 'Senso-ji Temple', time: '09:00 AM', notes: 'Experience ancient Japanese culture in Asakusa.' },
      { title: 'Shibuya Crossing', time: '01:00 PM', notes: 'Witness the world\'s busiest intersection.' },
      { title: 'Tokyo Skytree', time: '07:00 PM', notes: 'Breathtaking views from Japan\'s tallest tower.' }
    ],
    day2: [
      { title: 'Tsukiji Fish Market', time: '06:00 AM', notes: 'Fresh sushi breakfast experience.' },
      { title: 'Harajuku', time: '02:00 PM', notes: 'Explore trendy fashion and youth culture.' }
    ]
  },
  'default': {
    day1: [
      { title: 'City Center Exploration', time: '09:00 AM', notes: 'Discover the heart of the city and its main attractions.' },
      { title: 'Local Cuisine Experience', time: '01:00 PM', notes: 'Taste authentic local dishes at popular restaurants.' },
      { title: 'Evening Views', time: '07:00 PM', notes: 'Enjoy sunset views from the best vantage point.' }
    ],
    day2: [
      { title: 'Cultural Site Visit', time: '10:00 AM', notes: 'Immerse yourself in local history and culture.' },
      { title: 'Shopping District', time: '02:00 PM', notes: 'Browse local markets and shops for souvenirs.' }
    ]
  }
};

function getCityImage(cityName: string): string {
  const key = Object.keys(CITY_IMAGES).find(k => cityName?.toLowerCase().includes(k.toLowerCase()));
  return key ? CITY_IMAGES[key] : CITY_IMAGES.default;
}

function getActivityImage(activityTitle: string): string {
  const title = activityTitle.toLowerCase();
  const key = Object.keys(ACTIVITY_IMAGES).find(k => title.includes(k));
  return key ? ACTIVITY_IMAGES[key] : ACTIVITY_IMAGES.default;
}

export default function TripOverview() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { currentTrip, selectTrip, trips } = useTravel();
  const [showCompareModal, setShowCompareModal] = useState(false);

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

  const getCityName = () => {
    return trip.userSelection?.location?.label || trip.destinations[0]?.city || trip.name;
  };

  const cityName = getCityName();

  const getDayCount = () => {
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  const dayCount = getDayCount();

  const getItinerary = () => {
    if (trip.itinerary) {
      return trip.itinerary;
    }

    const hasActivities = trip.activities && trip.activities.length > 0;

    if (!hasActivities) {
      const cityKey = Object.keys(MOCK_ITINERARY_TEMPLATES).find(k =>
        cityName?.toLowerCase().includes(k.toLowerCase())
      );
      const template = cityKey
        ? MOCK_ITINERARY_TEMPLATES[cityKey]
        : MOCK_ITINERARY_TEMPLATES.default;

      const mockItinerary: { [key: string]: any[] } = {};
      Object.keys(template).forEach((dayKey, index) => {
        const dayNumber = index + 1;
        mockItinerary[`Day ${dayNumber}`] = template[dayKey].map((activity: any) => ({
          ...activity,
          id: `mock-${dayNumber}-${activity.title}`,
          dayNumber
        }));
      });
      return mockItinerary;
    }

    const itinerary: { [key: string]: typeof trip.activities } = {};
    for (let i = 1; i <= dayCount; i++) {
      const dayKey = `Day ${i}`;
      itinerary[dayKey] = trip.activities.filter(a => a.dayNumber === i);
    }
    return itinerary;
  };

  const itinerary = getItinerary();

  const plans = [
    {
      type: 'Budget',
      name: `The ${cityName} Backpacker Hostel`,
      price: '$500',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
      description: 'Shared dorms, communal kitchen, perfect for solo travelers',
      features: ['Free WiFi', 'Shared Kitchen', 'Common Areas'],
      color: 'from-green-400 to-green-600'
    },
    {
      type: 'Standard',
      name: `Novotel ${cityName} Central`,
      price: '$1,500',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      description: 'Comfortable rooms, great location, business amenities',
      features: ['Private Room', 'Breakfast Included', 'Pool & Gym'],
      color: 'from-blue-400 to-blue-600'
    },
    {
      type: 'Luxury',
      name: `The Grand ${cityName} Palace`,
      price: '$4,000',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
      description: 'Five-star excellence, spa, rooftop dining, concierge',
      features: ['Suite', 'Spa Access', 'Fine Dining', 'Butler Service'],
      color: 'from-amber-400 to-amber-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 p-4 pb-24">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate('/trips')}
          className="mb-6 flex items-center text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Trips
        </button>

        <div className="relative mb-8 rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={getCityImage(cityName)}
            alt={cityName}
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-5xl font-bold mb-3">{trip.name}</h1>
            <div className="flex items-center text-lg">
              <Calendar className="w-5 h-5 mr-2" />
              <span>
                {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Itinerary</h2>

          <div className="space-y-8">
            {Object.entries(itinerary).map(([day, activities]) => {
              const dayNumber = parseInt(day.replace('Day ', ''));
              return (
                <div key={day} className="relative">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-24 mr-6">
                      <div className="sticky top-4 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl p-4 shadow-lg text-center">
                        <div className="text-3xl font-bold">{dayNumber}</div>
                        <div className="text-sm opacity-90">Day</div>
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      {activities.length === 0 ? (
                        <Card className="p-6 text-center text-gray-500">
                          <p>No activities planned yet</p>
                          <Button
                            onClick={() => navigate(`/trip/${tripId}/day/${dayNumber}`)}
                            variant="secondary"
                            className="mt-3"
                          >
                            Add Activities
                          </Button>
                        </Card>
                      ) : (
                        activities.map((activity, idx) => (
                          <Card key={activity.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                            <div className="md:flex">
                              <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                                <img
                                  src={getActivityImage(activity.title)}
                                  alt={activity.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                              <div className="p-6 md:w-2/3">
                                <div className="flex items-start justify-between mb-3">
                                  <div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{activity.title}</h3>
                                    <div className="flex items-center text-blue-600">
                                      <Clock className="w-4 h-4 mr-2" />
                                      <span className="font-semibold">{activity.time}</span>
                                    </div>
                                  </div>
                                  <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                                    Activity {idx + 1}
                                  </div>
                                </div>
                                {activity.notes && (
                                  <p className="text-gray-700 leading-relaxed mb-3">{activity.notes}</p>
                                )}
                                <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-full flex items-center transition-colors">
                                  <Navigation className="w-3 h-3 mr-1" /> Get Directions
                                </button>
                              </div>
                            </div>
                          </Card>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Button
            onClick={() => navigate(`/trip/${tripId}/map`)}
            variant="secondary"
            className="flex items-center justify-center py-4 text-lg"
          >
            <Map className="w-5 h-5 mr-2" />
            Map View
          </Button>
          <Button
            onClick={() => navigate(`/trip/${tripId}/notes`)}
            variant="secondary"
            className="flex items-center justify-center py-4 text-lg"
          >
            <StickyNote className="w-5 h-5 mr-2" />
            Notes
          </Button>
        </div>
      </div>

      <button
        onClick={() => setShowCompareModal(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2 font-bold text-lg hover:scale-110 z-50 animate-pulse"
      >
        <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '3s' }} />
        Compare Plans
      </button>

      {showCompareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-3xl">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Compare Accommodation Plans</h2>
                <p className="text-gray-600 mt-1">Choose the perfect option for your {cityName} adventure</p>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <Card
                  key={plan.type}
                  className={`overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
                    index === 1 ? 'border-2 border-blue-500 relative' : ''
                  }`}
                >
                  {index === 1 && (
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold z-10">
                      RECOMMENDED
                    </div>
                  )}
                  <div className={`h-3 bg-gradient-to-r ${plan.color}`} />
                  <div className="relative h-56">
                    <img
                      src={plan.image}
                      alt={plan.name}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute top-4 right-4 bg-gradient-to-r ${plan.color} text-white px-4 py-2 rounded-full font-bold shadow-lg`}>
                      {plan.type}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="text-3xl font-bold text-gray-800">{plan.price}</span>
                      <span className="text-gray-500 text-sm">/ total trip</span>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">{plan.description}</p>

                    <div className="space-y-2 mb-6">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${plan.color}`} />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Button
                      className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90`}
                    >
                      Select {plan.type}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
