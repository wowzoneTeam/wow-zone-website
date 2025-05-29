import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Play, Pause, CheckCircle, AlertCircle } from 'lucide-react';

// Custom styled icons
const EditIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" 
          fill="url(#editGradient)" 
          stroke="url(#editGradient)" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"/>
    <defs>
      <linearGradient id="editGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#60A5FA' }} />
        <stop offset="100%" style={{ stopColor: '#9333EA' }} />
      </linearGradient>
    </defs>
  </svg>
);

const DeleteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H5H21" stroke="url(#deleteGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 6L18.33 19C18.27 20.11 17.38 21 16.27 21H7.73C6.62 21 5.73 20.11 5.67 19L5 6" 
          stroke="url(#deleteGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 11V17" stroke="url(#deleteGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 11V17" stroke="url(#deleteGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="deleteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#F87171' }} />
        <stop offset="100%" style={{ stopColor: '#DC2626' }} />
      </linearGradient>
    </defs>
  </svg>
);

interface MediaItem {
  id: string;
  title: string;
  file_url: string;
  hashtags: string[];
  category: 'Digital Painting' | 'Interactive' | 'Generative' | 'Audio Reactive' | 'Animation Painting';
  type: 'Photo' | 'GIF' | 'Video';
  uploaded_by?: string;
  created_at?: string;
}

interface StudioLibraryProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
}

