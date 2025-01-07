import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Save, Sparkles, Loader2, ArrowLeft } from "lucide-react";
import ReactQuill from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
  ToastContainer,
} from "./toastmessage";
import { Link } from "react-router-dom";

const AddData = () => {
  const initialFormData = {
    pattern_name: "",
    pattern_type: "",
    reliability_score: "",
    experience: "",
    best_used: "",
    introduction: "",
    what_is_it: "",
    what_does_it_matter: "",
    types_of_pattern: "",
    market_psychology: "",
    why_is_it_named: "",
    how_strong_is_this_pattern: "",
    indicators: "",
    mistakes_to_avoid: "",
    final_tips: "",
    example_work: "",
    example_fail: "",
    strategy: "",
    practices: [
      {
        question: "",
        options: [""],
        correctAnswer: "",
        explanation: "",
      },
    ],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "align",
    "link",
    "image",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = showLoadingToast("Saving data...");
    setLoading(true);

    try {
      await axios.post(
        "https://stage.api.tradexpert.ai/api/v1/admin/learning",
        formData
      );
      toast.dismiss(loadingToast);
      showSuccessToast("Data saved successfully!");
      setSubmitted(true);
      setFormData(initialFormData);
      setTimeout(() => setSubmitted(false), 2000);
    } catch (error) {
      toast.dismiss(loadingToast);
      showErrorToast(error.message || "Error saving data");
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (content, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: content,
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const stringFields = [
    { name: "pattern_name", label: "Pattern Name" },
    { name: "pattern_type", label: "Pattern Type" },
    { name: "reliability_score", label: "Reliability Score" },
    { name: "experience", label: "Experience" },
    { name: "best_used", label: "Best Used" },
  ];

  const textEditorFields = [
    { name: "introduction", label: "Introduction" },
    { name: "what_is_it", label: "What Is It?" },
    { name: "what_does_it_matter", label: "Why Does It Matter?" },
    { name: "types_of_pattern", label: "Types of Pattern" },
    { name: "market_psychology", label: "Market Psychology" },
    { name: "why_is_it_named", label: "Why Is It Named?" },
    {
      name: "how_strong_is_this_pattern",
      label: "How Strong Is This Pattern?",
    },
    { name: "indicators", label: "Indicators" },
    { name: "mistakes_to_avoid", label: "Mistakes to Avoid" },
    { name: "final_tips", label: "Final Tips" },
    { name: "example_work", label: "Example Work" },
    { name: "example_fail", label: "Example Fail" },
    { name: "strategy", label: "Strategy" },
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

  const handlePracticeChange = (index, field, value) => {
    const updatedPractices = [...formData.practices];
    if (field === "options") {
      updatedPractices[index][field] = value.split(","); // Handle options as comma-separated values
    } else {
      updatedPractices[index][field] = value;
    }
    setFormData((prev) => ({
      ...prev,
      practices: updatedPractices,
    }));
  };

  const addPractice = () => {
    setFormData((prev) => ({
      ...prev,
      practices: [
        ...prev.practices,
        { question: "", options: [""], correctAnswer: "", explanation: "" },
      ],
    }));
  };

  const removePractice = (index) => {
    const updatedPractices = formData.practices.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      practices: updatedPractices,
    }));
  };

  return (
    <div className="min-h-screen bg-purple-800">
      <ToastContainer />
      <div className="fixed inset-0 opacity-20 pointer-events-none" />
      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="group absolute left-4 top-4 flex items-center gap-2 bg-black hover:bg-white/20 
                     px-4 py-2 rounded-lg backdrop-blur-sm transition-all duration-300
                     hover:translate-x-1 text-white z-20"
          >
            <motion.div
              animate={{ x: [-2, 0, -2] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.div>
            <span className="text-white  group-hover:opacity-100 transition-opacity duration-300">
              Back
            </span>
          </Link>
        </motion.div>

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
              {stringFields.map((field) => (
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
              {textEditorFields.map((field) => (
                <motion.div
                  key={field.name}
                  variants={itemVariants}
                  className="group"
                >
                  <label className="block text-sm font-medium text-white mb-2">
                    {field.label}
                  </label>
                  <div
                    className="border rounded-lg overflow-hidden bg-white/50 backdrop-blur-sm
                              group-hover:shadow-lg transition-all duration-300"
                  >
                    <ReactQuill
                      theme="snow"
                      value={formData[field.name]}
                      onChange={(content) =>
                        handleEditorChange(content, field.name)
                      }
                      modules={modules}
                      formats={formats}
                      className="h-64 mb-12"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white">Practices</h2>
              {formData.practices.map((practice, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border bg-white/50 backdrop-blur-sm"
                >
                  <label className="block text-sm font-medium text-black mb-2">
                    Question
                  </label>
                  <input
                    type="text"
                    value={practice.question}
                    onChange={(e) =>
                      handlePracticeChange(index, "question", e.target.value)
                    }
                    className="w-full px-4 py-2 mb-4 rounded-lg border"
                  />

                  <label className="block text-sm font-medium text-black mb-2">
                    Options (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={practice.options.join(",")}
                    onChange={(e) =>
                      handlePracticeChange(index, "options", e.target.value)
                    }
                    className="w-full px-4 py-2 mb-4 rounded-lg border"
                  />

                  <label className="block text-sm font-medium text-black mb-2">
                    Correct Answer
                  </label>
                  <input
                    type="text"
                    value={practice.correctAnswer}
                    onChange={(e) =>
                      handlePracticeChange(
                        index,
                        "correctAnswer",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-2 mb-4 rounded-lg border"
                  />

                  <label className="block text-sm font-medium text-black mb-2">
                    Explanation
                  </label>
                  <textarea
                    value={practice.explanation}
                    onChange={(e) =>
                      handlePracticeChange(index, "explanation", e.target.value)
                    }
                    className="w-full px-4 py-2 mb-4 rounded-lg border"
                  ></textarea>

                  <button
                    type="button"
                    onClick={() => removePractice(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove Question
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addPractice}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Add Question
              </button>
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
                       transition-all duration-300 ${
                         loading || submitted
                           ? "opacity-75 cursor-not-allowed"
                           : "hover:shadow-xl hover:scale-105"
                       }`}
                whileHover={loading || submitted ? {} : { scale: 1.05 }}
                whileTap={loading || submitted ? {} : { scale: 0.95 }}
              >
                {getButtonContent()}
              </motion.button>
            </motion.div>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default AddData;
