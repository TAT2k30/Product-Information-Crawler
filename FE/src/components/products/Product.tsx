import React, { useState } from 'react';
import { ProductProps } from '../../rules/props/ProductProps';

function Product({
    isLightMode,
    currentBodyLightMode,
    currentShadowLightMode,
    currentTextLightMode,
    productName,
    description,
    imageUrl,
    currentPrice,
    platformLinks,
    ratings,
    fetchDate,
    source,
}: ProductProps) {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    const toggleDescription = () => {
        setIsDescriptionExpanded(!isDescriptionExpanded);
    };

    const shortenedDescription = description && description.length > 100
        ? `${description.substring(0, 100)}...`
        : description;

    return (
        <div
            className={`p-6 border rounded-xl shadow-lg max-w-md mx-auto transition-all duration-300 ease-in-out transform hover:scale-105 ${currentBodyLightMode} ${isLightMode ? "border-2 border-commonBlack" : "border-2 border-commonBlue"}`}
        >
            {/* Hiển thị tên sản phẩm */}
            {productName && <h2 className={`text-2xl font-bold mb-3 ${currentTextLightMode}`}>{productName}</h2>}

            {/* Hiển thị mô tả */}
            {description && (
                <p className={`${isLightMode ? "text-commonBlack" : "text-white"} mt-2 text-sm`}>
                    {isDescriptionExpanded ? description : shortenedDescription}
                    {description.length > 100 && (
                        <button
                            onClick={toggleDescription}
                            className="text-blue-600 ml-2 underline font-medium hover:text-blue-800"
                        >
                            {isDescriptionExpanded ? "See less" : "See more"}
                        </button>
                    )}
                </p>
            )}

            {/* Hiển thị hình ảnh */}
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={productName}
                    className="w-full h-64 object-cover rounded-lg mt-4 transition-transform duration-300 transform hover:scale-105"
                />
            )}

            {/* Hiển thị giá */}
            {currentPrice !== undefined && (
                <p className={`text-lg font-semibold text-blue-500 mt-2 ${currentTextLightMode}`}>
                    ${currentPrice.toFixed(2)}
                </p>
            )}

            {/* Hiển thị các liên kết nền tảng */}
            {platformLinks && platformLinks.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Available on:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        {platformLinks.map((link, index) => (
                            <li key={index}>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${currentTextLightMode} text-blue-600 hover:underline`}
                                >
                                    {link.platform}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Hiển thị đánh giá
            {ratings && (
                <div className="mt-4">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Average Rating: {ratings.averageRating}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Review Count: {ratings.reviewCount}</p>
                </div>
            )} */}

            {/* Hiển thị ngày lấy dữ liệu */}
            {fetchDate && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Fetched on: {fetchDate.toLocaleDateString()}
                </p>
            )}

            {/* Hiển thị nguồn dữ liệu */}
            {source && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Source: {source}</p>
            )}
        </div>
    );
}

export default Product;
