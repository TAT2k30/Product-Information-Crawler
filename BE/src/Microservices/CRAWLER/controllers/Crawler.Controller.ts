import axios from "axios";
import * as cheerio from "cheerio";
import { Request, Response } from "express";
import Product from "../models/Product.model";

const extractNumericPrice = (priceText: string): number | null => {
  const numericString = priceText.replace(/[^0-9.]/g, "");
  const price = parseFloat(numericString);
  return isNaN(price) ? null : price;
};

const fetchAmazonProductData = ($: cheerio.Root, url: string) => {
  const productName = $("#productTitle").text().trim();
  const currentPriceText = $(".a-price .a-offscreen").text().trim();
  const currentPrice = parseFloat(currentPriceText.replace(/[$,]/g, ""));
  const imageUrl = $("#landingImage").attr("src");
  const bulletPoints: string[] = [];
  $("#feature-bullets ul.a-unordered-list li.a-spacing-mini span.a-list-item").each((_, element) => {
    bulletPoints.push($(element).text().trim());
  });
  console.log("Bullet points " + bulletPoints);
  const description = bulletPoints.join("\n");
  const platformLinks = [{ platform: "Amazon", url }];

  return productName && currentPrice && imageUrl
    ? {
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
      }
    : null;
};

const fetchEbayProductData = ($: cheerio.Root, url: string) => {
  const productName = $("div.vim")
    .find("h1.x-item-title__mainTitle")
    .text()
    .trim();
  // console.log("Product name: " + productName);
  const currentPriceText = $(".x-price-primary .ux-textspans").text().trim();
  const currentPrice = extractNumericPrice(currentPriceText);
  // console.log("Current price : " + currentPrice);

  const imageUrl = $("div.ux-image-carousel-item").find("img").attr("src");
  // console.log("Image url: " + imageUrl);

  const platformLinks = [{ platform: "Ebay", url }];

  return productName && currentPrice && imageUrl
    ? {
        productName,
        imageUrl,
        currentPrice,
        platformLinks,
        ratings: {
          averageRating: 0,
          reviewCount: 0,
        },
        fetchDate: new Date(),
        source: "Ebay",
      }
    : null;
};

export const handleFetchProductData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { url } = req.body;
  const isAmazon = url.includes("amazon");
  const isEbay = url.includes("ebay");

  if (!isAmazon && !isEbay) {
    res.status(501).json({
      success: false,
      message: "Not supported platform",
    });
  }

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const productData = isAmazon
      ? fetchAmazonProductData($, url)
      : isEbay
      ? fetchEbayProductData($, url)
      : null;

    if (!productData) {
      res.status(404).json({
        success: false,
        message: "Product information not found",
      });
    }

    const newProduct = new Product(productData);
    await newProduct.save();

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
