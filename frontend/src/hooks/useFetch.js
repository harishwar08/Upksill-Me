import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching data
 * @param {Function} fetchFunction - The async function to fetch data
 * @param {Array} dependencies - Dependencies array for useEffect
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};

/**
 * Custom hook for debouncing values
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {any} - Debounced value
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Custom hook for local storage
 * @param {string} key - Storage key
 * @param {any} initialValue - Initial value
 * @returns {Array} - [storedValue, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

/**
 * Custom hook for pagination
 * @param {number} totalItems - Total number of items
 * @param {number} itemsPerPage - Items per page
 * @returns {Object} - Pagination state and functions
 */
export const usePagination = (totalItems, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (page) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    startIndex,
    endIndex
  };
};
