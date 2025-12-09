/*
  # Create trips and activities schema

  1. New Tables
    - `trips` - stores trip information
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `name` (text)
      - `destination` (text)
      - `start_date` (date)
      - `end_date` (date)
      - `created_at` (timestamp)
    - `destinations` - stores destinations for each trip
      - `id` (uuid, primary key)
      - `trip_id` (uuid, foreign key)
      - `name` (text)
      - `latitude` (numeric)
      - `longitude` (numeric)
      - `created_at` (timestamp)
    - `activities` - stores activities for each day
      - `id` (uuid, primary key)
      - `trip_id` (uuid, foreign key)
      - `day_number` (integer)
      - `title` (text)
      - `time` (time)
      - `notes` (text)
      - `created_at` (timestamp)
    - `trip_notes` - stores notes for trips
      - `id` (uuid, primary key)
      - `trip_id` (uuid, foreign key)
      - `content` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

CREATE TABLE IF NOT EXISTS trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  destination text,
  start_date date,
  end_date date,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS destinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  name text NOT NULL,
  latitude numeric,
  longitude numeric,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  day_number integer NOT NULL,
  title text NOT NULL,
  time text,
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS trip_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  content text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE trip_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own trips"
  ON trips FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create trips"
  ON trips FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own trips"
  ON trips FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own trips"
  ON trips FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view destinations of their trips"
  ON destinations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM trips WHERE trips.id = destinations.trip_id AND trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create destinations for their trips"
  ON destinations FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM trips WHERE trips.id = destinations.trip_id AND trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update destinations of their trips"
  ON destinations FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM trips WHERE trips.id = destinations.trip_id AND trips.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM trips WHERE trips.id = destinations.trip_id AND trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete destinations of their trips"
  ON destinations FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM trips WHERE trips.id = destinations.trip_id AND trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view activities of their trips"
  ON activities FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM trips WHERE trips.id = activities.trip_id AND trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create activities for their trips"
  ON activities FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM trips WHERE trips.id = activities.trip_id AND trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update activities of their trips"
  ON activities FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM trips WHERE trips.id = activities.trip_id AND trips.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM trips WHERE trips.id = activities.trip_id AND trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete activities of their trips"
  ON activities FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM trips WHERE trips.id = activities.trip_id AND trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view notes of their trips"
  ON trip_notes FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM trips WHERE trips.id = trip_notes.trip_id AND trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create notes for their trips"
  ON trip_notes FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM trips WHERE trips.id = trip_notes.trip_id AND trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update notes of their trips"
  ON trip_notes FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM trips WHERE trips.id = trip_notes.trip_id AND trips.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM trips WHERE trips.id = trip_notes.trip_id AND trips.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete notes of their trips"
  ON trip_notes FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM trips WHERE trips.id = trip_notes.trip_id AND trips.user_id = auth.uid()
    )
  );