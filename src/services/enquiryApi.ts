import { fetchApi } from './apiClient';

export interface CreateEnquiryPayload {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message: string;
}

export async function createEnquiry(payload: CreateEnquiryPayload) {
  return fetchApi('/enquiries', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function getEnquiries(filters: { search?: string; status?: string } = {}) {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.status) params.append('status', filters.status);

  const queryString = params.toString() ? `?${params.toString()}` : '';
  return fetchApi(`/enquiries${queryString}`, {
    method: 'GET'
  });
}

export async function updateEnquiryStatus(id: string, status: string) {
  return fetchApi(`/enquiries/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
}
