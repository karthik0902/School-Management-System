import axios from 'axios';

const baseURL = 'http://localhost:3003';

export const getAllSchools = async () => {
  try {
    const response = await axios.get(`${baseURL}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSchoolById = async (id) => {
  try {
    const response = await axios.get(`${baseURL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postSchool = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putSchool = async (id, data) => {
  try {
    const response = await axios.put(`${baseURL}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSchool = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const filtersort = async (id) => {
    try {
      const response = await axios.get(`${baseURL}/filter/sort?sort=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const filterByFee = async (i,j) => {
    try {
      const response = await axios.get(`${baseURL}/filter/fee?min=${i}&max=${j}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
