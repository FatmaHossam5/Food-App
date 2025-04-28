import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_BASE = 'https://upskilling-egypt.com:3006/api/v1';

export function useRecipes({ page, filters }) {
  return useQuery({
    queryKey: ['recipes', page, filters],
    queryFn: () =>
      axios
        .get(`${API_BASE}/Recipe`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
          params: { pageSize: 10, pageNumber: page, ...filters },
        })
        .then(res => res.data),
    keepPreviousData: true,
  });
}

export function useTags() {
  return useQuery({
    queryKey: ['tags'],
    queryFn: () =>
      axios
        .get(`${API_BASE}/tag`, { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } })
        .then(res => res.data),
    staleTime: 300_000,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      axios
        .get(`${API_BASE}/Category`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
          params: { pageSize: 10, pageNumber: 1 },
        })
        .then(res => res.data),
    staleTime: 300_000,
  });
}

export function useCreateRecipe() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: formData =>
      axios.post(`${API_BASE}/Recipe`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['recipes'] }),
  });
}

export function useUpdateRecipe() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }) =>
      axios.put(`${API_BASE}/Recipe/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['recipes'] }),
  });
}

export function useDeleteRecipe() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: id =>
      axios.delete(`${API_BASE}/Recipe/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['recipes'] }),
  });
}
