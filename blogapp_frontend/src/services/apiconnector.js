import axios from "axios";

export const axiosInstance = axios.create({});

// Safe API connector to handle empty/non-JSON responses
export const apiConnector = async (method, url, bodyData, headers, params) => {
  try {
    const response = await axiosInstance({
      method: method,
      url: url,
      data: bodyData || null,
      headers: headers || {},
      params: params || null,
      validateStatus: () => true, // allow handling non-200 statuses manually
    });

    // Ensure data is always an object
    let data = {};
    if (response.data) {
      data = response.data;
    }

    return { status: response.status, data };
  } catch (error) {
    console.error("API Connector Error:", error);
    return {
      status: 500,
      data: { success: false, message: "Network or server error" },
    };
  }
};
