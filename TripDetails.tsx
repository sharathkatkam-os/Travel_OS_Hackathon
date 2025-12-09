import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Clock, Star, Calendar, DollarSign, X, Check, Map, ArrowLeft } from 'lucide-react';

// --- RELIABLE FALLBACK IMAGE (Since dynamic links are blocked) ---
const GENERIC_IMAGE = 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=600&q=80'; // Reliable street photo

// --- THE PERSONALIZED CITY DATABASE ---
const CITY_DATA: any = {
  'jammu': {
    name: 'Jammu',
    header: 'https://images.unsplash.com/photo-1566808994993-29a39f401956?w=1200&q=80',
    description: 'The City of Temples',
    day1: [
      { time: '09:00 AM', place: 'Raghunath Bazaar', details: 'Historic dry fruit market.' },
      { time: '01:00 PM', place: 'Pahalwan di Hatti', details: 'Famous Chole Bhature and sweets.' },
      { time: '06:00 PM', place: 'Bahu Fort Sunset', details: 'Spectacular views over the Tawi river.' }
    ],
    day2: [
      { time: '08:00 AM', place: 'Mata Vaishno Devi Trek', details: 'Spiritual mountain journey.' },
      { time: '02:00 PM', place: 'Amar Mahal Palace', details: 'Museum housed in a stunning palace.' }
    ]
  },
  'paris': {
    name: 'Paris',
    header: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80',
    description: 'The City of Lights',
    day1: [
      { time: '09:00 AM', place: 'Eiffel Tower', details: 'Iconic views from the Champ de Mars.' },
      { time: '01:00 PM', place: 'Le Petit Cler', details: 'Classic French bistro lunch.' },
      { time: '08:00 PM', place: 'Seine River Cruise', details: 'Magical evening boat ride.' }
    ],
    day2: [
      { time: '10:00 AM', place: 'Louvre Museum', details: 'Home of the Mona Lisa.' },
      { time: '03:00 PM', place: 'Montmartre Art Walk', details: 'Visit the Sacré-Cœur and artists square.' }
    ]
  },
  'default': {
    name: 'City',
    header: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80',
    description: 'Adventure Awaits',
    day1: [
      { time: '09:00 AM', place: 'Main City Square', details: 'Walking tour of the historic center.' },
      { time: '01:00 PM', place: 'Local Restaurant', details: 'Taste the authentic flavors of the region.' },
      { time: '07:00 PM', place: 'Sunset Viewpoint', details: 'Panoramic views of the city skyline.' }
    ],
    day2: [
      { time: '10:00 AM', place: 'National Museum', details: 'Dive deep into local art and history.' },
      { time: '02:00 PM', place: 'Central Market', details: 'Shopping for unique souvenirs.' }
    ]
  }
};

function getTripData(rawCityName: string) {
  const cleanName = rawCityName.toLowerCase().trim();
  // We check for Jammu, Paris, or fall back to default
  if (CITY_DATA[cleanName]) {
    return CITY_DATA[cleanName];
  }
  
  // Return default data but update the name property
  const defaultData = { ...CITY_DATA.default, name: rawCityName };
  return defaultData;
}


