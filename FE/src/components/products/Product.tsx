import React from 'react';
import { ProductProps } from '../../rules/props/ProductProps';

function Product({
    productName,
    description,
    imageUrl,
    currentPrice,
    platformLinks,
    ratings,
    fetchDate,
    source,
}: ProductProps) {
    return (
        <div className="p-4 border rounded-lg shadow-md max-w-md mx-auto">
            {/* Hiển thị tên sản phẩm */}
            {productName && <h2 className="text-xl font-semibold">{productName}</h2>}

            {/* Hiển thị mô tả */}
            {description && <p className="text-gray-600 mt-2">{description}</p>}

            {/* Hiển thị hình ảnh */}
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={productName}
                    className="w-full h-64 object-cover rounded-lg mt-4"
                />
            )}

            {/* Hiển thị giá */}
            {currentPrice !== undefined && (
                <p className="text-lg font-semibold text-blue-500 mt-2">
                    ${currentPrice.toFixed(2)}
                </p>
            )}

            {/* Hiển thị các liên kết nền tảng */}
            {platformLinks && platformLinks.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Available on:</h3>
                    <ul className="list-disc pl-5">
                        {platformLinks.map((link, index) => (
                            <li key={index}>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    {link.platform}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Hiển thị đánh giá */}
            {ratings && (
                <div className="mt-4">
                    <p>Average Rating: {ratings.averageRating}</p>
                    <p>Review Count: {ratings.reviewCount}</p>
                </div>
            )}

            {/* Hiển thị ngày lấy dữ liệu */}
            {fetchDate && (
                <p className="text-sm text-gray-500 mt-2">
                    Fetched on: {fetchDate.toLocaleDateString()}
                </p>
            )}

            {/* Hiển thị nguồn dữ liệu */}
            {source && (
                <p className="text-sm text-gray-500 mt-2">Source: {source}</p>
            )}
        </div>
    );
}

export default Product;
