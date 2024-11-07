import React from 'react';
import { ProductProps } from '../../rules/props/ProductProps';
import { IProduct } from '../../rules/interfaces/Product.interface';

interface ProductTableProps {
    products: IProduct[]; 
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse bg-white dark:bg-gray-800">
                <thead>
                    <tr className="border-b text-left">
                        <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-200">Product Name</th>
                        <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-200">Description</th>
                        <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-200">Price</th>
                        <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-200">Platform</th>
                        <th className="p-4 text-sm font-semibold text-gray-700 dark:text-gray-200">Fetched Date</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                            <td className="p-4 text-sm text-gray-800 dark:text-white">{product.productName}</td>
                            <td className="p-4 text-sm text-gray-600 dark:text-gray-300">
                                {product.description && product.description.length > 100
                                    ? `${product.description.substring(0, 100)}...`
                                    : product.description}
                            </td>
                            <td className="p-4 text-sm text-blue-500">${product.currentPrice?.toFixed(2)}</td>
                            <td className="p-4 text-sm">
                                {product.platformLinks ? (
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
                                {product.fetchDate ? product.fetchDate.toLocaleDateString() : 'N/A'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