export default function TripDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showCompare, setShowCompare] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const rawCity = location.state?.city || 'Jammu';
  const data = getTripData(rawCity);

  // --- GOOGLE MAPS FUNCTIONALITY ---
  const openMaps = (placeName: string) => {
    // This is the official link that opens the app on mobile and the web link on desktop.
    const query = encodeURIComponent(`${placeName}, ${data.name}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className='min-h-screen bg-gray-50 pb-32'>

      {/* HEADER */}
      <div className='relative h-[400px] group'>
        <img src={data.header} className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105' alt={data.name} />
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent' />
        <div className='absolute bottom-0 left-0 w-full p-8 md:p-12'>
          <div className='max-w-5xl mx-auto'>
            <button onClick={() => navigate(-1)} className='mb-4 flex items-center text-white/90 hover:text-white transition-colors'>
              <ArrowLeft className='w-5 h-5 mr-2' />
              Back
            </button>
            <div className='text-white'>
              <h1 className='text-5xl font-bold mb-2'>{data.name} Adventure</h1>
              <p className='text-lg opacity-90 mb-4'>{data.description}</p>
              <div className='flex flex-wrap items-center gap-4 text-sm'>
                <span className='flex items-center bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm'>
                  <Calendar className='w-4 h-4 mr-2' /> 5 Days
                </span>
                <span className='flex items-center bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm'>
                  <DollarSign className='w-4 h-4 mr-2' /> Medium Budget
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ITINERARY */}
      <div className='max-w-5xl mx-auto p-6 -mt-20 relative z-10'>
        
        {/* Day 1 */}
        <div className='mb-12'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center'>
            <span className='bg-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center text-lg mr-4 shadow-lg'>1</span>
            Day 1: Arrival & Discovery
          </h2>
          <div className='grid md:grid-cols-3 gap-6'>
            {data.day1.map((item: any, index: number) => (
              <div key={index} className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300'>
                <div className='h-48 overflow-hidden relative'>
                  {/* SIMPLE, RELIABLE IMAGE LINK */}
                  <img src={GENERIC_IMAGE} className='w-full h-full object-cover transition-transform duration-500' alt={item.place} />
                  <div className='absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-blue-800 shadow-sm'>
                    {item.time}
                  </div>
                </div>
                <div className='p-5'>
                  <h3 className='font-bold text-xl text-gray-900 mb-2'>{item.place}</h3>
                  <p className='text-gray-500 text-sm mb-6'>{item.details}</p>
                  <button 
                    onClick={() => openMaps(item.place)} // WIRED UP MAPS LINK
                    className='w-full py-2.5 bg-gray-50 hover:bg-blue-50 text-blue-600 rounded-xl font-medium border border-gray-200'
                  >
                    <Map className='w-4 h-4 mr-2' /> Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Day 2 */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6 flex items-center'>
            <span className='bg-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center text-lg mr-4 shadow-lg'>2</span>
            Day 2: Exploration
          </h2>
          <div className='grid md:grid-cols-2 gap-6'>
            {data.day2.map((item: any, index: number) => (
              <div key={index} className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300'>
                <div className='h-48 overflow-hidden relative'>
                  <img src={GENERIC_IMAGE} className='w-full h-full object-cover transition-transform duration-500' alt={item.place} />
                  <div className='absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-blue-800 shadow-sm'>10:00 AM</div>
                </div>
                <div className='p-5'>
                  <h3 className='font-bold text-xl text-gray-900 mb-2'>{item.place}</h3>
                  <p className='text-gray-500 text-sm mb-6'>{item.details}</p>
                  <button onClick={() => openMaps(item.place)} className='w-full py-2.5 bg-gray-50 hover:bg-blue-50 text-blue-600 rounded-xl font-medium border border-gray-200'>
                    <Map className='w-4 h-4 mr-2' /> Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ... (Modal code remains the same) ... */}
      
      <button onClick={() => setShowCompare(true)} className='fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center font-bold z-40 border-2 border-white/20 animate-bounce'>
        <Star className='w-5 h-5 mr-2 fill-yellow-400 text-yellow-400' /> Compare Plans
      </button>

      {showCompare && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200'>
          <div className='bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-8 relative shadow-2xl'>
            <button onClick={() => setShowCompare(false)} className='absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors'>
              <X className='w-5 h-5' />
            </button>
            <div className='text-center mb-10'>
              <h2 className='text-3xl font-bold text-gray-900'>Upgrade Your Experience</h2>
              <p className='text-gray-500 mt-2'>Unlock exclusive perks for your {data.name} trip</p>
            </div>
            <div className='grid md:grid-cols-3 gap-6'>
              <div className='border border-gray-200 rounded-2xl p-6 hover:border-blue-500 hover:shadow-lg transition-all'>
                <div className='text-lg font-bold mb-2 text-gray-600'>Backpacker</div>
                <div className='text-4xl font-bold text-gray-900 mb-6'>$850</div>
                <ul className='space-y-4 mb-8'>
                  <li className='flex items-center text-sm text-gray-600'>
                    <Check className='w-5 h-5 text-green-500 mr-3 flex-shrink-0' />
                    City Hostel (Shared)
                  </li>
                  <li className='flex items-center text-sm text-gray-600'>
                    <Check className='w-5 h-5 text-green-500 mr-3 flex-shrink-0' />
                    Metro Pass
                  </li>
                  <li className='flex items-center text-sm text-gray-600'>
                    <Check className='w-5 h-5 text-green-500 mr-3 flex-shrink-0' />
                    Audio Guide
                  </li>
                </ul>
                <button
                  onClick={() => { setShowCompare(false); setShowSuccess(true); }}
                  className='w-full py-3 bg-gray-100 font-bold rounded-xl hover:bg-gray-200 transition-colors'
                >
                  Select Basic
                </button>
              </div>

              <div className='border-2 border-blue-600 rounded-2xl p-6 relative bg-blue-50/30 transform scale-105 shadow-xl'>
                <div className='absolute top-0 right-0 bg-blue-600 text-white text-xs px-4 py-1.5 rounded-bl-xl font-bold uppercase tracking-wider'>
                  Popular
                </div>
                <div className='text-lg font-bold mb-2 text-blue-700'>Explorer</div>
                <div className='text-4xl font-bold text-gray-900 mb-6'>$1,500</div>
                <ul className='space-y-4 mb-8'>
                  <li className='flex items-center text-sm text-gray-700'>
                    <Check className='w-5 h-5 text-blue-600 mr-3 flex-shrink-0' />
                    4-Star Hotel Center
                  </li>
                  <li className='flex items-center text-sm text-gray-700'>
                    <Check className='w-5 h-5 text-blue-600 mr-3 flex-shrink-0' />
                    River Cruise Tickets
                  </li>
                  <li className='flex items-center text-sm text-gray-700'>
                    <Check className='w-5 h-5 text-blue-600 mr-3 flex-shrink-0' />
                    Museum Fast Pass
                  </li>
                </ul>
                <button
                  onClick={() => { setShowCompare(false); setShowSuccess(true); }}
                  className='w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200'
                >
                  Select Standard
                </button>
              </div>

              <div className='border border-gray-200 rounded-2xl p-6 hover:border-purple-500 hover:shadow-lg transition-all'>
                <div className='text-lg font-bold mb-2 text-purple-700'>VIP Luxury</div>
                <div className='text-4xl font-bold text-gray-900 mb-6'>$3,200</div>
                <ul className='space-y-4 mb-8'>
                  <li className='flex items-center text-sm text-gray-600'>
                    <Check className='w-5 h-5 text-purple-500 mr-3 flex-shrink-0' />
                    5-Star Resort Suite
                  </li>
                  <li className='flex items-center text-sm text-gray-600'>
                    <Check className='w-5 h-5 text-purple-500 mr-3 flex-shrink-0' />
                    Private Chauffeur
                  </li>
                  <li className='flex items-center text-sm text-gray-600'>
                    <Check className='w-5 h-5 text-purple-500 mr-3 flex-shrink-0' />
                    Michelin Dinner
                  </li>
                </ul>
                <button
                  onClick={() => { setShowCompare(false); setShowSuccess(true); }}
                  className='w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors'
                >
                  Select VIP
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showSuccess && (
        <div className='fixed inset-0 bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 z-[60] flex items-center justify-center animate-in fade-in zoom-in duration-500'>
          <div className='text-center text-white p-8 max-w-md mx-auto'>
            <div className='relative mb-8'>
              <div className='w-32 h-32 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm animate-bounce shadow-2xl'>
                <div className='w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl'>
                  <Check className='w-16 h-16 text-green-500 animate-in zoom-in duration-700' strokeWidth={3} />
                </div>
              </div>
            </div>

            <h2 className='text-5xl font-bold mb-3 animate-in slide-in-from-bottom duration-500'>
              Trip Successfully Booked!
            </h2>
            <p className='text-xl opacity-95 mb-8 animate-in slide-in-from-bottom duration-700'>
              Get ready for an unforgettable adventure in {data.name}!
            </p>

            <button
              onClick={() => setShowSuccess(false)}
              className='bg-white text-green-600 px-10 py-4 rounded-full font-bold shadow-2xl hover:scale-110 hover:shadow-green-300/50 transition-all duration-300 text-lg animate-in slide-in-from-bottom duration-1000'
            >
              Back to Trip
            </button>
          </div>
        </div>
      )}
    </div>
  );
}