import React, { useState } from 'react';

const CropLossForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    cropType: '',
    damageCause: '',
    description: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();  
    // Submit logic here
    console.log(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Crop Loss Report</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Crop Type</label>
            <select
              name="cropType"
              value={formData.cropType}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select Crop</option>
              <option value="Coffee">Coffee</option>
              <option value="Pepper">Pepper</option>
              <option value="Cardamom">Cardamom</option>
              <option value="Tea">Tea</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Cause of Damage</label>
            <select
              name="damageCause"
              value={formData.damageCause}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select Cause</option>
              <option value="Climate">Climate (Drought/Flood)</option>
              <option value="Man-Animal Conflict">Man-Animal Conflict</option>
              <option value="Pest/Disease">Pest/Disease</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            ></textarea>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">Upload Photo Evidence</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="imageUpload"
              />
              <label htmlFor="imageUpload" className="cursor-pointer">
                {formData.image ? (
                  <div>
                    <img src={URL.createObjectURL(formData.image)} alt="Uploaded" className="max-h-48 mx-auto mb-2" />
                    <p className="text-green-600">Click to change image</p>
                  </div>
                ) : (
                  <div>
                    <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p className="mt-2">Click to upload photo of crop damage</p>
                    <p className="text-sm text-gray-500">JPG, PNG up to 5MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>  
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 px-6 rounded-lg font-medium"
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default CropLossForm;