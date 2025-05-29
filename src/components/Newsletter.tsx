import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const getSuccessMessage = () => {
    const messages = [
      'Welcome aboard the creative journey! 🎉 Thank you for joining us.',
      'You’re now part of our vibrant community! 🌟 Thanks for subscribing.',
      'Thrilled to have you with us! 🚀 Your subscription is confirmed.',
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getExistingMessage = () => {
    const messages = [
      'You’re already a cherished member of our creative family! 😊 No need to subscribe again.',
      'Looks like you’re already in the loop! 🎨 Stay tuned for more.',
      'We’ve got you covered! 🙌 You’re already subscribed—enjoy the ride!',
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getErrorMessage = () => {
    const messages = [
      'Oops! Something went awry. Please try again or reach out to our team. 😔',
      'It seems we hit a snag. Let’s give it another go! 🙏',
      'A little hiccup occurred. Please check your email and try again. 🌱',
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    if (!supabase) {
      setStatus('error');
      setMessage('Oh no! We’re having trouble connecting. Please try again later.');
      return;
    }

    try {
      const { data: existingEmail, error: checkError } = await supabase
        .from('newsletter_subscribers')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (checkError) {
        setStatus('error');
        setMessage(getErrorMessage());
        return;
      }

      if (existingEmail) {
        setStatus('error');
        setMessage(getExistingMessage());
        return;
      }

      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email });

      if (error) {
        setStatus('error');
        if (error.code === '42501') {
          setMessage('It seems our security settings need a tweak. Please contact support.');
        } else if (error.code === '23505') {
          setMessage(getExistingMessage());
        } else {
          setMessage(getErrorMessage());
        }
        return;
      }

      setStatus('success');
      setMessage(getSuccessMessage());
      setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage(getErrorMessage());
    } finally {
      setTimeout(() => setStatus('idle'), 3000); // Reset status after 3 seconds
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-gray-950 via-indigo-950 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(147,51,234,0.1),transparent)] opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.1),transparent)] opacity-40"></div>

      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.5)]"
          >
            <Mail className="w-10 h-10 text-white animate-pulse" />
          </motion.div>
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600 drop-shadow-[0_0_15px_rgba(147,51,234,0.7)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join the Creative Revolution
          </motion.h2>
          <motion.p
            className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Be the first to dive into exclusive updates, immersive experiences, and inspiring events. Let’s create something extraordinary together!
          </motion.p>
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full sm:w-auto flex-1 px-6 py-4 bg-black/60 backdrop-blur-md border border-indigo-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
              required
              disabled={status === 'loading'}
              whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(147,51,234,0.5)" }}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(236,72,153,0.7)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Joining...' : 'Join Now'}
            </motion.button>
          </motion.form>
          {message && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className={`mt-6 text-base sm:text-lg px-4 py-3 rounded-xl max-w-md mx-auto ${
                status === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}
            >
              {message}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;