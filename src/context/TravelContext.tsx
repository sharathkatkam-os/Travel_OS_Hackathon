import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export interface Activity {
  id: string;
  title: string;
  time: string;
  notes?: string;
  dayNumber: number;
  trip_id?: string;
}

export interface Destination {
  id: string;
  city?: string;
  name?: string;
  notes?: string;
  latitude?: number;
  longitude?: number;
}

export interface Note {
  id: string;
  content: string;
  tripId: string;
}

export interface Trip {
  id: string;
  name: string;
  startDate?: string;
  start_date?: string;
  endDate?: string;
  end_date?: string;
  destination?: string;
  destinations?: Destination[];
  activities: Activity[];
  notes?: string;
}

interface User {
  id: string;
  email: string;
}

interface TravelContextType {
  user: User | null;
  trips: Trip[];
  currentTrip: Trip | null;
  setUser: (user: User | null) => void;
  addTrip: (trip: Omit<Trip, 'id' | 'destinations' | 'activities' | 'notes'>) => Promise<void>;
  selectTrip: (tripId: string) => void;
  addDestination: (tripId: string, destination: Omit<Destination, 'id'>) => Promise<void>;
  addActivity: (tripId: string, activity: Omit<Activity, 'id'>) => Promise<void>;
  updateTripNotes: (tripId: string, notes: string) => Promise<void>;
  allNotes: Note[];
  addNote: (tripId: string, content: string) => Promise<void>;
  updateNote: (noteId: string, content: string) => Promise<void>;
  loadTrips: () => Promise<void>;
}

const TravelContext = createContext<TravelContextType | undefined>(undefined);

export function TravelProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const [allNotes, setAllNotes] = useState<Note[]>([]);

  const loadTrips = async () => {
    if (!user) return;

    const { data: tripsData } = await supabase
      .from('trips')
      .select('*')
      .eq('user_id', user.id);

    if (tripsData) {
      const tripsWithActivities: Trip[] = await Promise.all(
        tripsData.map(async (trip) => {
          const { data: activities } = await supabase
            .from('activities')
            .select('*')
            .eq('trip_id', trip.id);

          return {
            id: trip.id,
            name: trip.name,
            start_date: trip.start_date,
            end_date: trip.end_date,
            destination: trip.destination,
            activities: (activities || []).map(a => ({
              id: a.id,
              title: a.title,
              time: a.time,
              notes: a.notes,
              dayNumber: a.day_number,
              trip_id: a.trip_id
            })),
            destinations: []
          };
        })
      );
      setTrips(tripsWithActivities);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email || '' });
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        if (session?.user) {
          setUser({ id: session.user.id, email: session.user.email || '' });
        } else {
          setUser(null);
        }
      })();
    });

    return () => subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      loadTrips();
    }
  }, [user]);

  const addTrip = async (tripData: Omit<Trip, 'id' | 'destinations' | 'activities' | 'notes'>) => {
    if (!user) return;

    const { error } = await supabase.from('trips').insert({
      user_id: user.id,
      name: tripData.name,
      start_date: tripData.startDate || tripData.start_date,
      end_date: tripData.endDate || tripData.end_date,
      destination: tripData.destination
    });

    if (!error) {
      await loadTrips();
    }
  };

  const selectTrip = (tripId: string) => {
    const trip = trips.find(t => t.id === tripId);
    setCurrentTrip(trip || null);
  };

  const addDestination = async (tripId: string, destinationData: Omit<Destination, 'id'>) => {
    await supabase.from('destinations').insert({
      trip_id: tripId,
      name: destinationData.name || destinationData.city,
      latitude: destinationData.latitude,
      longitude: destinationData.longitude
    });
  };

  const addActivity = async (tripId: string, activityData: Omit<Activity, 'id'>) => {
    const { error } = await supabase.from('activities').insert({
      trip_id: tripId,
      day_number: activityData.dayNumber,
      title: activityData.title,
      time: activityData.time,
      notes: activityData.notes
    });

    if (!error) {
      await loadTrips();
    }
  };

  const updateTripNotes = async (tripId: string, notes: string) => {
    await supabase.from('trip_notes').insert({
      trip_id: tripId,
      content: notes
    });
  };

  const addNote = async (tripId: string, content: string) => {
    const { error } = await supabase.from('trip_notes').insert({
      trip_id: tripId,
      content
    });

    if (!error) {
      const newNote: Note = {
        id: Date.now().toString(),
        content,
        tripId
      };
      setAllNotes([...allNotes, newNote]);
    }
  };

  const updateNote = async (_noteId: string, _content: string) => {
    setAllNotes(allNotes.map(note =>
      note.id === _noteId ? { ...note, content: _content } : note
    ));
  };

  return (
    <TravelContext.Provider
      value={{
        user,
        trips,
        currentTrip,
        setUser,
        addTrip,
        selectTrip,
        addDestination,
        addActivity,
        updateTripNotes,
        allNotes,
        addNote,
        updateNote,
        loadTrips
      }}
    >
      {children}
    </TravelContext.Provider>
  );
}

export function useTravel() {
  const context = useContext(TravelContext);
  if (context === undefined) {
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
}
