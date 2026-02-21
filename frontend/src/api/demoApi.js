import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from './apiClient';

const DEMOS_KEY = 'demos';

const fetchDemos = async () => {
  const { data } = await apiClient.get('/demo');
  return data;
};

const createDemo = async (content) => {
  const { data } = await apiClient.post('/demo', { content: content });
  return data;
};

const deleteDemo = async (id) => {
  await apiClient.delete(`/demo/${id}`);
};

export const useDemos = () => {
  return useQuery({
    queryKey: [DEMOS_KEY],
    queryFn: fetchDemos,
  });
};

export const useCreateDemo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDemo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DEMOS_KEY] });
    },
  });
};

export const useDeleteDemo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDemo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DEMOS_KEY] });
    },
  });
};
