import axios from "axios";
import * as cheerio from "cheerio";
import { Request, Response } from "express";
import Product from "../models/Product.model";

export const handleFetchProductData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { url } = req.body;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Lọc thông tin sản phẩm
    const productName = $("#productTitle").text().trim();
    const currentPriceText = $(".a-price .a-offscreen").text().trim();
    const currentPrice = parseFloat(currentPriceText.replace(/[$,]/g, ""));
    const imageUrl = $("#landingImage").attr("src");
    const description = $(".a-unordered-list").text().trim();
    const platformLinks = [{ platform: "Amazon", url }];

    if (!productName || !currentPrice || !imageUrl) {
      res
        .status(404)
        .json({ success: false, message: "Product information not found" });
    }

    // Tạo đối tượng sản phẩm
    const productData = {
      productName,
      description,
      imageUrl,
      currentPrice,
      platformLinks,
      ratings: {
        averageRating: 0,
        reviewCount: 0,
      },
      fetchDate: new Date(),
      source: "Amazon",
    };

    // Lưu sản phẩm vào cơ sở dữ liệu
    const newProduct = new Product(productData);
    await newProduct.save();

    // Trả về phản hồi
    res.status(200).json({
      success: true,
      data: productData,
    });
  } catch (error) {
    console.error("Error fetching product data: ", error);
    res.status(500).json({
      success: false,
      message: "Error fetching product data",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const handleGetAllProductInfoFromDb = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products from database: ", error);
    res.status(500).json({
      success: false,
      message: "Error fetching products from database",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
