const RAW_URL = import.meta.env.VITE_API_URL || 'https://kochi-innovation.onrender.com';
const CLEAN_URL = RAW_URL.replace(/\/+$/, '');
const BASE_URL = CLEAN_URL.endsWith('/api') ? CLEAN_URL : `${CLEAN_URL}/api`;

export const api = {
  // Event Content
  async getEventContent() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);
      const res = await fetch(`${BASE_URL}/event`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error('Failed to fetch event content');
      return res.json();
    } catch (err) {
      console.warn('Event content fetch failed or timed out, using default config:', err.message);
      return { success: false };
    }
  },

  async updateEventContent(content) {
    const res = await fetch(`${BASE_URL}/event`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    });
    if (!res.ok) throw new Error('Failed to update event content');
    return res.json();
  },

  async resetEventContent() {
    const res = await fetch(`${BASE_URL}/event/reset`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to reset event content');
    return res.json();
  },

  // Nominations / Registrations
  async register(registrationData) {
    const res = await fetch(`${BASE_URL}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
  },

  async getRegistrations(params = {}) {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.status) query.append('status', params.status);
    if (params.role) query.append('role', params.role);

    const url = `${BASE_URL}/registrations${query.toString() ? '?' + query.toString() : ''}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch registrations');
    return res.json();
  },

  async getStats() {
    const res = await fetch(`${BASE_URL}/registrations/stats`);
    if (!res.ok) throw new Error('Failed to fetch statistics');
    return res.json();
  },

  async updateStatus(id, status) {
    const res = await fetch(`${BASE_URL}/registrations/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update nomination status');
    return res.json();
  },

  async deleteRegistration(id, { deletedBy = 'Admin', reason = '' } = {}) {
    const res = await fetch(`${BASE_URL}/registrations/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deletedBy, reason })
    });
    if (!res.ok) throw new Error('Failed to delete nomination');
    return res.json();
  },

  async getDeletedRegistrations({ search = '' } = {}) {
    const q = new URLSearchParams();
    if (search) q.append('search', search);
    const res = await fetch(`${BASE_URL}/registrations/deleted${q.toString() ? '?' + q : ''}`);
    if (!res.ok) throw new Error('Failed to fetch deleted registrations');
    return res.json();
  },

  async restoreRegistration(id) {
    const res = await fetch(`${BASE_URL}/registrations/deleted/${id}/restore`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error('Failed to restore registration');
    return res.json();
  },

  async uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error('Failed to upload image');
    return res.json();
  },

  getExportCsvUrl() {
    return `${BASE_URL}/registrations/export/csv`;
  }
};
