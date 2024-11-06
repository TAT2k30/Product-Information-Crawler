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
    console.log("Received fetchData request:", req.body);
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    //Image selector 
    const imageSelector = "#imageBlock .a-fixed-left-grid .a-fixed-left-grid-inner #altImages .a-unordered-list.a-nostyle.a-button-list.a-vertical.a-spacing-top-micro.regularAltImageViewLayout"
    //Section chứa image sản phẩm
    let productImages: string[] = $(imageSelector).map((index, element) => {
      $(element).attr('li')
    }).get();


    console.log(productImages);

    // Lọc thông tin sản phẩm
    const productName = $("#productTitle").text().trim();
    const currentPriceText = $(".a-price .a-offscreen").text().trim();
    const currentPrice = parseFloat(currentPriceText.replace(/[$,]/g, ""));
    const imageUrl = $("#landingImage").attr("src");
    const description = $("#productDescription").text().trim();
    const platformLinks = [{ platform: "Amazon", url }];

    if (!productName || !currentPrice || !imageUrl) {
      res
        .status(404)
        .json({ success: false, message: "Product information not found" });
    }

    // Tạo đối tượng sản phẩm
    const productData = {
      productName,
      category: "Electronics",
      description,
      imageUrl,
      currentPrice,
      priceHistory: [{ price: currentPrice }],
      platformLinks,
      ratings: {
        averageRating: 0,
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

export const handleGetAllProductInfoFromDb = async (
  req: Request,
  res: Response
): Promise<void> => {};

export const handleGetImages = async () => {

}
