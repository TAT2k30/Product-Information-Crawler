import React, { useState } from 'react';
import { HomePageProps } from '../../../rules/props/HomePageProps';
import { ProductProps } from '../../../rules/props/ProductProps';
import { IProduct } from '../../../rules/interfaces/Product.interface';
import Product from '../../../components/products/Product';

function HomePage({ currentBodyLightMode, currentShadowLightMode, currentTextLightMode, isLightMode, setLightMode }: HomePageProps) {
    const [url, setUrl] = useState('');
    const [isFetch, setIsFetch] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [product, setProduct] = useState<IProduct>();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true); 

        try {
            const response = await fetch('http://localhost:3000/gateWay/fetchData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                throw new Error('Failed to crawl the URL');
            }

            const data = await response.json();
            console.log('Crawling result:', data);
            setIsFetch(true);
            setProduct(data.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);  
        }
    };

    const formattedProduct: ProductProps = {
        isLightMode,
        currentBodyLightMode,
        currentShadowLightMode,
        currentTextLightMode,
        productName: product?.productName || "Sample Product",
        description: product?.description || "This is a sample description.",
        imageUrl: product?.imageUrl || "https://via.placeholder.com/150",
        currentPrice: product?.currentPrice || 0,
        platformLinks: product?.platformLinks || [{ platform: "Amazon", url: url }],
        ratings: product?.ratings || { averageRating: 0, reviewCount: 0 },
        fetchDate: product?.fetchDate ? new Date(product.fetchDate) : new Date(),
        source: product?.source || "Sample Source",
    };

    return (
        <div className={`flex flex-col mt-10 justify-center items-center ${isLightMode ? 'bg-white' : 'bg-commonBlack'} transition-colors duration-500`}>
            <div className={`mb-4 text-lg font-semibold ${isLightMode ? 'text-commonBlack hover:text-commonHoverBlack' : 'text-commonBlue hover:text-commonHoverBlue'} transition-colors duration-500`}>
                Supported Platforms:
                <div className="flex gap-6 mt-5">
                    <img src="https://rubee.com.vn/wp-content/uploads/2021/06/thiet-ke-logo-cua-ebay.jpeg" alt="eBay" className="w-20 h-20 object-contain rounded-lg shadow-md" />
                    <img src="https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1536x1024.png.webp" alt="Amazon" className="w-20 h-20 object-contain rounded-lg shadow-md" />
                </div>
            </div>
            <form className="w-full max-w-md space-y-4 transition-all duration-300" onSubmit={handleSubmit}>
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative">
                    <input
                        type="search"
                        id="search"
                        className={`block w-full p-4 pl-10 text-sm rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500 transition-all duration-500
                            ${isLightMode ? 'text-gray-700 bg-white border border-gray-300' : 'text-white bg-gray-800 border border-gray-700'}
                        `}
                        placeholder="Input product's URL for searching . . ."
                        required
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className={`w-5 h-5 ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10 4a7 7 0 110 14 7 7 0 010-14z" />
                        </svg>
                    </div>
                    <button
                        type="submit"
                        className={`absolute right-2.5 bottom-2.5 px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300
                            ${isLightMode ? 'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-600' : 'bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-400'}
                        `}
                    >
                        {isLoading ? 'Loading...' : 'Crawl'}
                    </button>
                </div>
            </form>

            {isLoading && (
                <div className="mt-10 animate-spin text-gray-500">
                    <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.75V6.25M12 17.75V19.25M4.75 12H6.25M17.75 12H19.25M7.757 7.757L9.172 9.172M14.828 14.828L16.243 16.243M16.243 7.757L14.828 9.172M9.172 14.828L7.757 16.243" />
                    </svg>
                    <p>Loading data...</p>
                </div>
            )}

            {isFetch && !isLoading && (
                <div className="mt-20">
                    <Product {...formattedProduct} />
                </div>
            )}
        </div>
    );
}

export default HomePage;