const StudioLibrary: React.FC<StudioLibraryProps> = ({ isLoggedIn, isAdmin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MediaItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<MediaItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    file: null as File | null,
    tags: '',
    category: 'Digital Painting' as 'Digital Painting' | 'Interactive' | 'Generative' | 'Audio Reactive' | 'Animation Painting',
    type: 'Photo' as 'Photo' | 'GIF' | 'Video',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [playingVideos, setPlayingVideos] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchMediaItems();
  }, []);

  const fetchMediaItems = async () => {
    const { data, error } = await supabase.from('library_items').select('*');
    if (error) {
      setError(`Failed to fetch media items: ${error.message}`);
      return;
    }
    setMediaItems(data || []);
    applyFilters(data || [], searchQuery, selectedCategory, selectedType);
  };

  const applyFilters = (items: MediaItem[], query: string, category: string, type: string) => {
    let filtered = [...items];

    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter((item) =>
        item.hashtags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    }

    if (category !== 'All') {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (type !== 'All') {
      filtered = filtered.filter((item) => item.type === type);
    }

    setFilteredItems(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(mediaItems, query, selectedCategory, selectedType);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    applyFilters(mediaItems, searchQuery, category, selectedType);
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    applyFilters(mediaItems, searchQuery, selectedCategory, type);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file }));
      setError(null);
      setSuccess(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!isAdmin) {
      setError('Only admins can add or edit media items');
      setLoading(false);
      return;
    }

    if (!formData.title.trim()) {
      setError('Title is required');
      setLoading(false);
      return;
    }
    if (!formData.tags.trim()) {
      setError('Tags are required');
      setLoading(false);
      return;
    }
    if (!editItem && !formData.file) {
      setError('File is required');
      setLoading(false);
      return;
    }

    try {
      let fileUrl = editItem?.file_url || '';
      if (formData.file) {
        const fileExt = formData.file.name.split('.').pop();
        fileUrl = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(fileUrl, formData.file, { cacheControl: '3600', upsert: false });
        if (uploadError) throw new Error(`Failed to upload file: ${uploadError.message}`);
        if (editItem && editItem.file_url) await supabase.storage.from('media').remove([editItem.file_url]);
      }

      const { data: { user } } = await supabase.auth.getUser();
      const uploadedBy = user?.id || null;

      const dataToSave = {
        title: formData.title,
        file_url: fileUrl,
        hashtags: formData.tags.split(',').map((tag) => tag.trim()),
        category: formData.category,
        type: formData.type,
        uploaded_by: uploadedBy,
        created_at: new Date().toISOString(),
      };

      if (editItem) {
        const { error: updateError } = await supabase.from('library_items').update(dataToSave).eq('id', editItem.id);
        if (updateError) throw new Error(`Failed to update media item: ${updateError.message}`);
        setSuccess('Media item updated successfully!');
      } else {
        const { error: dbError } = await supabase.from('library_items').insert(dataToSave);
        if (dbError) throw new Error(`Failed to save media item: ${dbError.message}`);
        setSuccess('Media item added successfully!');
      }

      setFormData({ title: '', file: null, tags: '', category: 'Digital Painting', type: 'Photo' });
      setEditItem(null);
      setShowForm(false);
      fetchMediaItems();
    } catch (err: any) {
      setError(err.message);
      if (err.message.includes('schema cache')) {
        setError(`${err.message}. Please ensure the 'library_items' table schema matches the expected fields.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: MediaItem) => {
    if (!isAdmin) return;
    setEditItem(item);
    setFormData({
      title: item.title,
      file: null,
      tags: item.hashtags.join(', '),
      category: item.category,
      type: item.type,
    });
    setShowForm(true);
  };

  const handleDelete = async (item: MediaItem) => {
    if (!isAdmin) return;
    setLoading(true);
    try {
      const { error: dbError } = await supabase.from('library_items').delete().eq('id', item.id);
      if (dbError) throw new Error(`Failed to delete media item: ${dbError.message}`);
      if (item.file_url) {
        const { error: deleteError } = await supabase.storage.from('media').remove([item.file_url]);
        if (deleteError) throw new Error(`Failed to delete file: ${deleteError.message}`);
      }
      setMediaItems((prev) => prev.filter((i) => i.id !== item.id));
      setFilteredItems((prev) => prev.filter((i) => i.id !== item.id));
      setSuccess('Media item deleted successfully!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getPublicUrl = (fileUrl: string) => supabase.storage.from('media').getPublicUrl(fileUrl).data.publicUrl;

  const toggleVideoPlay = (itemId: string) => {
    setPlayingVideos((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleDashboard = () => {
    navigate('/Dashboard');
  };

  const categories = ['All', 'Digital Painting', 'Interactive', 'Generative', 'Audio Reactive', 'Animation Painting'];
  const types = ['All', 'Photo', 'GIF', 'Video'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black text-white py-16 px-6 relative overflow-hidden">
      {/* Dynamic Particle Background */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full opacity-30"
          initial={{ x: Math.random() * 100 + '%', y: Math.random() * 100 + '%', scale: 0.5 }}
          animate={{ scale: [0.5, 1.2, 0.5], opacity: [0.3, 0.6, 0.3], x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
          transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.2),transparent)] opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(147,51,234,0.1),transparent)] opacity-40"></div>

      <div className="container mx-auto relative z-10">
        <motion.h1
          className="text-5xl sm:text-6xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600 tracking-tight drop-shadow-[0_0_30px_rgba(147,51,234,0.7)]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          Studio Library
        </motion.h1>

        {/* Search and Filters */}
        <div className="mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <motion.input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by tags..."
              className="w-full p-4 pl-12 bg-gray-800/70 backdrop-blur-lg border border-indigo-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]"
              whileFocus={{ scale: 1.02 }}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 w-6 h-6 animate-pulse" />
          </div>
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 py-2.5 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="w-5 h-5" />
            Filters
          </motion.button>
        </div>

        {/* Filters Dropdown */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="mb-10 p-6 bg-gray-800/70 backdrop-blur-lg rounded-2xl border border-indigo-500/20 shadow-[0_0_20px_rgba(147,51,234,0.2)]"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-indigo-400">Filter Options</h3>
                <motion.button onClick={() => setShowFilters(false)} whileHover={{ rotate: 90 }} transition={{ duration: 0.3 }}>
                  <X className="w-6 h-6 text-gray-300 hover:text-gray-100 transition-colors" />
                </motion.button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <div className="flex flex-wrap gap-3">
                    {categories.map((category) => (
                      <motion.button
                        key={category}
                        onClick={() => handleCategoryFilter(category)}
                        className={`py-2 px-5 rounded-xl font-medium transition-all duration-300 ${
                          selectedCategory === category
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_0_10px_rgba(147,51,234,0.5)]'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                  <div className="flex flex-wrap gap-3">
                    {types.map((type) => (
                      <motion.button
                        key={type}
                        onClick={() => handleTypeFilter(type)}
                        className={`py-2 px-5 rounded-xl font-medium transition-all duration-300 ${
                          selectedType === type
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_0_10px_rgba(147,51,234,0.5)]'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {type}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Admin Actions */}
        {isLoggedIn && (
          <div className="text-center mb-16">
            {!isAdmin && (
              <motion.p
                className="text-gray-400 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                You are logged in as a regular user. Only admins can manage media.
              </motion.p>
            )}
            <div className="flex justify-center gap-4">
              {isAdmin && (
                <motion.button
                  onClick={() => {
                    setEditItem(null);
                    setFormData({ title: '', file: null, tags: '', category: 'Digital Painting', type: 'Photo' });
                    setShowForm(true);
                  }}
                  className="py-3 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]"
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add New Media
                </motion.button>
              )}
              <motion.button
                onClick={handleDashboard}
                className="py-3 px-8 bg-gray-700 hover:bg-gray-800 rounded-xl text-white font-semibold shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to Dashboard
              </motion.button>
            </div>
          </div>
        )}

        {/* Feedback Messages */}
        {(error || success) && (
          <motion.div
            className={`mb-8 p-5 rounded-2xl text-center max-w-lg mx-auto shadow-[0_0_15px_rgba(147,51,234,0.2)] ${
              error ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-green-500/20 text-green-300 border border-green-500/30'
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {error && <AlertCircle className="inline-block w-6 h-6 mr-2 animate-pulse" />}
            {success && <CheckCircle className="inline-block w-6 h-6 mr-2 animate-pulse" />}
            {error || success}
          </motion.div>
        )}

        {/* Add/Edit Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-3xl w-full max-w-md border border-indigo-500/20 shadow-[0_0_30px_rgba(147,51,234,0.3)]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                  {editItem ? 'Edit Media' : 'Add New Media'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                    <motion.input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-800/70 border border-indigo-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm hover:shadow-md"
                      disabled={loading || !isAdmin}
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">File</label>
                    <input
                      type="file"
                      name="file"
                      onChange={handleFileChange}
                      className="w-full p-2 bg-gray-800/70 border border-indigo-500/30 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-indigo-600 file:to-purple-600 file:text-white file:hover:from-indigo-700 file:hover:to-purple-700 transition-all"
                      accept="image/*,video/*"
                      disabled={loading || !isAdmin}
                    />
                    {formData.file && <p className="text-sm text-gray-400 mt-1">{formData.file.name}</p>}
                    {editItem && !formData.file && <p className="text-sm text-gray-400 mt-1">Current: {editItem.file_url}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Tags (comma-separated)</label>
                    <motion.input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-800/70 border border-indigo-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm hover:shadow-md"
                      placeholder="e.g., tag1, tag2"
                      disabled={loading || !isAdmin}
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-800/70 border border-indigo-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
                      disabled={loading || !isAdmin}
                    >
                      <option value="Digital Painting">Digital Painting</option>
                      <option value="Interactive">Interactive</option>
                      <option value="Generative">Generative</option>
                      <option value="Audio Reactive">Audio Reactive</option>
                      <option value="Animation Painting">Animation Painting</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-800/70 border border-indigo-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
                      disabled={loading || !isAdmin}
                    >
                      <option value="Photo">Photo</option>
                      <option value="GIF">GIF</option>
                      <option value="Video">Video</option>
                    </select>
                  </div>
                  <div className="flex space-x-4">
                    <motion.button
                      type="submit"
                      className="py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]"
                      disabled={loading || !isAdmin}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {loading ? 'Saving...' : editItem ? 'Update' : 'Add'}
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="py-3 px-6 bg-gray-700 hover:bg-gray-800 rounded-lg text-white font-semibold transition-all duration-300 shadow-lg"
                      disabled={loading}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Media Sections */}
        <div className="space-y-20">
          {filteredItems.length === 0 ? (
            <motion.p
              className="text-center text-gray-400 text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No media items found
            </motion.p>
          ) : (
            categories.slice(1).map((category) => {
              const categoryItems = filteredItems.filter((item) => item.category === category);
              if (categoryItems.length === 0) return null;

              return (
                <motion.div
                  key={category}
                  className="pt-10"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-10 capitalize tracking-tight drop-shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {categoryItems.map((item) => (
                      <motion.div
                        key={item.id}
                        className="relative rounded-xl overflow-hidden border border-indigo-500/20 bg-gray-900/50 backdrop-blur-md hover:shadow-[0_0_25px_rgba(147,51,234,0.4)] transition-all duration-500"
                        onClick={() => setSelectedItem(item)}
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="relative w-full aspect-square">
                          {item.type === 'Video' ? (
                            <>
                              <video
                                className="w-full h-full object-cover rounded-t-xl"
                                autoPlay={playingVideos[item.id]}
                                loop
                                muted
                              >
                                <source src={getPublicUrl(item.file_url)} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                              <motion.button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleVideoPlay(item.id);
                                }}
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 p-4 rounded-full text-white hover:bg-black/80 transition-all duration-300"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                {playingVideos[item.id] ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                              </motion.button>
                            </>
                          ) : (
                            <img
                              src={getPublicUrl(item.file_url)}
                              alt={item.title}
                              className="w-full h-full object-cover rounded-t-xl"
                              loading="lazy"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                            <p className="text-sm text-gray-300">{item.category}</p>
                          </div>
                        </div>
                        {/* Admin Edit/Delete Icons Below the Media */}
                        {isAdmin && (
                          <div className="flex justify-center space-x-4 p-3 bg-gray-800/70 backdrop-blur-md rounded-b-xl border-t border-indigo-500/20">
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(item);
                              }}
                              className="p-2 bg-blue-600/80 rounded-full text-white hover:bg-blue-700 transition-all duration-300"
                              title="Edit"
                              disabled={loading}
                              whileHover={{ scale: 1.2, boxShadow: '0 0 10px rgba(96,165,250,0.7)' }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <EditIcon />
                            </motion.button>
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(item);
                              }}
                              className="p-2 bg-red-600/80 rounded-full text-white hover:bg-red-700 transition-all duration-300"
                              title="Delete"
                              disabled={loading}
                              whileHover={{ scale: 1.2, boxShadow: '0 0 10px rgba(248,113,113,0.7)' }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <DeleteIcon />
                            </motion.button>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Media Preview Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-[10000]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItem(null);
              }}
            >
              <motion.div
                className="bg-gray-900/80 backdrop-blur-lg p-10 rounded-3xl w-full max-w-4xl border border-indigo-500/20 shadow-[0_0_40px_rgba(147,51,234,0.4)]"
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                  {selectedItem.title}
                </h2>
                {selectedItem.file_url && (
                  <div className="mb-6 w-full relative">
                    {selectedItem.type === 'Video' ? (
                      <video controls className="w-full h-[500px] object-contain rounded-xl shadow-[0_0_20px_rgba(147,51,234,0.3)]">
                        <source src={getPublicUrl(selectedItem.file_url)} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={getPublicUrl(selectedItem.file_url)}
                        alt={selectedItem.title}
                        className="w-full h-[500px] object-contain rounded-xl shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                      />
                    )}
                  </div>
                )}
                <div className="space-y-4 bg-gray-800/50 p-6 rounded-xl border border-indigo-500/30 backdrop-blur-md">
                  <p className="text-gray-300"><span className="font-semibold text-indigo-400">Category:</span> {selectedItem.category}</p>
                  <p className="text-gray-300"><span className="font-semibold text-indigo-400">Type:</span> {selectedItem.type}</p>
                  <p className="text-gray-300"><span className="font-semibold text-indigo-400">Tags:</span> {selectedItem.hashtags.join(', ')}</p>
                  {selectedItem.created_at && (
                    <p className="text-gray-300"><span className="font-semibold text-indigo-400">Uploaded on:</span> {new Date(selectedItem.created_at).toLocaleDateString()}</p>
                  )}
                </div>
                <motion.button
                  onClick={() => setSelectedItem(null)}
                  className="mt-8 py-3 px-8 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(147,51,234,0.5)]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StudioLibrary;