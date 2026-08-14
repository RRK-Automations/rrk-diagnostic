import { fetchApi } from './apiClient';

export interface CreateAppointmentPayload {
  patientName: string;
  phone: string;
  email?: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  bookingType?: 'walk-in' | 'home_collection';
  address?: string;
  landmark?: string;
  fastingRequired?: boolean;
  packageId?: string;
  referringDoctor?: string;
}

export async function createAppointment(payload: CreateAppointmentPayload) {
  return fetchApi('/appointments', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function getAppointments(filters: { search?: string; status?: string; sort?: string } = {}) {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.status) params.append('status', filters.status);
  if (filters.sort) params.append('sort', filters.sort);

  const queryString = params.toString() ? `?${params.toString()}` : '';
  return fetchApi(`/appointments${queryString}`, {
    method: 'GET'
  });
}

export async function updateAppointmentStatus(id: string, status: string, message?: string) {
  return fetchApi(`/appointments/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status, message })
  });
}

export async function getAppointmentDetail(id: string) {
  return fetchApi(`/appointments/${id}`, {
    method: 'GET'
  });
}
