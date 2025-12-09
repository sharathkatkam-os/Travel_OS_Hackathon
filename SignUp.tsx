import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { useTravel } from '../context/TravelContext';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signUp } = useTravel();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    signUp(name, email, password);
    navigate('/trips');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg mb-4">
            <Plane className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">TravelCards</h1>
          <p className="text-gray-600">Plan your journey, one card at a time</p>
        </div>

        <Card className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full mt-6">
              Sign Up
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
