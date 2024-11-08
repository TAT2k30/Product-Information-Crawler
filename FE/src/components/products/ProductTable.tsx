import React, { useState } from 'react';
import { IProduct } from '../../rules/interfaces/Product.interface';
import { CommonProps } from '../../rules/props/commons/CommonProps';

interface ProductTableProps extends CommonProps {
    products: IProduct[];

}

const ProductTable: React.FC<ProductTableProps> = ({ products, currentBodyLightMode, currentShadowLightMode, currentTextLightMode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [imageSrc, setImageSrc] = useState<string>('');

    const handleImageClick = (src: string) => {
        setImageSrc(src);
        setIsOpen(true);
    };

    const closeModal = () => setIsOpen(false);

    const handleCutUpName = (input: string): string => {
        if (input.length > 50) {
            return input.slice(0, 50) + " . . .";
        } else {
            return input;
        }
    }

    return (
        <div className="overflow-x-auto m-10">
            <table className={`min-w-full table-auto border-collapse ${currentBodyLightMode} ${currentTextLightMode} border-2 border-commonHoverBlack rounded-lg shadow-md  transition-all duration-500`}>
                <thead>
                    <tr className="border-b text-left">
                        <th className={`p-4 text-sm font-semibold ${currentTextLightMode}  transition-all duration-500`}>Product Name</th>
                        <th className={`p-4 text-sm font-semibold ${currentTextLightMode}  transition-all duration-500`}>Price</th>
                        <th className={`p-4 text-sm font-semibold ${currentTextLightMode}  transition-all duration-500`}>Platform</th>
                        <th className={`p-4 text-sm font-semibold ${currentTextLightMode}  transition-all duration-500`}>Fetched Date</th>
                        <th className={`p-4 text-sm font-semibold ${currentTextLightMode}  transition-all duration-500`}>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr
                            key={index}
                            className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200  transition-all duration-500"
                        >
                            <td className={`p-4 text-sm font-semibold ${currentTextLightMode}  transition-all duration-500`}>{handleCutUpName(product.productName!)}</td>
                            <td className="p-4 text-sm text-blue-500  transition-all duration-500">${product.currentPrice?.toFixed(2)}</td>
                            <td className="p-4 text-sm">
                                {product.platformLinks && product.platformLinks.length > 0 ? (
                                    <ul className="space-y-1">
                                        {product.platformLinks.map((link, idx) => (
                                            <li key={idx}>
                                                <a
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {link.platform}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    'N/A'
                                )}
                            </td>
                            <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                                {product.fetchDate
                                    ? new Date(product.fetchDate).toLocaleDateString()
                                    : 'N/A'}
                            </td>
                            <td className="p-4">
                                {product.imageUrl && (
                                    <img
                                        src={product.imageUrl}
                                        alt="Product"
                                        className="w-16 h-16 object-cover rounded-lg cursor-pointer"
                                        onClick={() => handleImageClick(product.imageUrl!)}
                                    />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Popup Image Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={closeModal}
                >
                    <div className="relative">
                        <img src={imageSrc} alt="Product" className="max-w-full max-h-[90vh] object-contain rounded-lg" />
                        <button
                            className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
                            onClick={closeModal}
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductTable;
