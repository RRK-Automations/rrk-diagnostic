import { fetchApi } from './apiClient';

export async function searchReports(query: string) {
  return fetchApi(`/reports?query=${encodeURIComponent(query)}`, {
    method: 'GET'
  });
}

export async function getReportById(id: string) {
  return fetchApi(`/reports/${id}`, {
    method: 'GET'
  });
}

export async function getAllReportsAdmin() {
  return fetchApi('/reports', {
    method: 'GET'
  });
}

export async function createReport(payload: any) {
  return fetchApi('/reports', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}
