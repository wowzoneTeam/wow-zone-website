import AuthLayout from '../components/auth/AuthLayout';
import SignUpForm from '../components/auth/SignUpForm';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black bg-cover bg-center relative"
      style={{
        backgroundImage: "url('https://i.ibb.co/KxkTKNNR/image24.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-purple-300 mb-6 drop-shadow-lg">
          Create your WOW Immerve account
        </h2>

        <SignUpForm />

        <p className="mt-6 text-center text-sm text-purple-100">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-purple-400 hover:text-purple-500 transition"
          >
            Sign in
          </Link>
        </p>

        <p className="mt-2 text-center text-sm text-purple-100">
          Forgot your password?{' '}
          <Link
            to="/forgot-password"
            className="font-semibold text-purple-400 hover:text-purple-500 transition"
          >
            Reset it here
          </Link>
        </p>
      </div>
    </div>
  );
}
