import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductTable from '../../../components/products/ProductTable';
import { ViewProps } from '../../../rules/props/ViewProps';
import { IProduct } from '../../../rules/interfaces/Product.interface';

function ViewPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [filters, setFilters] = useState({
        name: '',
        priceRange: { min: 0, max: 1000 },
    });
    const [pagination, setPagination] = useState({ page: 1, pageSize: 5, totalCount: 0 });
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

    // Fetch data từ API khi component được render
    useEffect(() => {
        axios.get('http://localhost:3000/gateWay/getData')
            .then((response) => {
                setProducts(response.data);
                setPagination((prev) => ({
                    ...prev,
                    totalCount: response.data.length,
                }));
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Lọc dữ liệu khi bộ lọc hoặc phân trang thay đổi
    useEffect(() => {
        const filtered = products.filter((product) => {
            const isNameMatch = product.productName!
                .toLowerCase()
                .includes(filters.name.toLowerCase());
            const isPriceInRange =
                product.currentPrice! >= filters.priceRange.min &&
                product.currentPrice! <= filters.priceRange.max;
            return isNameMatch && isPriceInRange;
        });

        // Cập nhật lại số lượng sản phẩm sau khi lọc
        setPagination((prev) => ({
            ...prev,
            totalCount: filtered.length,
        }));

        // Phân trang
        const paginatedProducts = filtered.slice(
            (pagination.page - 1) * pagination.pageSize,
            pagination.page * pagination.pageSize
        );

        setFilteredProducts(paginatedProducts);
    }, [filters, pagination.page, products]);

    // Xử lý thay đổi bộ lọc
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    // Xử lý thay đổi phạm vi giá
    const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            priceRange: {
                ...prevFilters.priceRange,
                [name]: Number(value),
            },
        }));
    };

    // Xử lý thay đổi trang
    const handlePaginationChange = (page: number) => {
        if (page > 0 && page <= Math.ceil(pagination.totalCount / pagination.pageSize)) {
            setPagination((prevPagination) => ({
                ...prevPagination,
                page,
            }));
        }
    };

    return (
        <div className="mt-10">
            <div className="mb-6 flex justify-between items-center">
                {/* Bộ lọc theo tên sản phẩm */}
                <input
                    type="text"
                    name="name"
                    value={filters.name}
                    onChange={handleFilterChange}
                    placeholder="Filter by product name"
                    className="p-2 border rounded-md w-1/3"
                />

                {/* Bộ lọc theo giá */}
                <div className="flex space-x-4">
                    <input
                        type="number"
                        name="min"
                        value={filters.priceRange.min}
                        onChange={handlePriceRangeChange}
                        placeholder="Min price"
                        className="p-2 border rounded-md"
                    />
                    <input
                        type="number"
                        name="max"
                        value={filters.priceRange.max}
                        onChange={handlePriceRangeChange}
                        placeholder="Max price"
                        className="p-2 border rounded-md"
                    />
                </div>
            </div>

            {/* Hiển thị bảng sản phẩm */}
            <ProductTable products={filteredProducts} />

            {/* Phân trang */}
            <div className="mt-4 flex justify-center">
                <button
                    onClick={() => handlePaginationChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                >
                    Previous
                </button>
                <span className="mx-4 text-lg">
                    Page {pagination.page} of {Math.ceil(pagination.totalCount / pagination.pageSize)}
                </span>
                <button
                    onClick={() => handlePaginationChange(pagination.page + 1)}
                    disabled={pagination.page === Math.ceil(pagination.totalCount / pagination.pageSize)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default ViewPage;
