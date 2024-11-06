import React from 'react';
import { HomePageProps } from '../../../rules/props/HomePageProps';

function HomePage({ currentBodyLightMode, currentShadowLightMode, currentTextLightMode, isLightMode, setLightMode }: HomePageProps) {
    return (
        <div className={`flex flex-col justify-center items-center min-h-screen pt-8 -mt-8 ${isLightMode ? 'bg-white' : 'bg-commonBlack'} transition-colors duration-500`}>
            <div className={`mb-4 text-lg font-semibold  ${isLightMode ? 'text-commonBlack hover:text-commonHoverBlack' : 'text-commonBlue hover:text-commonHoverBlue'}  transition-colors duration-500`}>
                Supported Platforms:
                <div className="flex gap-6 mt-5">
                    <img src="https://rubee.com.vn/wp-content/uploads/2021/06/thiet-ke-logo-cua-ebay.jpeg" alt="eBay" className="w-20 h-20 object-contain rounded-lg shadow-md" />
                    <img src="https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1536x1024.png.webp" alt="Amazon" className="w-20 h-20 object-contain rounded-lg shadow-md" />
                </div>
            </div>
            <form className="w-full max-w-md space-y-4 transition-all duration-300">
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative">
                    <input
                        type="search"
                        id="search"
                        className={`block w-full p-4 pl-10 text-sm rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500 transition-all duration-500
                            ${isLightMode ? 'text-gray-700 bg-white border border-gray-300' : 'text-white bg-gray-800 border border-gray-700'}
                        `}
                        placeholder="Input product's url for searching . . ."
                        required
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
                        Crawl
                    </button>
                </div>
            </form>
        </div>
    );
}

export default HomePage;
