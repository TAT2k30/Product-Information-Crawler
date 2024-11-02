import axios from "axios";
import * as cheerio from "cheerio";
import { Request, Response } from "express";
import Product from "../models/Product.model";

export const fetchProductData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { url } = req.body;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Lọc thông tin sản phẩm
    const productName = $("#productTitle").text().trim(); // Giả định tên sản phẩm nằm trong #productTitle
    const currentPriceText = $(".a-price .a-offscreen").text().trim(); // Giả định giá sản phẩm
    const currentPrice = parseFloat(currentPriceText.replace(/[$,]/g, "")); // Chuyển đổi sang số
    const imageUrl = $("#landingImage").attr("src"); // Giả định hình ảnh nằm trong #landingImage
    const description = $("#productDescription").text().trim(); // Giả định mô tả nằm trong #productDescription
    const platformLinks = [{ platform: "Amazon", url }]; // Liên kết đến nền tảng (có thể thêm nhiều nền tảng khác)

    // Kiểm tra thông tin
    if (!productName || !currentPrice || !imageUrl) {
      res
        .status(404)
        .json({ success: false, message: "Product information not found" });
    }

    // Tạo đối tượng sản phẩm
    const productData = {
      productName,
      category: "Electronics", // Thay đổi theo yêu cầu
      description,
      imageUrl,
      currentPrice,
      priceHistory: [{ price: currentPrice }],
      platformLinks,
      ratings: {
        averageRating: 0, // Có thể thêm logic để lấy đánh giá nếu có
        reviewCount: 0,
      },
      stockStatus: true,
      lastUpdated: new Date(),
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
