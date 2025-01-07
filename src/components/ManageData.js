import React, { useState, useEffect } from "react";
import {
  Edit2,
  Trash2,
  AlertTriangle,
  Loader2,
  X,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactQuill from "react-quill";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
  ToastContainer,
} from "./toastmessage";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
        />
        <div className="relative w-full max-w-4xl transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
          {children}
        </div>
      </div>
    </div>
  );
};

const ManageData = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);
  const [data, setData] = useState([]);

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

  const [editFormData, setEditFormData] = useState(initialFormData);

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
    { name: "practices", label: "Practices" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setTableLoading(true);
    try {
      const response = await axios.get(
        "https://stage.api.tradexpert.ai/api/v1/user/learning"
      );
      setData(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch data");
      console.error("Error fetching data:", error);
    } finally {
      setTableLoading(false);
    }
  };

  const handleEdit = (item) => {
    // Ensure we store the _id along with other form data
    setSelectedItem(item);
    setEditFormData({
      _id: item._id, // Store the MongoDB ObjectId
      pattern_name: item.pattern_name || "",
      pattern_type: item.pattern_type || "",
      reliability_score: item.reliability_score || "",
      experience: item.experience || "",
      best_used: item.best_used || "",
      introduction: item.introduction || "",
      what_is_it: item.what_is_it || "",
      what_does_it_matter: item.what_does_it_matter || "",
      types_of_pattern: item.types_of_pattern || "",
      market_psychology: item.market_psychology || "",
      why_is_it_named: item.why_is_it_named || "",
      how_strong_is_this_pattern: item.how_strong_is_this_pattern || "",
      indicators: item.indicators || "",
      mistakes_to_avoid: item.mistakes_to_avoid || "",
      final_tips: item.final_tips || "",
      example_work: item.example_work || "",
      example_fail: item.example_fail || "",
      strategy: item.strategy || "",
      practices:
        item.practices && item.practices.length > 0
          ? item.practices
          : [
              {
                question: "",
                options: [""],
                correctAnswer: "",
                explanation: "",
              },
            ],
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleEditSubmit = async () => {
    setLoading(true);
    const loadingToast = showLoadingToast("Updating data...");

    try {
      if (!selectedItem?._id) {
        throw new Error("Invalid item ID");
      }

      await axios.put(
        `https://stage.api.tradexpert.ai/api/v1/admin/learning/${selectedItem?._id}`,
        editFormData
      );
      toast.dismiss(loadingToast);
      showSuccessToast("Data updated successfully");
      await fetchData();
      setTimeout(() => {
        setIsEditModalOpen(false);
      }, 2000);
    } catch (error) {
      toast.dismiss(loadingToast);
      showErrorToast("Failed to delete pattern");
      console.error("Error updating data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    const loadingToast = showLoadingToast("Deleting data...");
    try {
      if (!selectedItem?._id) {
        throw new Error("Invalid item ID");
      }
      await axios.delete(
        `https://stage.api.tradexpert.ai/api/v1/admin/learning/${selectedItem?._id}`
      );
      toast.dismiss(loadingToast);
      await fetchData();
      showSuccessToast("Data deleted successfully");
      setTimeout(() => {
        setIsDeleteModalOpen(false);
      }, 2000);
    } catch (error) {
      toast.dismiss(loadingToast);
      showErrorToast("Failed to delete data");
      console.error("Error deleting data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add these new functions for handling practices
  const handlePracticeChange = (index, field, value) => {
    const updatedPractices = [...editFormData.practices];
    if (field === "options") {
      updatedPractices[index][field] = value.split(","); // Handle options as comma-separated values
    } else {
      updatedPractices[index][field] = value;
    }
    setEditFormData((prev) => ({
      ...prev,
      practices: updatedPractices,
    }));
  };

  const addPractice = () => {
    setEditFormData((prev) => ({
      ...prev,
      practices: [
        ...prev.practices,
        {
          question: "",
          options: [""],
          correctAnswer: "",
          explanation: "",
        },
      ],
    }));
  };

  const removePractice = (index) => {
    setEditFormData((prev) => ({
      ...prev,
      practices: prev.practices.filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (content, field) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: content,
    }));
  };

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  if (tableLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-800 to-purple-900 flex items-center justify-center">
        <div className="flex items-center gap-2 text-white">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading Data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 min-h-screen bg-gradient-to-br from-purple-800 to-purple-900">
      <ToastContainer />
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute -left-4 top-0"
        >
          <Link
            to="/"
            className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 
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
            <span className=" text-white group-hover:opacity-100 transition-opacity duration-300">
              Back
            </span>
          </Link>
        </motion.div>
        <h1 className="text-3xl py-16 font-bold text-white ">Manage Data</h1>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl px-4 py-2 overflow-x-auto">
          <motion.table
            className="w-full min-w-[640px]"
            variants={tableVariants}
            initial="hidden"
            animate="visible"
          >
            <thead>
              <tr className="text-white border-b border-white/20">
                <th className="py-3 px-4 text-left">Pattern Name</th>
                <th className="py-3 px-4 text-left">Pattern Type</th>
                <th className="py-3 px-4 text-left">Reliability Score</th>
                <th className="py-3 px-4 text-left">Experience</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {data.map((item) => (
                  <motion.tr
                    key={item._id}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-white/90 border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4">{item.pattern_name}</td>
                    <td className="py-3 px-4">{item.pattern_type}</td>
                    <td className="py-3 px-4">{item.reliability_score}</td>
                    <td className="py-3 px-4">{item.experience}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 rounded-lg hover:bg-purple-500/20 transition-colors"
                        >
                          <Edit2 className="w-4 h-4 text-purple-200" />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-300" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </motion.table>
        </div>

        {/* Enhanced Edit Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          <div className="max-h-[80vh] overflow-y-auto">
            <div className="mb-4 flex items-center justify-between sticky top-0 bg-white z-10 py-2">
              <h3 className="text-lg font-semibold">Edit Data</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-lg p-1 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* String Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stringFields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium mb-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      name={field.name}
                      value={editFormData[field.name]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                ))}
              </div>

              {/* Rich Text Editor Fields */}
              {textEditorFields.map(
                (field) =>
                  field.name !== "practices" && (
                    <div key={field.name}>
                      <label className="block text-sm font-medium mb-1">
                        {field.label}
                      </label>
                      <div className="border rounded-lg">
                        <ReactQuill
                          theme="snow"
                          value={editFormData[field.name]}
                          onChange={(content) =>
                            handleEditorChange(content, field.name)
                          }
                          modules={modules}
                          formats={formats}
                          className="h-64 mb-12"
                        />
                      </div>
                    </div>
                  )
              )}

              {/* Practices Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">Practices</h2>
                </div>
              </div>
              {editFormData.practices.map((practice, index) => (
                <div key={index} className="p-4 rounded-lg border bg-gray-50">
                  <label className="block text-sm font-medium mb-2">
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

                  <label className="block text-sm font-medium mb-2">
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

                  <label className="block text-sm font-medium mb-2">
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

                  <label className="block text-sm font-medium mb-2">
                    Explanation
                  </label>
                  <textarea
                    value={practice.explanation}
                    onChange={(e) =>
                      handlePracticeChange(index, "explanation", e.target.value)
                    }
                    className="w-full px-4 py-2 mb-4 rounded-lg border"
                    rows={3}
                  />

                  <button
                    type="button"
                    onClick={() => removePractice(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove Question
                  </button>
                </div>
              ))}
            </div>
            <div className="flex py-4 items-center justify-start">
              <button
                type="button"
                onClick={addPractice}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Add Question
              </button>
            </div>
            <div className="mt-6 flex justify-end gap-3 sticky bottom-0 bg-white py-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                disabled={loading}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Save Changes
              </button>
            </div>
          </div>
        </Modal>

        {/* Delete Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-semibold">Confirm Deletion</h3>
            </div>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="rounded-lg p-1 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="mb-6">
            Are you sure you want to delete this data? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Delete Data
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ManageData;
