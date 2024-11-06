import axios, { AxiosError } from "axios";
import { fetchDataRequest } from "../interfaces/dtos/requests/fetchData.requests";
import { Request, Response } from "express";

export const fetchData = async (
  req: Request<{}, {}, fetchDataRequest>,
  res: Response
): Promise<void> => {
  const { url } = req.body;
  console.log(url);

  try {
    const response = await axios.post(
      "http://localhost:3001/crawler/fetchData",
      { url }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      console.error("Axios error occurred:", axiosError.message);
      if (axiosError.response) {
        console.error("Error response data:", axiosError.response.data);
        console.error("Error response status:", axiosError.response.status);
        console.error("Error response headers:", axiosError.response.headers);
      } else if (axiosError.request) {
        console.error(
          "No response received. Request data:",
          axiosError.request
        );
      }

      res.status(axiosError.response?.status || 500).json({
        message: "Đã xảy ra lỗi khi gọi service khác.",
        error: axiosError.response?.data || axiosError.message,
      });
    } else {
      console.error("Unknown error:", error);
      res.status(500).json({
        message: "Đã xảy ra lỗi không xác định.",
      });
    }
  }
};

export const getData = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get("http://localhost:3001/crawler/getData");

    res.status(200).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      console.error("Axios error occurred:", axiosError.message);
      if (axiosError.response) {
        console.error("Error response data:", axiosError.response.data);
        console.error("Error response status:", axiosError.response.status);
        console.error("Error response headers:", axiosError.response.headers);
      } else if (axiosError.request) {
        console.error(
          "No response received. Request data:",
          axiosError.request
        );
      }

      res.status(axiosError.response?.status || 500).json({
        message: "Đã xảy ra lỗi khi gọi service khác.",
        error: axiosError.response?.data || axiosError.message,
      });
    } else {
      console.error("Unknown error:", error);
      res.status(500).json({
        message: "Đã xảy ra lỗi không xác định.",
      });
    }
  }
};
