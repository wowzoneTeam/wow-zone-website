import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase.ts';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle session after redirect from Google OAuth
  useEffect(() => {
    const handleSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { user } = session;
        if (user) {
          const { email, user_metadata } = user;
          const { given_name, family_name, picture } = user_metadata || {};

          // تخزين البيانات في جدول profiles
          const { error: profileError } = await supabase.from('profiles').upsert(
            {
              id: user.id,
              email: email,
              first_name: given_name || null,
              last_name: family_name || null,
              avatar_url: picture || null,
            },
            { onConflict: 'id' }
          );

          if (profileError) {
            console.error('Error updating profile:', profileError.message);
            setError(profileError.message);
            return;
          }

          // إعادة التوجيه
          navigate('/profile');
        }
      }
    };

    handleSession();
  }, [navigate]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'https://wowzone.co/dashboard',
          scopes: 'profile email openid', // تأكد من تضمين النطاقات اللازمة
        },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
    } catch (error: any) {
      setError('Failed to sign in with Google');
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-black bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage: "url('https://i.ibb.co/Z1pQz2Bm/image21.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 max-w-md w-full p-8 bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-purple-300 mb-6 drop-shadow-lg">
          Sign in to WOW Studio
        </h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form className="space-y-6" onSubmit={handleEmailSignIn}>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex justify-between text-sm text-purple-200">
            <Link to="/forgot-password" className="hover:text-purple-400 transition">
              Forgot your password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition-all"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <span className="bg-white/10 px-4 relative z-10">Or continue with</span>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="mt-6 w-full flex items-center justify-center py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-xl border border-gray-700 transition-all"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.326,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748H12.545z" />
          </svg>
          Sign in with Google
        </button>

        <p className="mt-6 text-center text-sm text-purple-100">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-purple-400 hover:text-purple-500 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;