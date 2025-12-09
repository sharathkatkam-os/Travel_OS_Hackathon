import { createContext, useContext, useState, ReactNode } from 'react';

export interface Activity {
  id: string;
  title: string;
  time: string;
  notes: string;
  dayNumber: number;
}

export interface Destination {
  id: string;
  city: string;
  notes: string;
}

export interface Note {
  id: string;
  content: string;
  tripId: string;
}

export interface Trip {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  destinations: Destination[];
  activities: Activity[];
  notes: string;
  userSelection?: {
    location?: {
      label: string;
    };
    budget?: string;
  };
  itinerary?: {
    [key: string]: Activity[];
  };
}

interface User {
  name: string;
  email: string;
}

interface TravelContextType {
  user: User | null;
  trips: Trip[];
  currentTrip: Trip | null;
  signUp: (name: string, email: string, password: string) => void;
  addTrip: (trip: Omit<Trip, 'id' | 'destinations' | 'activities' | 'notes'>) => void;
  selectTrip: (tripId: string) => void;
  addDestination: (tripId: string, destination: Omit<Destination, 'id'>) => void;
  addActivity: (tripId: string, activity: Omit<Activity, 'id'>) => void;
  updateTripNotes: (tripId: string, notes: string) => void;
  allNotes: Note[];
  addNote: (tripId: string, content: string) => void;
  updateNote: (noteId: string, content: string) => void;
}

const TravelContext = createContext<TravelContextType | undefined>(undefined);

export function TravelProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const [allNotes, setAllNotes] = useState<Note[]>([]);

  const signUp = (name: string, email: string, _password: string) => {
    setUser({ name, email });
  };

  const addTrip = (tripData: Omit<Trip, 'id' | 'destinations' | 'activities' | 'notes'>) => {
    const newTrip: Trip = {
      ...tripData,
      id: Date.now().toString(),
      destinations: [],
      activities: [],
      notes: ''
    };
    setTrips([...trips, newTrip]);
  };

  const selectTrip = (tripId: string) => {
    const trip = trips.find(t => t.id === tripId);
    setCurrentTrip(trip || null);
  };

  const addDestination = (tripId: string, destinationData: Omit<Destination, 'id'>) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        const newDestination: Destination = {
          ...destinationData,
          id: Date.now().toString()
        };
        return {
          ...trip,
          destinations: [...trip.destinations, newDestination]
        };
      }
      return trip;
    }));

    if (currentTrip?.id === tripId) {
      const updatedTrip = trips.find(t => t.id === tripId);
      if (updatedTrip) setCurrentTrip(updatedTrip);
    }
  };

  const addActivity = (tripId: string, activityData: Omit<Activity, 'id'>) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        const newActivity: Activity = {
          ...activityData,
          id: Date.now().toString()
        };
        return {
          ...trip,
          activities: [...trip.activities, newActivity]
        };
      }
      return trip;
    }));

    if (currentTrip?.id === tripId) {
      const updatedTrip = trips.find(t => t.id === tripId);
      if (updatedTrip) setCurrentTrip(updatedTrip);
    }
  };

  const updateTripNotes = (tripId: string, notes: string) => {
    setTrips(trips.map(trip => {
      if (trip.id === tripId) {
        return { ...trip, notes };
      }
      return trip;
    }));

    if (currentTrip?.id === tripId) {
      setCurrentTrip({ ...currentTrip, notes });
    }
  };

  const addNote = (tripId: string, content: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      content,
      tripId
    };
    setAllNotes([...allNotes, newNote]);
  };

  const updateNote = (noteId: string, content: string) => {
    setAllNotes(allNotes.map(note =>
      note.id === noteId ? { ...note, content } : note
    ));
  };

  return (
    <TravelContext.Provider
      value={{
        user,
        trips,
        currentTrip,
        signUp,
        addTrip,
        selectTrip,
        addDestination,
        addActivity,
        updateTripNotes,
        allNotes,
        addNote,
        updateNote
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
