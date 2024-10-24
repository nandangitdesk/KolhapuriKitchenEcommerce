import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productAction';
import ProductCard from './layouts/ProductCard';
import MetaData from './layouts/MetaData';
import Loader from './layouts/Loader';
import Navbar from './layouts/Navbar';
import { useParams } from 'react-router-dom';
import { clearErrors } from '../actions/productAction';

const Products = () => {
    const { keyword } = useParams();
    const dispatch = useDispatch();
    const { products=[], loading, error } = useSelector(state => state.products);

    // State for filters
    const [priceFilter, setPriceFilter] = useState(2000); // Single price range filter, default to 2000
    const [filteredProducts, setFilteredProducts] = useState(products); // Initialize with all products

    useEffect(() => {
        dispatch(getProducts(keyword));
    }, [dispatch, keyword]);

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
            console.error("Error fetching products:", error);
        }
    }, [error]);

    // Use effect to update filtered products when products or filters change
    useEffect(() => {
        applyFilters();
    }, [products, priceFilter]);

    // Apply filters
    const applyFilters = () => {
        const newFilteredProducts = products.filter((product) => product.price <= priceFilter);
        setFilteredProducts(newFilteredProducts);
    };

    // Reset filters
    const resetFilters = () => {
        setPriceFilter(2000); // Reset to max price
    };

    // Determine which products to display
    const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;

    return (
        <div>
            <MetaData title="Products" />
            <Navbar />
            <h1 className='text-2xl font-bold text-center mb-4 mt-24'>Products</h1>
            <div className="flex flex-col md:flex-row container mx-auto px-4 py-8 scrollbar-hide">
                {/* Filter Section */}
                <div className=" md:block md:w-1/4">
                    <div className="sticky top-24 p-4 bg-gray-100 rounded-lg shadow-md mb-4">
                        <h2 className='font-semibold mb-2'>Filter by Price</h2>
                        <label className='block mb-1'>Max Price: ₹{priceFilter}</label>
                        <input
                            type="range"
                            min="0"
                            max="2000"
                            value={priceFilter}
                            onChange={(e) => setPriceFilter(parseInt(e.target.value))}
                            className="slider w-full"
                        />
                        <div className="filter-buttons mt-2">
                            <button 
                                onClick={applyFilters} 
                                className='bg-black text-white p-2 rounded mr-2 w-full mb-2'
                            >
                                Apply Filter
                            </button>
                            <button 
                                onClick={resetFilters} 
                                className='bg-gray-300 text-black p-2 rounded w-full'
                            >
                                Reset Filter
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Grid Section */}
                <div className="w-full md:w-3/4 ml-16 md:ml-0 scrollbar-hide">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto max-h-screen scrollbar-hide'>
                            {displayProducts && displayProducts.length > 0 ? (
                                displayProducts.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            ) : (
                                <p>No products available</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;
