import axios from 'axios';

export const uploadFilesToCloudinary = async (files: File[]) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('images', file); 
  });

  try {
    const response = await axios.post('http://localhost:3001/api/cloudinary', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response.data.url, "response data");
    return response.data.url; 
  } catch (error) {
    console.error("Error uploading files:", error);
    throw error;
  }
};



export const uploadFileToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file); 

  try {
    const response = await axios.post('http://localhost:3001/api/cloudinary', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.url; 
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};


