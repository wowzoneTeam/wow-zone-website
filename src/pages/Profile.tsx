import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    address: '',
    email: '',
    avatar_url: '',
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
          const { data: existingProfile, error: fetchError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (fetchError && fetchError.code === 'PGRST116') {
            const { error: insertError } = await supabase.from('profiles').insert({
              id: user.id,
              email: user.email,
              first_name: user.user_metadata?.given_name || '',
              last_name: user.user_metadata?.family_name || '',
              avatar_url: user.user_metadata?.picture || '',
            });

            if (insertError) throw insertError;

            const { data: newProfile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', user.id)
              .single();

            setProfile({
              ...profile,
              ...newProfile,
              email: user.email,
            });
          } else if (fetchError) {
            throw fetchError;
          } else {
            setProfile({
              ...profile,
              ...existingProfile,
              email: user.email,
            });
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}.${fileExt}`;
    const filePath = `profile-avatars/${fileName}`;

    setLoading(true);
    setError(null);

    try {
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setProfile((prev) => ({ ...prev, avatar_url: publicUrl }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload error');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarDelete = async () => {
    if (!user || !profile.avatar_url) return;
    const pathParts = profile.avatar_url.split('/');
    const fileName = pathParts[pathParts.length - 1];
    const filePath = `profile-avatars/${fileName}`;

    setLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase.storage
        .from('avatars')
        .remove([filePath]);

      if (deleteError) throw deleteError;

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: '' })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setProfile((prev) => ({ ...prev, avatar_url: '' }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', user.id);

      if (error) throw error;

      setEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-950 to-black text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
          className="text-5xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  const initials = `${profile.first_name?.[0] || 'U'}${profile.last_name?.[0] || 'P'}`.toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black text-white py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.2),transparent)] opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(147,51,234,0.1),transparent)] opacity-40"></div>

      <div className="container mx-auto relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -80, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: 'backOut' }}
          className="text-5xl sm:text-7xl font-extrabold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-500 to-purple-600 tracking-tight shadow-lg drop-shadow-[0_0_20px_rgba(147,51,234,0.5)]"
        >
          Your WOW Profile
        </motion.h1>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-400 text-center mb-12 text-lg font-semibold bg-red-900/40 p-5 rounded-2xl max-w-xl mx-auto shadow-xl backdrop-blur-sm border border-red-500/20"
          >
            {error}
          </motion.p>
        )}

        <AnimatePresence mode="wait">
          {!editing ? (
            <motion.div
              key="view-mode"
              initial={{ opacity: 0, y: 40, rotateX: 90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: 40, rotateX: -90 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="max-w-3xl mx-auto bg-gray-800/50 p-12 rounded-3xl shadow-2xl border border-indigo-700/30 backdrop-blur-lg hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-all duration-500"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex flex-col items-center space-y-10">
                {profile.avatar_url ? (
                  <motion.img
                    src={profile.avatar_url}
                    alt="Avatar"
                    className="w-48 h-48 rounded-full object-cover shadow-2xl ring-4 ring-indigo-500/50 transition-all duration-300 hover:scale-110 hover:ring-purple-600/50"
                    initial={{ scale: 0.7, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                ) : (
                  <motion.div
                    className="w-48 h-48 rounded-full bg-gradient-to-br from-indigo-700 via-purple-800 to-indigo-900 flex items-center justify-center text-6xl font-extrabold text-white shadow-2xl ring-4 ring-purple-600/40"
                    initial={{ scale: 0.8, rotate: 180 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
                  >
                    {initials}
                  </motion.div>
                )}
                <div className="w-full space-y-6">
                  <ProfileItem label="First Name" value={profile.first_name} />
                  <ProfileItem label="Last Name" value={profile.last_name} />
                  <ProfileItem label="Date of Birth" value={profile.date_of_birth} />
                  <ProfileItem label="Address" value={profile.address} />
                  <ProfileItem label="Email" value={profile.email} />
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(147,51,234,0.7)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEditing(true)}
                  className="mt-10 py-4 px-12 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-2xl font-bold text-xl shadow-2xl hover:bg-indigo-700 transition-all duration-300"
                >
                  Edit Profile
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="edit-mode"
              initial={{ opacity: 0, y: 40, rotateX: 90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: 40, rotateX: -90 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              onSubmit={handleSubmit}
              className="max-w-3xl mx-auto bg-gray-800/50 p-12 rounded-3xl shadow-2xl border border-indigo-700/30 backdrop-blur-lg hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-all duration-500"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {['first_name', 'last_name', 'date_of_birth', 'address'].map((field) => (
                <div key={field} className="space-y-2">
                  <label className="block text-sm font-medium text-indigo-300 mb-2 capitalize">
                    {field.replace('_', ' ')}
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.03, borderColor: '#9333ea', boxShadow: '0 0 10px rgba(147,51,234,0.5)' }}
                    type={field === 'date_of_birth' ? 'date' : 'text'}
                    name={field}
                    value={profile[field]}
                    onChange={handleInputChange}
                    className="w-full p-5 bg-gray-900/70 rounded-xl text-white border border-gray-700 focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-400"
                    disabled={loading}
                    placeholder={`Enter your ${field.replace('_', ' ')}`}
                  />
                </div>
              ))}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-indigo-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  disabled
                  className="w-full p-5 bg-gray-900/70 rounded-xl text-white border border-gray-700 opacity-70 cursor-not-allowed"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-indigo-300 mb-2">Upload Avatar</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="text-sm text-white bg-transparent border border-gray-700 rounded-xl p-2.5 cursor-pointer file:mr-6 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-indigo-600 file:to-purple-700 file:text-white hover:file:from-indigo-700 hover:file:to-purple-800 transition-all duration-300"
                  disabled={loading}
                />
                {profile.avatar_url && (
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: '#dc2626' }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleAvatarDelete}
                    className="mt-4 text-sm bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl transition-all duration-300"
                  >
                    Delete Avatar
                  </motion.button>
                )}
              </div>
              <div className="flex justify-center space-x-6 mt-8">
                <motion.button
                  whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(147,51,234,0.7)' }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="py-4 px-12 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-2xl font-bold text-xl shadow-2xl hover:bg-indigo-700 transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(75,85,99,0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setEditing(false)}
                  className="py-4 px-12 bg-gray-700 hover:bg-gray-800 text-white rounded-2xl font-bold text-xl shadow-lg transition-all duration-300"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ProfileItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-4 px-6 bg-gray-900/40 rounded-xl shadow-md hover:bg-gray-900/60 transition-all duration-300">
    <span className="font-semibold text-indigo-300 text-lg">{label}:</span>
    <span className="text-white text-lg">{value || 'Not provided'}</span>
  </div>
);

export default Profile;