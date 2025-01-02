import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {toast} from "react-hot-toast"
import { Save, Sparkles, Loader2 } from 'lucide-react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import { showErrorToast, showLoadingToast, showSuccessToast, ToastContainer } from './toastmessage';

const AddData = () => {
  const initialFormData = {
    pattern_name: '',
    pattern_type: '',
    reliability_score: '',
    experience: '',
    best_used: '',
    introduction: '',
    what_is_it: '',
    what_does_it_matter: '',
    types_of_pattern: '',
    market_psychology: '',
    why_is_it_named: '',
    how_strong_is_this_pattern: '',
    indicators: '',
    mistakes_to_avoid: '',
    final_tips: '',
    example_work: '',
    example_fail: '',
    strategy: '',
    practices: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet',
    'align',
    'link', 'image'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = showLoadingToast('Saving data...');
    setLoading(true);
    
    try {
      await axios.post('https://stage.api.tradexpert.ai/api/v1/admin/learning', formData);
      toast.dismiss(loadingToast);
      showSuccessToast('Data saved successfully!');
      setSubmitted(true);
      setFormData(initialFormData);
      setTimeout(() => setSubmitted(false), 2000);
    } catch (error) {
      toast.dismiss(loadingToast);
      showErrorToast(error.message || 'Error saving data');
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditorChange = (content, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: content
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const stringFields = [
    { name: 'pattern_name', label: 'Pattern Name' },
    { name: 'pattern_type', label: 'Pattern Type' },
    { name: 'reliability_score', label: 'Reliability Score' },
    { name: 'experience', label: 'Experience' },
    { name: 'best_used', label: 'Best Used' }
  ];

  const textEditorFields = [
    { name: 'introduction', label: 'Introduction' },
    { name: 'what_is_it', label: 'What Is It?' },
    { name: 'what_does_it_matter', label: 'Why Does It Matter?' },
    { name: 'types_of_pattern', label: 'Types of Pattern' },
    { name: 'market_psychology', label: 'Market Psychology' },
    { name: 'why_is_it_named', label: 'Why Is It Named?' },
    { name: 'how_strong_is_this_pattern', label: 'How Strong Is This Pattern?' },
    { name: 'indicators', label: 'Indicators' },
    { name: 'mistakes_to_avoid', label: 'Mistakes to Avoid' },
    { name: 'final_tips', label: 'Final Tips' },
    { name: 'example_work', label: 'Example Work' },
    { name: 'example_fail', label: 'Example Fail' },
    { name: 'strategy', label: 'Strategy' },
    { name: 'practices', label: 'Practices' }
  ];

  const getButtonContent = () => {
    if (loading) {
      return (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Saving...
        </>
      );
    }
    if (submitted) {
      return (
        <>
          <Save className="w-5 h-5" />
          Saved
        </>
      );
    }
    return (
      <>
        <Save className="w-5 h-5 group-hover:animate-bounce" />
        Save
      </>
    );
  };

  return (
    <div className="min-h-screen bg-purple-800">
        <ToastContainer />
      <div className="fixed inset-0 opacity-20 pointer-events-none" />
      
      <motion.form 
        onSubmit={handleSubmit}
        className="relative max-w-4xl mx-auto rounded-xl overflow-hidden backdrop-blur-sm"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-white/30 backdrop-blur-xl" />
        
        <div className="relative p-8">
          <motion.div 
            className="flex items-center justify-center gap-3 mb-8"
            variants={itemVariants}
          >
            <Sparkles className="w-8 h-8 text-purple-600 animate-pulse" />
            <h1 className="text-4xl font-bold text-white underline">
              Add Learning Page Data
            </h1>
            <Sparkles className="w-8 h-8 text-purple-600 animate-pulse" />
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {stringFields.map(field => (
              <motion.div 
                key={field.name} 
                variants={itemVariants}
                className="group"
              >
                <label className="block text-sm font-medium text-white mb-2">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-purple-200 bg-white/50 backdrop-blur-sm
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent
                           transition-all duration-300 group-hover:shadow-lg"
                />
              </motion.div>
            ))}
          </motion.div>

          <div className="space-y-6">
            {textEditorFields.map(field => (
              <motion.div 
                key={field.name} 
                variants={itemVariants}
                className="group"
              >
                <label className="block text-sm font-medium text-white mb-2">
                  {field.label}
                </label>
                <div className="border rounded-lg overflow-hidden bg-white/50 backdrop-blur-sm
                              group-hover:shadow-lg transition-all duration-300">
                  <ReactQuill
                    theme="snow"
                    value={formData[field.name]}
                    onChange={(content) => handleEditorChange(content, field.name)}
                    modules={modules}
                    formats={formats}
                    className="h-64 mb-12"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-8 flex justify-center"
            variants={itemVariants}
          >
            <motion.button
              type="submit"
              disabled={loading || submitted}
              className={`group flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 
                       text-white px-8 py-3 rounded-lg font-semibold shadow-lg 
                       transition-all duration-300 ${loading || submitted ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-xl hover:scale-105'}`}
              whileHover={loading || submitted ? {} : { scale: 1.05 }}
              whileTap={loading || submitted ? {} : { scale: 0.95 }}
            >
              {getButtonContent()}
            </motion.button>
          </motion.div>
        </div>
      </motion.form>
    </div>
  );
};

export default AddData;