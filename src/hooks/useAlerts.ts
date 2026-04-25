import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { alertsApi } from '../api';

export function useAlerts() {
  return useQuery({ queryKey: ['alerts'], queryFn: alertsApi.getAlerts });
}

export function useCreateAlert() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: alertsApi.createAlert,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['alerts'] }),
  });
}

export function useDeleteAlert() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: alertsApi.deleteAlert,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['alerts'] }),
  });
}

export function useToggleAlert() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) =>
      alertsApi.toggleAlert(id, active),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['alerts'] }),
  });
}
