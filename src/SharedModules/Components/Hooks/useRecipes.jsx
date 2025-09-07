import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_BASE = 'https://upskilling-egypt.com:3006/api/v1';

export function useRecipes({ page, filters }) {
  return useQuery({
    queryKey: ['recipes', page, filters],
    queryFn: () => {
      // Check if this is a demo account
      const token = localStorage.getItem("adminToken");
      if (token && token.includes('demo-signature')) {
        // Return mock data for demo account
        return new Promise((resolve) => {
          setTimeout(() => {
            const mockRecipes = [
              {
                id: 1,
                name: "Margherita Pizza",
                description: "Classic Italian pizza with fresh tomatoes, mozzarella, and basil",
                price: 12.99,
                imagePath: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop",
                tag: { id: 1, name: "Italian" },
                category: [{ id: 8, name: "Pizza" }]
              },
              {
                id: 2,
                name: "Chicken Caesar Salad",
                description: "Fresh romaine lettuce with grilled chicken, parmesan cheese, and caesar dressing",
                price: 9.99,
                imagePath: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop",
                tag: { id: 2, name: "Healthy" },
                category: [{ id: 5, name: "Salads" }]
              },
              {
                id: 3,
                name: "Chocolate Lava Cake",
                description: "Warm chocolate cake with a molten chocolate center, served with vanilla ice cream",
                price: 7.99,
                imagePath: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=200&fit=crop",
                tag: { id: 3, name: "Dessert" },
                category: [{ id: 3, name: "Desserts" }]
              },
              {
                id: 4,
                name: "Grilled Salmon",
                description: "Fresh Atlantic salmon grilled to perfection with herbs and lemon",
                price: 18.99,
                imagePath: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop",
                tag: { id: 4, name: "Seafood" },
                category: [{ id: 9, name: "Seafood" }]
              },
              {
                id: 5,
                name: "Beef Burger",
                description: "Juicy beef patty with lettuce, tomato, onion, and special sauce",
                price: 11.99,
                imagePath: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
                tag: { id: 5, name: "American" },
                category: [{ id: 11, name: "Fast Food" }]
              },
              {
                id: 6,
                name: "Vegetarian Pasta",
                description: "Fresh pasta with seasonal vegetables in a light olive oil sauce",
                price: 13.99,
                imagePath: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop",
                tag: { id: 6, name: "Vegetarian" },
                category: [{ id: 7, name: "Pasta" }]
              },
              {
                id: 7,
                name: "Chicken Wings",
                description: "Crispy chicken wings with your choice of buffalo, BBQ, or honey garlic sauce",
                price: 8.99,
                imagePath: "https://images.unsplash.com/photo-1567620832904-9fe5cf23db13?w=300&h=200&fit=crop",
                tag: { id: 7, name: "Appetizer" },
                category: [{ id: 1, name: "Appetizers" }]
              },
              {
                id: 8,
                name: "Fresh Orange Juice",
                description: "Freshly squeezed orange juice, served chilled",
                price: 3.99,
                imagePath: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=300&h=200&fit=crop",
                tag: { id: 8, name: "Beverage" },
                category: [{ id: 4, name: "Beverages" }]
              }
            ];

            // Filter recipes based on search criteria
            let filteredRecipes = mockRecipes;
            
            if (filters.name) {
              filteredRecipes = filteredRecipes.filter(recipe => 
                recipe.name.toLowerCase().includes(filters.name.toLowerCase())
              );
            }
            
            if (filters.tagId) {
              filteredRecipes = filteredRecipes.filter(recipe => 
                recipe.tag.id === parseInt(filters.tagId)
              );
            }
            
            if (filters.categoryId) {
              filteredRecipes = filteredRecipes.filter(recipe => 
                recipe.category[0].id === parseInt(filters.categoryId)
              );
            }

            // Simulate pagination
            const pageSize = 10;
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedRecipes = filteredRecipes.slice(startIndex, endIndex);
            const totalPages = Math.ceil(filteredRecipes.length / pageSize);

            resolve({
              data: paginatedRecipes,
              totalNumberOfPages: totalPages,
              currentPage: page
            });
          }, 800); // Simulate API delay
        });
      }

      // Regular API call for non-demo accounts
      return axios
        .get(`${API_BASE}/Recipe`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
          params: { pageSize: 10, pageNumber: page, ...filters },
        })
        .then(res => res.data);
    },
    keepPreviousData: true,
  });
}

export function useTags() {
  return useQuery({
    queryKey: ['tags'],
    queryFn: () => {
      // Check if this is a demo account
      const token = localStorage.getItem("adminToken");
      if (token && token.includes('demo-signature')) {
        // Return mock tags for demo account
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              { id: 1, name: "Italian" },
              { id: 2, name: "Healthy" },
              { id: 3, name: "Dessert" },
              { id: 4, name: "Seafood" },
              { id: 5, name: "American" },
              { id: 6, name: "Vegetarian" },
              { id: 7, name: "Appetizer" },
              { id: 8, name: "Beverage" }
            ]);
          }, 300);
        });
      }

      // Regular API call for non-demo accounts
      return axios
        .get(`${API_BASE}/tag`, { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } })
        .then(res => res.data);
    },
    staleTime: 300_000,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      // Check if this is a demo account
      const token = localStorage.getItem("adminToken");
      if (token && token.includes('demo-signature')) {
        // Return mock categories for demo account
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              data: [
                { id: 1, name: "Appetizers" },
                { id: 2, name: "Main Courses" },
                { id: 3, name: "Desserts" },
                { id: 4, name: "Beverages" },
                { id: 5, name: "Salads" },
                { id: 6, name: "Soups" },
                { id: 7, name: "Pasta" },
                { id: 8, name: "Pizza" },
                { id: 9, name: "Seafood" },
                { id: 10, name: "Vegetarian" },
                { id: 11, name: "Fast Food" },
                { id: 12, name: "Healthy" }
              ]
            });
          }, 300);
        });
      }

      // Regular API call for non-demo accounts
      return axios
        .get(`${API_BASE}/Category`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
          params: { pageSize: 10, pageNumber: 1 },
        })
        .then(res => res.data);
    },
    staleTime: 300_000,
  });
}

export function useCreateRecipe() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: formData => {
      // Check if this is a demo account
      const token = localStorage.getItem("adminToken");
      if (token && token.includes('demo-signature')) {
        // Simulate demo create operation
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: { message: 'Demo: Recipe created successfully!' } });
          }, 1000);
        });
      }

      // Regular API call for non-demo accounts
      return axios.post(`${API_BASE}/Recipe`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['recipes'] }),
  });
}

export function useUpdateRecipe() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }) => {
      // Check if this is a demo account
      const token = localStorage.getItem("adminToken");
      if (token && token.includes('demo-signature')) {
        // Simulate demo update operation
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: { message: 'Demo: Recipe updated successfully!' } });
          }, 1000);
        });
      }

      // Regular API call for non-demo accounts
      return axios.put(`${API_BASE}/Recipe/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['recipes'] }),
  });
}

export function useDeleteRecipe() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: id => {
      // Check if this is a demo account
      const token = localStorage.getItem("adminToken");
      if (token && token.includes('demo-signature')) {
        // Simulate demo delete operation
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: { message: 'Demo: Recipe deleted successfully!' } });
          }, 1000);
        });
      }

      // Regular API call for non-demo accounts
      return axios.delete(`${API_BASE}/Recipe/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['recipes'] }),
  });
}
