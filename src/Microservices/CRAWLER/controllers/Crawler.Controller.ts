import axios from "axios";
import * as cheerio from "cheerio";
import { Request, Response } from "express";
import { CrawlerRequest } from "../interfaces/dtos/Requests/Crawler.request";

export const fetchData = async (
  req: Request<{}, {}, CrawlerRequest>,
  res: Response
): Promise<void> => {
  try {
    const { url } = req.body;

    // Gửi request đến trang web
    const { data } = await axios.get(url);

    // Load HTML vào cheerio
    const $ = cheerio.load(data);

    // Lấy dữ liệu dựa trên selector
    const title = $("title").text();
    const heading = $("h1").text();

    // Gửi lại phản hồi dưới dạng JSON
    res.status(200).json({
      success: true,
      data: {
        title,
        heading,
      },
    });
  } catch (error) {
    console.error("Error fetching data from URL: ", error);
    res.status(500).json({
      success: false,
      message: "Error fetching data from URL",
      error: error || "Unknown error",
    });
  }
};
