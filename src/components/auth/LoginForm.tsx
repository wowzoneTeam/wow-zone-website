import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Loader } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (user) {
        // تأكد من وجود سجل في جدول profiles
        const { error: profileError } = await supabase.from('profiles').upsert(
          {
            id: user.id,
            email: user.email,
            first_name: user.user_metadata?.given_name || null,
            last_name: user.user_metadata?.family_name || null,
          },
          { onConflict: 'id' }
        );

        if (profileError) throw profileError;

        const { data: profile, error: fetchProfileError } = await supabase
          .from('profiles')
          .select('is_admin, first_name, last_name')
          .eq('id', user.id)
          .single();

        if (fetchProfileError) throw fetchProfileError;

        setSuccess('Logged in successfully! Redirecting...');

        if (!profile.first_name || !profile.last_name) {
          setTimeout(() => {
            navigate('/complete-profile');
          }, 1500);
        } else {
          setTimeout(() => {
            if (profile?.is_admin) {
              navigate('/admin');
            } else {
              navigate('/dashboard');
            }
          }, 1500);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
            required
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
            required
          />
        </div>
      </div>

      {error && (
        <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="text-green-400 text-sm bg-green-500/10 p-3 rounded-lg">
          {success}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            <span>Logging in...</span>
          </>
        ) : (
          <span>Log In</span>
        )}
      </button>

      <p className="text-center text-gray-400 text-sm">
        Don't have an account?{' '}
        <Link to="/signup" className="text-purple-400 hover:text-purple-300">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;