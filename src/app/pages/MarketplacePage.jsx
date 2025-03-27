import React, { useState, useEffect } from 'react';
import { api as marketplaceApi } from '../../modules/marketplace/api';
import ProductGrid from '../../modules/marketplace/ui/ProductGrid';
import Container from '../../modules/core/ui/Container';
import Button from '../../modules/core/ui/Button';
import Input from '../../modules/core/ui/Input';

export default function MarketplacePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: '',
    maxPrice: '',
    search: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await marketplaceApi.getCategories();
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const filtersToApply = {
          ...filters,
          minPrice: filters.minPrice ? parseFloat(filters.minPrice) : undefined,
          maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : undefined,
        };
        const products = await marketplaceApi.getProducts(filtersToApply);
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [filters]);
  
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchTerm = formData.get('search');
    handleFilterChange('search', searchTerm);
  };
  
  const clearFilters = () => {
    setFilters({
      category: 'all',
      minPrice: '',
      maxPrice: '',
      search: '',
    });
  };
  
  return (
    <Container className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden cursor-pointer"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters - Desktop */}
        <div className="hidden md:block">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="font-semibold text-lg mb-4">Filters</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="w-full px-3 py-2 border rounded-md shadow-sm box-border focus:outline-none focus:ring-1 focus:ring-blue-500 border-gray-300"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="mb-0"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="mb-0"
                />
              </div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="w-full mt-2 cursor-pointer"
            >
              Clear Filters
            </Button>
          </div>
        </div>
        
        {/* Filters - Mobile */}
        {showFilters && (
          <div className="md:hidden mb-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="font-semibold text-lg mb-4">Filters</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-md shadow-sm box-border focus:outline-none focus:ring-1 focus:ring-blue-500 border-gray-300"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="mb-0"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="mb-0"
                  />
                </div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="w-full mt-2 cursor-pointer"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
        
        {/* Products */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <form onSubmit={handleSearchSubmit} className="flex">
              <Input
                type="text"
                name="search"
                placeholder="Search marketplace..."
                className="flex-grow mb-0"
                defaultValue={filters.search}
              />
              <Button type="submit" className="ml-2 cursor-pointer">Search</Button>
            </form>
          </div>
          
          <ProductGrid products={products} isLoading={isLoading} />
        </div>
      </div>
    </Container>
  );
}