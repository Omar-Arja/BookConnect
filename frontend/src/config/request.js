import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/";

export const sendRequest = async ({
  method = "GET",
  route,
  body,
  includeHeaders = true,
}) => {
  if (!route) throw Error("URL required");

  const headers = includeHeaders
    ? {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    }
    : {};

  try {
    const response = await axios.request({
      method,
      url: route,
      data: body,
      headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
