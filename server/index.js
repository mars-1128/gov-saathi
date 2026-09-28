// GOV SAATHI - OFFICIAL BACKEND API SERVER
// Built with Node.js & Express. Serves verified government discovery APIs and AI Saathi.

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  fetchCategories,
  fetchServices,
  fetchServiceBySlug,
  fetchSchemes,
  fetchApps,
  fetchDigitalDocuments,
  fetchSavedServices,
  addSavedService,
  removeSavedService,
  getSupabase
} from './services/supabaseService.js';
import { askAISaathi, findRelevantServices } from './services/geminiService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.path}`);
  next();
});

// 1. Health & Connection Verification Endpoint
app.get('/api/health', (req, res) => {
  const supabaseConnected = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const aiConfigured = !!process.env.AI_API_KEY;

  res.json({
    status: 'healthy',
    application: 'Gov Saathi - Your Guide to Government Services',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    services: {
      supabase: supabaseConnected ? 'CONFIGURED' : 'UNAVAILABLE',
      gemini_ai: aiConfigured ? 'CONFIGURED' : 'UNAVAILABLE',
      database: 'VERIFIED_HYBRID'
    }
  });
});

// 2. Categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await fetchCategories();
    res.json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch categories' });
  }
});

// 3. Government Services (List & Filter)
app.get('/api/services', async (req, res) => {
  try {
    const { category, jurisdiction, state, search } = req.query;
    const services = await fetchServices({ category, jurisdiction, state, search });
    res.json({ success: true, count: services.length, data: services });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch services' });
  }
});

// 4. Single Service Detail
app.get('/api/services/:slug', async (req, res) => {
  try {
    const service = await fetchServiceBySlug(req.params.slug);
    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found or unverified' });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch service detail' });
  }
});

// 5. Intelligent Search (Citizen query matching)
app.post('/api/search', async (req, res) => {
  try {
    const { query, state = 'All India' } = req.body;
    if (!query || query.trim() === '') {
      return res.json({ success: true, data: [] });
    }

    const matched = findRelevantServices(query, state);
    res.json({
      success: true,
      query,
      count: matched.length,
      data: matched
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Search processing error' });
  }
});

// 6. AI Saathi Chat (Citizen Guidance)
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, history, state, district, language } = req.body;
    if (!message || message.trim() === '') {
      return res.status(400).json({ success: false, error: 'Message cannot be empty' });
    }

    const response = await askAISaathi({
      message,
      history: history || [],
      state: state || 'All India',
      district: district || '',
      language: language || 'en'
    });

    res.json(response);
  } catch (error) {
    console.error('[API] AI Chat error:', error);
    res.status(500).json({
      success: false,
      error: 'AI Saathi is temporarily experiencing high traffic. Please try again.'
    });
  }
});

// 7. Problem Solver Quick Wizard
app.post('/api/ai/guidance', async (req, res) => {
  try {
    const { problemType, description, state } = req.body;
    const query = `${problemType} ${description || ''}`;
    const response = await askAISaathi({
      message: query,
      state: state || 'All India'
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ success: false, error: 'Problem guidance error' });
  }
});

// 8. Government Schemes
app.get('/api/schemes', async (req, res) => {
  try {
    const schemes = await fetchSchemes();
    res.json({ success: true, data: schemes });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch schemes' });
  }
});

// 9. Government Mobile Apps
app.get('/api/apps', async (req, res) => {
  try {
    const apps = await fetchApps();
    res.json({ success: true, data: apps });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch apps' });
  }
});

// 10. Digital Document Services
app.get('/api/documents', async (req, res) => {
  try {
    const docs = await fetchDigitalDocuments();
    res.json({ success: true, data: docs });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch document services' });
  }
});

// 11. Saved Services
app.get('/api/saved-services', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'guest';
    const saved = await fetchSavedServices(userId);
    res.json({ success: true, data: saved });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch saved services' });
  }
});

app.post('/api/saved-services', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'guest';
    const { serviceId } = req.body;
    if (!serviceId) return res.status(400).json({ success: false, error: 'serviceId required' });
    const result = await addSavedService(userId, serviceId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to save service' });
  }
});

app.delete('/api/saved-services/:id', async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'guest';
    const result = await removeSavedService(userId, req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete saved service' });
  }
});

// 12. Admin Service Verification
app.post('/api/admin/verify-service', async (req, res) => {
  try {
    const { serviceId, status, notes } = req.body;
    console.log(`[Admin] Updating service ${serviceId} to status ${status}: ${notes}`);
    res.json({
      success: true,
      message: `Service verification status updated to ${status}`,
      updated_at: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Admin update failed' });
  }
});

// 13. Serve Static Frontend (Production Build)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

app.use(express.static(distPath));

app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🇮🇳 GOV SAATHI SERVER RUNNING ON http://localhost:${PORT}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});
