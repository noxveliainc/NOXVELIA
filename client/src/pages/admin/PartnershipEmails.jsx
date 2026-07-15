import React, { useEffect, useMemo, useState } from 'react';
import { Icon } from '@mdi/react';
import {
  mdiAccountPlusOutline,
  mdiAlertOutline,
  mdiCheck,
  mdiCheckCircleOutline,
  mdiChevronRight,
  mdiClose,
  mdiClipboardTextOutline,
  mdiContentSaveOutline,
  mdiDownloadOutline,
  mdiEmailFastOutline,
  mdiEmailOpenOutline,
  mdiFileUploadOutline,
  mdiMagnify,
  mdiPause,
  mdiPlay,
  mdiRefresh,
  mdiSendOutline,
  mdiShieldOffOutline,
  mdiTuneVariant,
} from '@mdi/js';
import api from '../../services/api';

const DEFAULT_COLORS = {
  panel: '#0a0f1e',
  panelAlt: '#0d1426',
  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(255,255,255,0.14)',
  text: '#e7ecf7',
  textDim: '#7c8aa8',
  textFaint: '#4b5772',
  gold: '#f0b429',
  goldDim: 'rgba(240,180,41,0.12)',
  red: '#ef4444',
  redDim: 'rgba(239,68,68,0.1)',
  green: '#22d3a5',
  greenDim: 'rgba(34,211,165,0.1)',
  blue: '#5b9dff',
  blueDim: 'rgba(91,157,255,0.1)',
  purple: '#a78bfa',
  purpleDim: 'rgba(167,139,250,0.1)',
};

const DEFAULT_FONTS = {
  display: "'Space Grotesk', 'Plus Jakarta Sans', sans-serif",
  body: "'Inter', sans-serif",
  mono: "'JetBrains Mono', 'IBM Plex Mono', monospace",
};

const CONTACT_STATES = [
  'novo',
  'valido',
  'invalido',
  'contactado',
  'respondeu',
  'interessado',
  'convertido',
  'removido',
  'bloqueado',
];

const COMPANY_TYPES = [
  { id: 'stand', label: 'Stand' },
  { id: 'imobiliaria', label: 'Imobiliaria' },
  { id: 'outro', label: 'Outro' },
];

const emptyContact = {
  email: '',
  nomePessoa: '',
  nomeEmpresa: '',
  tipoEmpresa: 'stand',
  website: '',
  telefone: '',
  localidade: '',
  origem: 'manual',
  estado: 'novo',
  consentimentoBase: '',
  notasInternas: '',
};

const emptyCampaign = {
  nomeInterno: '',
  assunto: '',
  preheader: '',
  conteudoPrincipal: '',
  textoBotao: 'Quero aderir gratuitamente',
  urlBotao: 'https://www.noxvelia.com',
  remetente: '"Noxvelia Parcerias" <geral@noxvelia.com>',
  replyTo: 'geral@noxvelia.com',
  trackingAberturas: true,
  trackingCliques: true,
  filtrosDestinatarios: {
    tiposEmpresa: [],
    estados: ['novo', 'valido'],
    origem: '',
    contactIds: [],
  },
};

const formatNumber = (value) => new Intl.NumberFormat('pt-PT').format(Number(value || 0));

const formatDate = (value) => {
  if (!value) return '-';
  return new Intl.DateTimeFormat('pt-PT', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
};

const durationLabel = (start, end) => {
  if (!start) return '-';
  const from = new Date(start).getTime();
  const to = end ? new Date(end).getTime() : Date.now();
  const minutes = Math.max(0, Math.round((to - from) / 60000));
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return `${hours}h ${rest}m`;
};

const toPercent = (value, base) => {
  if (!base) return '0%';
  return `${Math.round((Number(value || 0) / Number(base || 1)) * 100)}%`;
};

const SENT_STATES = new Set(['enviado', 'entregue', 'aberto', 'clicado']);

const apiError = (error) => error?.response?.data?.erro || error?.message || 'Ocorreu um erro inesperado.';

const buildParams = (params) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') search.set(key, value);
  });
  return search.toString();
};

export default function PartnershipEmails({ colors = DEFAULT_COLORS, fonts = DEFAULT_FONTS }) {
  const palette = { ...DEFAULT_COLORS, ...colors };
  const typo = { ...DEFAULT_FONTS, ...fonts };

  const [section, setSection] = useState('contactos');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [summary, setSummary] = useState(null);
  const [settings, setSettings] = useState(null);

  const [contacts, setContacts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0, limit: 25 });
  const [filters, setFilters] = useState({ q: '', tipo: '', estado: '', origem: '', from: '', to: '' });
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [contactForm, setContactForm] = useState(emptyContact);
  const [editingContactId, setEditingContactId] = useState('');

  const [csvText, setCsvText] = useState('');
  const [csvPreview, setCsvPreview] = useState(null);

  const [campaigns, setCampaigns] = useState([]);
  const [campaignForm, setCampaignForm] = useState(emptyCampaign);
  const [selectedCampaignId, setSelectedCampaignId] = useState('');
  const [campaignDetail, setCampaignDetail] = useState(null);
  const [estimate, setEstimate] = useState(null);
  const [preview, setPreview] = useState(null);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [testEmail, setTestEmail] = useState('');
  const [testSentForCampaign, setTestSentForCampaign] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const [sends, setSends] = useState([]);
  const [sendFilters, setSendFilters] = useState({ q: '', estado: '' });
  const [suppressions, setSuppressions] = useState([]);
  const [replies, setReplies] = useState([]);
  const [audit, setAudit] = useState([]);

  const campaignMetrics = useMemo(() => {
    const campaign = campaignDetail?.campaign || campaigns.find((item) => item._id === selectedCampaignId);
    if (!campaign) return null;
    return [
      { label: 'Destinatarios', value: campaign.totalDestinatarios },
      { label: 'Enviados', value: campaign.totalEnviado },
      { label: 'Entregues', value: campaign.totalEntregue },
      { label: 'Abertos', value: campaign.totalAberto },
      { label: 'Clicados', value: campaign.totalClicado },
      { label: 'Falhados', value: campaign.totalErro },
      { label: 'Devolvidos', value: campaign.totalDevolvido },
      { label: 'Removidos', value: campaign.totalRemovido },
    ];
  }, [campaignDetail, campaigns, selectedCampaignId]);

  const selectedCampaign = useMemo(
    () => campaignDetail?.campaign || campaigns.find((item) => item._id === selectedCampaignId) || null,
    [campaignDetail, campaigns, selectedCampaignId]
  );
  const totalContacts = Number(summary?.totalContacts || 0);
  const totalCampaigns = Number(summary?.totalCampaigns || 0);
  const activeCampaigns = Number(summary?.activeCampaigns || 0);
  const selectedContactsCount = selectedContacts.length;
  const dailyLimit = Number(settings?.limiteDiario || 40);
  const testSent = Boolean(selectedCampaignId && testSentForCampaign === selectedCampaignId);
  const loadedSentSends = sends.filter((send) => SENT_STATES.has(send.estado)).length;
  const loadedPendingSends = sends.filter((send) => send.estado === 'pendente').length;
  let nextAction = {
    title: 'Testa antes de enviar',
    text: 'Escolhe uma campanha, gera pre-visualizacao, envia um teste para ti e so depois inicia.',
    button: 'Abrir campanhas',
    target: 'campanhas',
  };
  if (totalContacts === 0) {
    nextAction = {
      title: 'Comeca pelos contactos',
      text: 'Adiciona um contacto manualmente ou importa um CSV. A importacao so grava contactos; nunca envia emails.',
      button: 'Ir para contactos',
      target: 'contactos',
    };
  } else if (totalCampaigns === 0) {
    nextAction = {
      title: 'Cria a primeira campanha',
      text: 'O modelo ja vem preenchido. Reve o texto, escolhe destinatarios, guarda e envia um teste.',
      button: 'Criar campanha',
      target: 'campanhas',
    };
  } else if (activeCampaigns > 0) {
    nextAction = {
      title: 'Acompanha os resultados',
      text: 'Ve envios, erros, bounces, respostas e pedidos de remocao sem mexer nos emails transacionais.',
      button: 'Ver resultados',
      target: 'metricas',
    };
  }

  const loadCore = async () => {
    const [summaryRes, settingsRes, campaignsRes, suppressionsRes, repliesRes, auditRes] = await Promise.all([
      api.get('/admin/partnerships/summary'),
      api.get('/admin/partnerships/settings'),
      api.get('/admin/partnerships/campaigns'),
      api.get('/admin/partnerships/suppressions'),
      api.get('/admin/partnerships/replies'),
      api.get('/admin/partnerships/audit'),
    ]);
    setSummary(summaryRes.data);
    setSettings(settingsRes.data);
    setCampaigns(campaignsRes.data || []);
    setSuppressions(suppressionsRes.data || []);
    setReplies(repliesRes.data || []);
    setAudit(auditRes.data || []);
    if (!campaignForm.nomeInterno) {
      const defaults = await api.get('/admin/partnerships/campaigns/default');
      setCampaignForm((current) => ({ ...current, ...defaults.data }));
    }
  };

  const loadContacts = async (page = pagination.page) => {
    const query = buildParams({ ...filters, page, limit: pagination.limit });
    const { data } = await api.get(`/admin/partnerships/contacts?${query}`);
    setContacts(data.items || []);
    setPagination(data.pagination || { page, pages: 1, total: 0, limit: pagination.limit });
  };

  const refreshAll = async () => {
    setLoading(true);
    setError('');
    try {
      await Promise.all([loadCore(), loadContacts(1)]);
      setMessage('Dados de parcerias atualizados.');
    } catch (err) {
      setError(apiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateContact = (field, value) => setContactForm((current) => ({ ...current, [field]: value }));

  const resetContactForm = () => {
    setEditingContactId('');
    setContactForm(emptyContact);
  };

  const saveContact = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (editingContactId) {
        await api.put(`/admin/partnerships/contacts/${editingContactId}`, contactForm);
        setMessage('Contacto atualizado.');
      } else {
        await api.post('/admin/partnerships/contacts', contactForm);
        setMessage('Contacto criado.');
      }
      resetContactForm();
      await Promise.all([loadContacts(1), loadCore()]);
    } catch (err) {
      setError(apiError(err));
    } finally {
      setLoading(false);
    }
  };

  const editContact = (contact) => {
    setEditingContactId(contact._id);
    setContactForm({
      email: contact.email || '',
      nomePessoa: contact.nomePessoa || '',
      nomeEmpresa: contact.nomeEmpresa || '',
      tipoEmpresa: contact.tipoEmpresa || 'outro',
      website: contact.website || '',
      telefone: contact.telefone || '',
      localidade: contact.localidade || '',
      origem: contact.origem || 'manual',
      estado: contact.estado || 'novo',
      consentimentoBase: contact.consentimentoBase || '',
      notasInternas: contact.notasInternas || '',
    });
  };

  const removeContact = async (contact) => {
    const motivo = window.prompt(`Motivo para remover ${contact.email}`, 'removido pelo administrador');
    if (!motivo) return;
    setLoading(true);
    try {
      await api.delete(`/admin/partnerships/contacts/${contact._id}`, { data: { motivo } });
      setMessage('Contacto marcado como removido.');
      await Promise.all([loadContacts(), loadCore()]);
    } catch (err) {
      setError(apiError(err));
    } finally {
      setLoading(false);
    }
  };

  const toggleSelected = (id) => {
    setSelectedContacts((current) => (
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    ));
  };

  const suppressSelected = async () => {
    const emails = contacts.filter((contact) => selectedContacts.includes(contact._id)).map((contact) => contact.email);
    if (!emails.length) return;
    const motivo = window.prompt('Motivo da supressao global', 'pedido de remocao ou contacto bloqueado');
    if (!motivo) return;
    setLoading(true);
    try {
      await api.post('/admin/partnerships/contacts/suppress', { emails, motivo });
      setSelectedContacts([]);
      setMessage(`${emails.length} emails adicionados a lista de supressao.`);
      await Promise.all([loadContacts(), loadCore()]);
    } catch (err) {
      setError(apiError(err));
    } finally {
      setLoading(false);
    }
  };

  const previewCsv = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/admin/partnerships/contacts/import/preview', { csv: csvText });
      setCsvPreview(data);
      setMessage('Pre-visualizacao CSV atualizada. Nenhum email foi enviado.');
    } catch (err) {
      setError(apiError(err));
    } finally {
      setLoading(false);
    }
  };

  const confirmCsv = async () => {
    if (!csvPreview?.summary?.valid) return;
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/admin/partnerships/contacts/import/confirm', { csv: csvText });
      setCsvPreview(data.preview);
      setCsvText('');
      setMessage(`${data.inserted} contactos importados. A importacao nunca inicia envios automaticamente.`);
      await Promise.all([loadContacts(1), loadCore()]);
    } catch (err) {
      setError(apiError(err));
    } finally {
      setLoading(false);
    }
  };

  const readCsvFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCsvText(String(reader.result || ''));
    reader.readAsText(file);
  };

  const exportContacts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/partnerships/contacts/export', { responseType: 'blob' });
      const url = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'noxvelia-contactos-parcerias.csv';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(apiError(err));
    } finally {
      setLoading(false);
    }
  };

  const updateCampaign = (field, value) => setCampaignForm((current) => ({ ...current, [field]: value }));

  const updateCampaignFilter = (field, value) => {
    setCampaignForm((current) => ({
      ...current,
      filtrosDestinatarios: {
        ...current.filtrosDestinatarios,
        [field]: value,
      },
    }));
  };

  const toggleCampaignFilter = (field, value) => {
    const currentValues = campaignForm.filtrosDestinatarios?.[field] || [];
    const next = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];
    updateCampaignFilter(field, next);
  };

  const useSelectedContactsForCampaign = async () => {
    if (!selectedContacts.length) return;
    updateCampaignFilter('contactIds', selectedContacts);
    setSection('campanhas');
    setMessage(`${selectedContacts.length} contactos selecionados como destinatarios desta campanha.`);
    await estimateCampaign({ ...campaignForm.filtrosDestinatarios, contactIds: selectedContacts });
  };

  const loadCampaign = async (id) => {
    setSelectedCampaignId(id);
    if (!id) return;
    setLoading(true);
    try {
      const { data } = await api.get(`/admin/partnerships/campaigns/${id}`);
      setCampaignDetail(data);
      setCampaignForm({
        ...emptyCampaign,
        ...data.campaign,
        filtrosDestinatarios: {
          ...emptyCampaign.filtrosDestinatarios,
          ...(data.campaign?.filtrosDestinatarios || {}),
        },
      });
      setSends(data.sends || []);
      setEstimate(null);
      setPreview(null);
      setTestSentForCampaign('');
    } catch (err) {
      setError(apiError(err));
    } finally {
      setLoading(false);
    }
  };

  const newCampaign = async () => {
    setSelectedCampaignId('');
    setCampaignDetail(null);
    setPreview(null);
    setEstimate(null);
    setTestSentForCampaign('');
    try {
      const { data } = await api.get('/admin/partnerships/campaigns/default');
      setCampaignForm({ ...emptyCampaign, ...data });
    } catch {
      setCampaignForm(emptyCampaign);
    }
  };

  const saveCampaign = async ({ silent = false } = {}) => {
    setLoading(true);
    setError('');
    try {
      const payload = campaignForm;
      const { data } = selectedCampaignId
        ? await api.put(`/admin/partnerships/campaigns/${selectedCampaignId}`, payload)
        : await api.post('/admin/partnerships/campaigns', payload);
      setSelectedCampaignId(data._id);
      setCampaignDetail((current) => ({ ...(current || {}), campaign: data }));
      if (!silent) setMessage('Rascunho da campanha guardado.');
      const campaignsRes = await api.get('/admin/partnerships/campaigns');
      setCampaigns(campaignsRes.data || []);
      return data;
    } catch (err) {
      setError(apiError(err));
      return null;
    } finally {
      setLoading(false);
    }
  };

  const estimateCampaign = async (overrideFilters = null, campaignIdOverride = null) => {
    setLoading(true);
    try {
      const payload = overrideFilters || campaignForm.filtrosDestinatarios || {};
      const { data } = await api.post('/admin/partnerships/campaigns/estimate', {
        filtrosDestinatarios: payload,
        campaignId: campaignIdOverride || selectedCampaignId || undefined,
      });
      setEstimate(data);
      return data;
    } catch (err) {
      setError(apiError(err));
      return null;
    } finally {
      setLoading(false);
    }
  };

  const previewCampaign = async (overrideCampaign = null, { silent = false } = {}) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/admin/partnerships/campaigns/preview', overrideCampaign || campaignForm);
      setPreview(data);
      if (!silent) setMessage('Pre-visualizacao gerada com dados de exemplo.');
      return data;
    } catch (err) {
      setError(apiError(err));
      return null;
    } finally {
      setLoading(false);
    }
  };

  const prepareSafeCampaign = async () => {
    setLoading(true);
    setError('');
    try {
      const payload = campaignForm;
      const { data: savedCampaign } = selectedCampaignId
        ? await api.put(`/admin/partnerships/campaigns/${selectedCampaignId}`, payload)
        : await api.post('/admin/partnerships/campaigns', payload);
      setSelectedCampaignId(savedCampaign._id);
      setCampaignDetail((current) => ({ ...(current || {}), campaign: savedCampaign }));
      setCampaignForm({
        ...emptyCampaign,
        ...savedCampaign,
        filtrosDestinatarios: {
          ...emptyCampaign.filtrosDestinatarios,
          ...(savedCampaign.filtrosDestinatarios || {}),
        },
      });

      const [{ data: estimateData }, { data: previewData }, campaignsRes] = await Promise.all([
        api.post('/admin/partnerships/campaigns/estimate', {
          filtrosDestinatarios: savedCampaign.filtrosDestinatarios || {},
          campaignId: savedCampaign._id,
        }),
        api.post('/admin/partnerships/campaigns/preview', savedCampaign),
        api.get('/admin/partnerships/campaigns'),
      ]);
      setEstimate(estimateData);
      setPreview(previewData);
      setCampaigns(campaignsRes.data || []);
      if (!estimateData.eligible) {
        setMessage('Campanha guardada e pre-visualizada, mas nao ha destinatarios elegiveis. Revê os filtros ou importa contactos validos.');
      } else {
        setMessage('Campanha preparada: rascunho guardado, destinatarios contados e pre-visualizacao gerada. Agora envia um teste e confirma.');
      }
    } catch (err) {
      setError(apiError(err));
    } finally {
      setLoading(false);
    }
  };

  const sendTest = async () => {
    if (!selectedCampaignId) {
      setError('Guarda a campanha antes de enviar um teste.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.post(`/admin/partnerships/campaigns/${selectedCampaignId}/test`, { email: testEmail });
      setTestSentForCampaign(selectedCampaignId);
      setMessage(`Email de teste enviado para ${testEmail}.`);
    } catch (err) {
      setError(apiError(err));
    } finally {
      setLoading(false);
    }
  };

  const openStartModal = async () => {
    if (!selectedCampaignId) {
      setError('Guarda a campanha antes de iniciar.');
      return;
    }
    const result = await estimateCampaign();
    if (result?.eligible > 0) {
      setConfirmText('');
      setConfirmOpen(true);
    } else if (result) {
      setError('Nao ha destinatarios elegiveis para esta campanha.');
    }
  };

  const startCampaign = async () => {
    if (!selectedCampaignId) {
      setError('Guarda a campanha antes de iniciar.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post(`/admin/partnerships/campaigns/${selectedCampaignId}/start`, { confirmacao: confirmText });
      setConfirmOpen(false);
      setMessage(`Campanha iniciada. ${data.createdSends || 0} novos envios preparados; ${data.existingSends || 0} ja estavam preparados. O worker processa em lotes pequenos.`);
      await Promise.all([loadCampaign(selectedCampaignId), loadCore()]);
    } catch (err) {
      setError(apiError(err));
    } finally {
      setLoading(false);
    }
  };

  const pauseCampaign = async () => {
    if (!selectedCampaignId) return;
    setLoading(true);
    try {
      await api.post(`/admin/partnerships/campaigns/${selectedCampaignId}/pause`);
      setMessage('Campanha pausada.');
      await loadCampaign(selectedCampaignId);
    } catch (err) {
      setError(apiError(err));
    } finally {
      setLoading(false);
    }
  };

  const cancelCampaign = async () => {
    if (!selectedCampaignId || !window.confirm('Cancelar esta campanha e ignorar envios pendentes?')) return;
    setLoading(true);
    try {
      await api.post(`/admin/partnerships/campaigns/${selectedCampaignId}/cancel`);
      setMessage('Campanha cancelada.');
      await Promise.all([loadCampaign(selectedCampaignId), loadCore()]);
    } catch (err) {
      setError(apiError(err));
    } finally {
      setLoading(false);
    }
  };

  const loadSends = async () => {
    const query = buildParams({ ...sendFilters, campaign: selectedCampaignId });
    const { data } = await api.get(`/admin/partnerships/sends?${query}`);
    setSends(data || []);
  };

  const loadSentSends = async () => {
    if (!selectedCampaignId) return;
    const query = buildParams({ campaign: selectedCampaignId, sentOnly: true });
    const { data } = await api.get(`/admin/partnerships/sends?${query}`);
    setSendFilters({ q: '', estado: '' });
    setSends(data || []);
  };

  const exportSends = async ({ sentOnly = false } = {}) => {
    if (!selectedCampaignId) {
      setError('Seleciona uma campanha antes de exportar envios.');
      return;
    }
    setLoading(true);
    try {
      const query = buildParams({ ...sendFilters, campaign: selectedCampaignId, sentOnly: sentOnly ? 'true' : '' });
      const response = await api.get(`/admin/partnerships/sends/export?${query}`, { responseType: 'blob' });
      const url = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = sentOnly ? 'noxvelia-emails-enviados-parcerias.csv' : 'noxvelia-envios-parcerias.csv';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setMessage('Exportacao dos envios descarregada.');
    } catch (err) {
      setError(apiError(err));
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.put('/admin/partnerships/settings', settings);
      setSettings(data);
      setMessage('Definicoes comerciais guardadas.');
    } catch (err) {
      setError(apiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nx-partnerships" style={{ color: palette.text, fontFamily: typo.body }}>
      <style>{`
        .nx-partnerships input,
        .nx-partnerships select,
        .nx-partnerships textarea {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid ${palette.borderStrong};
          border-radius: 8px;
          color: ${palette.text};
          padding: 10px 11px;
          font: 500 13px ${typo.body};
          outline: none;
        }
        .nx-partnerships input[type="checkbox"] {
          width: auto;
          padding: 0;
        }
        .nx-partnerships textarea { min-height: 120px; resize: vertical; line-height: 1.55; }
        .nx-partnerships label { display: grid; gap: 6px; color: ${palette.textDim}; font-size: 12px; font-weight: 700; }
        .nx-partnerships table { width: 100%; border-collapse: collapse; min-width: 880px; }
        .nx-partnerships th { color: ${palette.textFaint}; font: 700 11px ${typo.mono}; text-transform: uppercase; letter-spacing: .08em; text-align: left; padding: 10px; border-bottom: 1px solid ${palette.border}; }
        .nx-partnerships td { padding: 12px 10px; border-bottom: 1px solid ${palette.border}; color: #cbd5e1; font-size: 13px; vertical-align: top; }
        .nx-partnerships button:disabled { opacity: .5; cursor: not-allowed; }
        .nx-partnerships iframe { border: 0; background: #f4f6f8; }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
        <div>
          <h2 style={{ margin: 0, fontFamily: typo.display, fontSize: 24 }}>Emails de Parcerias</h2>
          <p style={{ margin: '6px 0 0', color: palette.textDim, maxWidth: 760, fontSize: 13 }}>
            Um fluxo simples para convidar stands e imobiliarias: contactos primeiro, campanha depois, teste antes do envio.
          </p>
        </div>
        <button type="button" onClick={refreshAll} className="nx-btn" style={buttonStyle(palette)} disabled={loading}>
          <Icon path={loading ? mdiRefresh : mdiRefresh} size={0.65} /> Atualizar
        </button>
      </div>

      {(message || error) && (
        <div style={{
          marginBottom: 14,
          padding: '11px 13px',
          borderRadius: 8,
          border: `1px solid ${error ? 'rgba(239,68,68,.35)' : 'rgba(34,211,165,.28)'}`,
          background: error ? palette.redDim : palette.greenDim,
          color: error ? '#fecaca' : '#bbf7d0',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 12,
        }}>
          <span>{error || message}</span>
          <button type="button" onClick={() => { setMessage(''); setError(''); }} style={iconButtonStyle(palette)}>
            <Icon path={mdiClose} size={0.55} />
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))', gap: 10, marginBottom: 16 }}>
        <Metric colors={palette} fonts={typo} label="Contactos" value={summary?.totalContacts} />
        <Metric colors={palette} fonts={typo} label="Suprimidos" value={summary?.totalSuppressed} tone="red" />
        <Metric colors={palette} fonts={typo} label="Campanhas" value={summary?.totalCampaigns} tone="purple" />
        <Metric colors={palette} fonts={typo} label="Ativas" value={summary?.activeCampaigns} tone="gold" />
        <Metric colors={palette} fonts={typo} label="Respostas 14d" value={summary?.recentReplies} tone="green" />
        <Metric colors={palette} fonts={typo} label="Envios 24h" value={summary?.recentSends} tone="blue" />
      </div>

      <div style={guideGridStyle}>
        <Panel colors={palette} title="O que fazer agora">
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={guideIconStyle(palette)}><Icon path={mdiCheckCircleOutline} size={0.8} /></span>
              <div>
                <strong style={{ color: '#fff', display: 'block', marginBottom: 4 }}>{nextAction.title}</strong>
                <span style={{ color: palette.textDim, fontSize: 13, lineHeight: 1.55 }}>{nextAction.text}</span>
              </div>
            </div>
            <button type="button" onClick={() => setSection(nextAction.target)} style={buttonStyle(palette, 'accent')}>
              {nextAction.button} <Icon path={mdiChevronRight} size={0.6} />
            </button>
          </div>
        </Panel>
        <Panel colors={palette} title="Fluxo seguro">
          <div style={stepGridStyle}>
            <StepCard colors={palette} number="1" title="Contactos" text="Importa ou adiciona empresas. Nada e enviado nesta fase." done={totalContacts > 0} active={section === 'contactos'} onClick={() => setSection('contactos')} />
            <StepCard colors={palette} number="2" title="Campanha" text="Revê texto, destinatarios e envia um teste para ti." done={totalCampaigns > 0} active={section === 'campanhas'} onClick={() => setSection('campanhas')} />
            <StepCard colors={palette} number="3" title="Confirmar" text='So inicia quando escreveres "ENVIAR" no modal.' done={activeCampaigns > 0} active={section === 'metricas'} onClick={() => setSection('metricas')} />
          </div>
        </Panel>
      </div>

      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 16, borderBottom: `1px solid ${palette.border}` }}>
        {[
          ['contactos', '1. Contactos'],
          ['campanhas', '2. Campanha'],
          ['metricas', '3. Resultados'],
          ['respostas', 'Respostas'],
          ['supressao', 'Remocoes'],
          ['definicoes', 'Definicoes'],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setSection(id)}
            style={{
              ...tabStyle(palette, section === id),
              fontFamily: typo.body,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {section === 'contactos' && (
        <div style={gridTwoColumns}>
          <Panel colors={palette} title="1. Contactos que podem receber convite">
            <HelpBox colors={palette} title="Como funciona">
              Adiciona empresas relevantes. Podes selecionar contactos e criar uma campanha so para esses, ou usar filtros por tipo/estado. Importar contactos nunca envia emails automaticamente.
            </HelpBox>
            <div style={filtersGridStyle}>
              <input value={filters.q} onChange={(event) => setFilters({ ...filters, q: event.target.value })} placeholder="Email, nome ou empresa" />
              <select value={filters.tipo} onChange={(event) => setFilters({ ...filters, tipo: event.target.value })}>
                <option value="">Tipo</option>
                {COMPANY_TYPES.map((type) => <option key={type.id} value={type.id}>{type.label}</option>)}
              </select>
              <select value={filters.estado} onChange={(event) => setFilters({ ...filters, estado: event.target.value })}>
                <option value="">Estado</option>
                {CONTACT_STATES.map((state) => <option key={state} value={state}>{state}</option>)}
              </select>
              <input value={filters.origem} onChange={(event) => setFilters({ ...filters, origem: event.target.value })} placeholder="Origem" />
              <input type="date" value={filters.from} onChange={(event) => setFilters({ ...filters, from: event.target.value })} />
              <input type="date" value={filters.to} onChange={(event) => setFilters({ ...filters, to: event.target.value })} />
            </div>

            <div style={toolbarStyle}>
              <button type="button" onClick={() => loadContacts(1)} style={buttonStyle(palette)}><Icon path={mdiMagnify} size={0.6} /> Filtrar</button>
              <button type="button" onClick={exportContacts} style={buttonStyle(palette, 'ghost')}><Icon path={mdiDownloadOutline} size={0.6} /> Exportar CSV</button>
              <button type="button" onClick={suppressSelected} style={buttonStyle(palette, 'danger')} disabled={!selectedContacts.length}><Icon path={mdiShieldOffOutline} size={0.6} /> Bloquear selecionados</button>
              <button type="button" onClick={useSelectedContactsForCampaign} style={buttonStyle(palette, 'accent')} disabled={!selectedContacts.length}><Icon path={mdiEmailFastOutline} size={0.6} /> Usar selecionados numa campanha</button>
              <span style={muted(palette)}>{formatNumber(pagination.total)} resultados · {selectedContacts.length} selecionados</span>
            </div>

            <div style={{ overflowX: 'auto', marginTop: 12 }}>
              <table>
                <thead>
                  <tr>
                    <th><input type="checkbox" checked={contacts.length > 0 && selectedContacts.length === contacts.length} onChange={(event) => setSelectedContacts(event.target.checked ? contacts.map((contact) => contact._id) : [])} /></th>
                    <th>Email</th>
                    <th>Nome / Empresa</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>Origem</th>
                    <th>Ultimo contacto</th>
                    <th>Acoes</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact._id}>
                      <td><input type="checkbox" checked={selectedContacts.includes(contact._id)} onChange={() => toggleSelected(contact._id)} /></td>
                      <td><strong style={{ color: '#fff' }}>{contact.email}</strong><br /><span style={muted(palette)}>{contact.website || '-'}</span></td>
                      <td>{contact.nomePessoa || '-'}<br /><span style={muted(palette)}>{contact.nomeEmpresa || '-'}</span></td>
                      <td><Badge colors={palette} value={contact.tipoEmpresa} /></td>
                      <td><Badge colors={palette} value={contact.estado} tone={contact.estado === 'removido' || contact.estado === 'bloqueado' ? 'red' : 'green'} /></td>
                      <td>{contact.origem || '-'}</td>
                      <td>{formatDate(contact.ultimoContactoEm)}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          <button type="button" onClick={() => editContact(contact)} style={miniButtonStyle(palette)}>Editar</button>
                          <button type="button" onClick={() => removeContact(contact)} style={miniButtonStyle(palette, 'danger')}>Remover</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!contacts.length && <EmptyRow colSpan={8} text="Sem contactos para estes filtros." />}
                </tbody>
              </table>
            </div>

            <div style={{ ...toolbarStyle, justifyContent: 'flex-end', marginTop: 12 }}>
              <button type="button" onClick={() => loadContacts(Math.max(1, pagination.page - 1))} style={miniButtonStyle(palette)} disabled={pagination.page <= 1}>Anterior</button>
              <span style={muted(palette)}>Pagina {pagination.page} de {pagination.pages}</span>
              <button type="button" onClick={() => loadContacts(Math.min(pagination.pages, pagination.page + 1))} style={miniButtonStyle(palette)} disabled={pagination.page >= pagination.pages}>Seguinte</button>
            </div>
          </Panel>

          <div style={{ display: 'grid', gap: 14 }}>
            <Panel colors={palette} title={editingContactId ? 'Editar contacto' : 'Adicionar contacto individual'}>
              <form onSubmit={saveContact} style={{ display: 'grid', gap: 10 }}>
                <Field label="Email"><input required type="email" value={contactForm.email} onChange={(event) => updateContact('email', event.target.value)} /></Field>
                <div style={formGridStyle}>
                  <Field label="Nome"><input value={contactForm.nomePessoa} onChange={(event) => updateContact('nomePessoa', event.target.value)} /></Field>
                  <Field label="Empresa"><input value={contactForm.nomeEmpresa} onChange={(event) => updateContact('nomeEmpresa', event.target.value)} /></Field>
                </div>
                <div style={formGridStyle}>
                  <Field label="Tipo">
                    <select value={contactForm.tipoEmpresa} onChange={(event) => updateContact('tipoEmpresa', event.target.value)}>
                      {COMPANY_TYPES.map((type) => <option key={type.id} value={type.id}>{type.label}</option>)}
                    </select>
                  </Field>
                  <Field label="Estado">
                    <select value={contactForm.estado} onChange={(event) => updateContact('estado', event.target.value)}>
                      {CONTACT_STATES.map((state) => <option key={state} value={state}>{state}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="Website"><input value={contactForm.website} onChange={(event) => updateContact('website', event.target.value)} placeholder="https://..." /></Field>
                <div style={formGridStyle}>
                  <Field label="Telefone"><input value={contactForm.telefone} onChange={(event) => updateContact('telefone', event.target.value)} /></Field>
                  <Field label="Localidade"><input value={contactForm.localidade} onChange={(event) => updateContact('localidade', event.target.value)} /></Field>
                </div>
                <Field label="Origem"><input value={contactForm.origem} onChange={(event) => updateContact('origem', event.target.value)} placeholder="manual, website publico, evento..." /></Field>
                <Field label="Base de contacto"><input value={contactForm.consentimentoBase} onChange={(event) => updateContact('consentimentoBase', event.target.value)} /></Field>
                <Field label="Notas internas"><textarea value={contactForm.notasInternas} onChange={(event) => updateContact('notasInternas', event.target.value)} /></Field>
                <div style={toolbarStyle}>
                  <button type="submit" style={buttonStyle(palette, 'accent')}><Icon path={mdiAccountPlusOutline} size={0.6} /> {editingContactId ? 'Guardar' : 'Adicionar'}</button>
                  {editingContactId && <button type="button" onClick={resetContactForm} style={buttonStyle(palette, 'ghost')}>Cancelar</button>}
                </div>
              </form>
            </Panel>

            <Panel colors={palette} title="Importar lista por CSV">
              <div style={{ display: 'grid', gap: 10 }}>
                <HelpBox colors={palette} title="Formato esperado">
                  Usa colunas como email, nome, empresa, tipo, website, telefone e localidade. Primeiro verifica o ficheiro; so depois importas os contactos validos.
                </HelpBox>
                <input type="file" accept=".csv,text/csv" onChange={(event) => readCsvFile(event.target.files?.[0])} />
                <textarea value={csvText} onChange={(event) => setCsvText(event.target.value)} placeholder={'email,nome,empresa,tipo,website,telefone,localidade\ninfo@stand.pt,Ana,Stand XPTO,stand,https://stand.pt,912345678,Porto'} />
                <div style={toolbarStyle}>
                  <button type="button" onClick={previewCsv} style={buttonStyle(palette)} disabled={!csvText}><Icon path={mdiFileUploadOutline} size={0.6} /> 1. Verificar CSV</button>
                  <button type="button" onClick={confirmCsv} style={buttonStyle(palette, 'accent')} disabled={!csvPreview?.summary?.valid}><Icon path={mdiCheck} size={0.6} /> 2. Importar contactos validos</button>
                </div>
                {csvPreview && (
                  <div style={previewBoxStyle(palette)}>
                    <strong>{csvPreview.summary.valid} prontos a importar</strong> · {csvPreview.summary.invalid} com problema · {csvPreview.summary.duplicatesFile} repetidos no ficheiro · {csvPreview.summary.duplicatesDatabase} ja existentes · {csvPreview.summary.suppressed} bloqueados
                    <div style={{ marginTop: 6, color: palette.textFaint }}>Confirmar importacao nao envia emails. Apenas grava contactos validos.</div>
                    {csvPreview.invalidRows?.slice(0, 8).map((row) => (
                      <div key={`${row.linha}-${row.erros?.join('|')}`} style={{ marginTop: 6, color: '#fecaca' }}>Linha {row.linha}: {row.erros?.join(', ')}</div>
                    ))}
                  </div>
                )}
              </div>
            </Panel>
          </div>
        </div>
      )}

      {section === 'campanhas' && (
        <div style={gridTwoColumns}>
          <Panel colors={palette} title="2. Criar campanha">
            <div style={{ display: 'grid', gap: 10 }}>
              <HelpBox colors={palette} title="Regra simples">
                Usa "Preparar envio seguro" para guardar, contar destinatarios unicos e gerar a pre-visualizacao. Depois envia um teste e so no fim confirma com ENVIAR.
              </HelpBox>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(160px, 1fr) auto', gap: 8 }}>
                <select value={selectedCampaignId} onChange={(event) => loadCampaign(event.target.value)}>
                  <option value="">Nova campanha</option>
                  {campaigns.map((campaign) => <option key={campaign._id} value={campaign._id}>{campaign.nomeInterno} · {campaign.estado}</option>)}
                </select>
                <button type="button" onClick={newCampaign} style={buttonStyle(palette, 'ghost')}>Usar modelo</button>
              </div>

              <Field label="Nome interno"><input value={campaignForm.nomeInterno || ''} onChange={(event) => updateCampaign('nomeInterno', event.target.value)} /></Field>
              <Field label="Assunto"><input value={campaignForm.assunto || ''} onChange={(event) => updateCampaign('assunto', event.target.value)} /></Field>
              <Field label="Preheader"><input value={campaignForm.preheader || ''} onChange={(event) => updateCampaign('preheader', event.target.value)} /></Field>
              <Field label="Conteudo principal">
                <textarea style={{ minHeight: 280 }} value={campaignForm.conteudoPrincipal || ''} onChange={(event) => updateCampaign('conteudoPrincipal', event.target.value)} />
              </Field>
              <div style={previewBoxStyle(palette)}>
                Variaveis disponiveis: <strong>{'{{nome}}'}</strong>, <strong>{'{{empresa}}'}</strong>, <strong>{'{{website}}'}</strong>, <strong>{'{{tipo}}'}</strong> e <strong>{'{{unsubscribe_url}}'}</strong>. Se nome ou empresa estiverem vazios, o sistema usa frases naturais.
              </div>
              <div style={formGridStyle}>
                <Field label="Texto do botao"><input value={campaignForm.textoBotao || ''} onChange={(event) => updateCampaign('textoBotao', event.target.value)} /></Field>
                <Field label="URL do botao"><input value={campaignForm.urlBotao || ''} onChange={(event) => updateCampaign('urlBotao', event.target.value)} /></Field>
              </div>
              <div style={formGridStyle}>
                <Field label="Remetente"><input value={campaignForm.remetente || ''} onChange={(event) => updateCampaign('remetente', event.target.value)} /></Field>
                <Field label="Reply-to"><input value={campaignForm.replyTo || ''} onChange={(event) => updateCampaign('replyTo', event.target.value)} /></Field>
              </div>

              <div style={filterPanelStyle(palette)}>
                <strong style={{ color: '#fff' }}>Quem vai receber</strong>
                <span style={muted(palette)}>Escolhe tipos e estados. Contactos removidos, bloqueados ou na lista de supressao ficam sempre excluidos.</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(125px, 1fr))', gap: 8 }}>
                  {COMPANY_TYPES.map((type) => (
                    <CheckPill key={type.id} colors={palette} checked={campaignForm.filtrosDestinatarios?.tiposEmpresa?.includes(type.id)} onClick={() => toggleCampaignFilter('tiposEmpresa', type.id)} label={type.label} />
                  ))}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['novo', 'valido', 'contactado', 'interessado', 'respondeu'].map((state) => (
                    <CheckPill key={state} colors={palette} checked={campaignForm.filtrosDestinatarios?.estados?.includes(state)} onClick={() => toggleCampaignFilter('estados', state)} label={state} small />
                  ))}
                </div>
                <Field label="Origem especifica"><input value={campaignForm.filtrosDestinatarios?.origem || ''} onChange={(event) => updateCampaignFilter('origem', event.target.value)} /></Field>
                {!!campaignForm.filtrosDestinatarios?.contactIds?.length && (
                  <div style={previewBoxStyle(palette)}>{campaignForm.filtrosDestinatarios.contactIds.length} contactos selecionados manualmente.</div>
                )}
                {selectedContactsCount > 0 && !campaignForm.filtrosDestinatarios?.contactIds?.length && (
                  <button type="button" onClick={useSelectedContactsForCampaign} style={buttonStyle(palette, 'accent')}>
                    Usar os {selectedContactsCount} contactos selecionados
                  </button>
                )}
              </div>

              <div style={toolbarStyle}>
                <button type="button" onClick={prepareSafeCampaign} style={buttonStyle(palette, 'accent')}><Icon path={mdiCheckCircleOutline} size={0.6} /> Preparar envio seguro</button>
                <button type="button" onClick={() => saveCampaign()} style={buttonStyle(palette, 'ghost')}><Icon path={mdiContentSaveOutline} size={0.6} /> Guardar</button>
                <button type="button" onClick={() => estimateCampaign()} style={buttonStyle(palette)}><Icon path={mdiMagnify} size={0.6} /> Contar destinatarios</button>
                <button type="button" onClick={() => previewCampaign()} style={buttonStyle(palette)}><Icon path={mdiEmailOpenOutline} size={0.6} /> Ver email</button>
                <button type="button" onClick={openStartModal} style={buttonStyle(palette, 'danger')} disabled={!selectedCampaignId}><Icon path={mdiPlay} size={0.6} /> Iniciar envio</button>
              </div>

              {estimate && (
                <div style={previewBoxStyle(palette)}>
                  <strong>{estimate.eligible} destinatarios unicos elegiveis</strong> em {estimate.total} contactos filtrados.<br />
                  Novos envios a criar: {estimate.newRecipients ?? estimate.eligible} · Ja preparados nesta campanha: {estimate.existing || 0} · Duplicados internos ignorados: {estimate.duplicates || 0}.<br />
                  Removidos por supressao: {estimate.suppressed || 0} · Invalidos: {estimate.invalid || 0}.
                  <div style={{ marginTop: 6, color: palette.textFaint }}>Limite diario atual: {dailyLimit} emails. Se houver mais destinatarios, o worker continua em lotes nos dias/intervalos configurados.</div>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8 }}>
                <input type="email" value={testEmail} onChange={(event) => setTestEmail(event.target.value)} placeholder="Email para teste" />
                <button type="button" onClick={sendTest} style={buttonStyle(palette, 'ghost')} disabled={!testEmail || !selectedCampaignId}><Icon path={mdiSendOutline} size={0.6} /> 4. Enviar teste</button>
              </div>
              {testSent && <div style={previewBoxStyle(palette)}><Icon path={mdiCheckCircleOutline} size={0.65} /> Teste enviado nesta campanha. Podes iniciar quando a estimativa estiver correta.</div>}
              {!selectedCampaignId && <div style={previewBoxStyle(palette)}>Guarda o rascunho para poderes enviar teste ou iniciar campanha.</div>}
            </div>
          </Panel>

          <Panel colors={palette} title="Pre-visualizacao antes de enviar">
            <div style={toolbarStyle}>
              {['desktop', 'mobile', 'texto'].map((mode) => (
                <button key={mode} type="button" onClick={() => setPreviewMode(mode)} style={miniButtonStyle(palette, previewMode === mode ? 'accent' : 'ghost')}>{mode}</button>
              ))}
            </div>
            {!preview && <div style={previewBoxStyle(palette)}>Gera uma pre-visualizacao para validar HTML, mobile e texto simples antes de enviar.</div>}
            {preview && previewMode !== 'texto' && (
              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center', background: 'rgba(255,255,255,.04)', padding: 12, borderRadius: 8 }}>
                <iframe
                  title="Pre-visualizacao do email"
                  sandbox=""
                  srcDoc={preview.html}
                  style={{ width: previewMode === 'mobile' ? 390 : 720, maxWidth: '100%', height: 680, borderRadius: 6 }}
                />
              </div>
            )}
            {preview && previewMode === 'texto' && (
              <pre style={{ ...previewBoxStyle(palette), whiteSpace: 'pre-wrap', lineHeight: 1.55, maxHeight: 680, overflow: 'auto' }}>{preview.text}</pre>
            )}
          </Panel>
        </div>
      )}

      {section === 'metricas' && (
        <Panel colors={palette} title="Resultados da campanha">
          <HelpBox colors={palette} title="Leitura rapida">
            Aqui ves o que aconteceu depois de iniciar: enviados, entregues, abertos, cliques, falhas e pedidos de remocao. As aberturas sao sempre aproximadas.
          </HelpBox>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: 14 }}>
            <div style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
              <select value={selectedCampaignId} onChange={(event) => loadCampaign(event.target.value)}>
                <option value="">Selecionar campanha</option>
                {campaigns.map((campaign) => <option key={campaign._id} value={campaign._id}>{campaign.nomeInterno} · {campaign.estado}</option>)}
              </select>
              {selectedCampaign && (
                <div style={previewBoxStyle(palette)}>
                  <strong style={{ color: '#fff' }}>{selectedCampaign.nomeInterno}</strong><br />
                  Estado: {selectedCampaign.estado}<br />
                  Inicio: {formatDate(selectedCampaign.iniciadoEm)}<br />
                  Duracao: {durationLabel(selectedCampaign.iniciadoEm, selectedCampaign.concluidoEm || selectedCampaign.canceladoEm)}
                </div>
              )}
              {selectedCampaign && (
                <div style={previewBoxStyle(palette)}>
                  Entrega: {toPercent(selectedCampaign.totalEntregue, selectedCampaign.totalEnviado)} · Abertura: {toPercent(selectedCampaign.totalAberto, selectedCampaign.totalEntregue)} · Clique: {toPercent(selectedCampaign.totalClicado, selectedCampaign.totalEntregue)}
                  <div style={{ marginTop: 6, color: palette.textFaint }}>As aberturas podem ser imprecisas devido a protecoes de privacidade dos clientes de email.</div>
                </div>
              )}
              {selectedCampaign && (
                <div style={previewBoxStyle(palette)}>
                  <strong style={{ color: '#fff' }}>{selectedCampaign.totalEnviado || 0} emails enviados/preparados como enviados</strong><br />
                  Na tabela carregada agora: {loadedSentSends} enviados · {loadedPendingSends} pendentes · {sends.length} registos visiveis.
                  <div style={{ marginTop: 6, color: palette.textFaint }}>Usa "Ver enviados" para listar apenas quem ja recebeu ou ja entrou no estado enviado/entregue/aberto/clicado.</div>
                </div>
              )}
              <div style={toolbarStyle}>
                <button type="button" onClick={pauseCampaign} style={buttonStyle(palette, 'ghost')} disabled={!selectedCampaignId || selectedCampaign?.estado !== 'em_processamento'}><Icon path={mdiPause} size={0.6} /> Pausar</button>
                <button type="button" onClick={cancelCampaign} style={buttonStyle(palette, 'danger')} disabled={!selectedCampaignId || ['concluida', 'cancelada'].includes(selectedCampaign?.estado)}><Icon path={mdiAlertOutline} size={0.6} /> Cancelar</button>
              </div>
            </div>
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 8, marginBottom: 14 }}>
                {(campaignMetrics || []).map((metric) => <Metric key={metric.label} colors={palette} fonts={typo} label={metric.label} value={metric.value} />)}
              </div>
              <div style={toolbarStyle}>
                <input value={sendFilters.q} onChange={(event) => setSendFilters({ ...sendFilters, q: event.target.value })} placeholder="Pesquisar envio por email" />
                <select value={sendFilters.estado} onChange={(event) => setSendFilters({ ...sendFilters, estado: event.target.value })}>
                  <option value="">Estado</option>
                  {['pendente', 'enviado', 'entregue', 'aberto', 'clicado', 'devolvido', 'reclamado', 'falhou', 'removido', 'ignorado'].map((state) => <option key={state} value={state}>{state}</option>)}
                </select>
                <button type="button" onClick={loadSends} style={buttonStyle(palette)}><Icon path={mdiMagnify} size={0.6} /> Filtrar envios</button>
                <button type="button" onClick={loadSentSends} style={buttonStyle(palette, 'accent')} disabled={!selectedCampaignId}><Icon path={mdiCheckCircleOutline} size={0.6} /> Ver enviados</button>
                <button type="button" onClick={() => exportSends()} style={buttonStyle(palette, 'ghost')} disabled={!selectedCampaignId}><Icon path={mdiDownloadOutline} size={0.6} /> Exportar tabela</button>
                <button type="button" onClick={() => exportSends({ sentOnly: true })} style={buttonStyle(palette, 'ghost')} disabled={!selectedCampaignId}><Icon path={mdiDownloadOutline} size={0.6} /> Exportar enviados</button>
              </div>
              <div style={{ overflowX: 'auto', marginTop: 12 }}>
                <table>
                  <thead><tr><th>Email</th><th>Contacto</th><th>Estado</th><th>Tentativas</th><th>Enviado</th><th>Erro</th></tr></thead>
                  <tbody>
                    {sends.map((send) => (
                      <tr key={send._id}>
                        <td>{send.recipientEmail}</td>
                        <td>{send.contact?.nomePessoa || '-'}<br /><span style={muted(palette)}>{send.contact?.nomeEmpresa || ''}</span></td>
                        <td><Badge colors={palette} value={send.estado} tone={send.estado === 'falhou' || send.estado === 'devolvido' ? 'red' : 'green'} /></td>
                        <td>{send.tentativas || 0}</td>
                        <td>{formatDate(send.enviadoEm)}</td>
                        <td>{send.erro || '-'}</td>
                      </tr>
                    ))}
                    {!sends.length && <EmptyRow colSpan={6} text="Sem envios para mostrar." />}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Panel>
      )}

      {section === 'respostas' && (
        <Panel colors={palette} title="Respostas recebidas">
          <div style={previewBoxStyle(palette)}>
            As respostas aparecem aqui quando a Resend/domínio entregar eventos inbound/reply ao webhook configurado. Se alguem responder diretamente para geral@noxvelia.com, tambem deves confirmar na caixa de email.
          </div>
          <div style={{ overflowX: 'auto', marginTop: 12 }}>
            <table>
              <thead><tr><th>De</th><th>Assunto</th><th>Contacto</th><th>Recebido</th><th>Resumo</th></tr></thead>
              <tbody>
                {replies.map((reply) => (
                  <tr key={reply._id}>
                    <td>{reply.fromEmail}</td>
                    <td>{reply.subject || '-'}</td>
                    <td>{reply.contact?.nomePessoa || '-'}<br /><span style={muted(palette)}>{reply.contact?.nomeEmpresa || ''}</span></td>
                    <td>{formatDate(reply.receivedAt || reply.createdAt)}</td>
                    <td>{reply.textSnippet || reply.htmlSnippet || '-'}</td>
                  </tr>
                ))}
                {!replies.length && <EmptyRow colSpan={5} text="Ainda sem respostas registadas." />}
              </tbody>
            </table>
          </div>
        </Panel>
      )}

      {section === 'supressao' && (
        <Panel colors={palette} title="Remocoes e bloqueios">
          <div style={previewBoxStyle(palette)}>Qualquer email nesta lista fica impedido de receber campanhas comerciais futuras, mesmo se voltar a ser importado. Isto nao bloqueia emails transacionais importantes da conta.</div>
          <div style={{ overflowX: 'auto', marginTop: 12 }}>
            <table>
              <thead><tr><th>Email</th><th>Motivo</th><th>Origem</th><th>Criado em</th></tr></thead>
              <tbody>
                {suppressions.map((item) => (
                  <tr key={item._id}><td>{item.email}</td><td>{item.motivo}</td><td>{item.origem}</td><td>{formatDate(item.createdAt)}</td></tr>
                ))}
                {!suppressions.length && <EmptyRow colSpan={4} text="Sem emails suprimidos." />}
              </tbody>
            </table>
          </div>
        </Panel>
      )}

      {section === 'definicoes' && settings && (
        <div style={gridTwoColumns}>
          <Panel colors={palette} title="Definicoes comerciais">
            <div style={{ display: 'grid', gap: 10 }}>
              <HelpBox colors={palette} title="Valores recomendados">
                Mantem limites baixos no inicio. Aumenta volume aos poucos e observa falhas, bounces e complaints para proteger a reputacao do dominio.
              </HelpBox>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                <Field label="Limite diario"><input type="number" value={settings.limiteDiario || 40} onChange={(event) => setSettings({ ...settings, limiteDiario: Number(event.target.value) })} /></Field>
                <Field label="Tamanho do lote"><input type="number" value={settings.tamanhoLote || 5} onChange={(event) => setSettings({ ...settings, tamanhoLote: Number(event.target.value) })} /></Field>
                <Field label="Intervalo entre lotes (s)"><input type="number" value={settings.intervaloLotesSegundos || 60} onChange={(event) => setSettings({ ...settings, intervaloLotesSegundos: Number(event.target.value) })} /></Field>
              </div>
              <Field label="Remetente comercial"><input value={settings.remetente || ''} onChange={(event) => setSettings({ ...settings, remetente: event.target.value })} /></Field>
              <Field label="Reply-to"><input value={settings.replyTo || ''} onChange={(event) => setSettings({ ...settings, replyTo: event.target.value })} /></Field>
              <Field label="URL publica do logotipo"><input value={settings.logoUrl || ''} onChange={(event) => setSettings({ ...settings, logoUrl: event.target.value })} /></Field>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}><input type="checkbox" checked={Boolean(settings.trackingAberturas)} onChange={(event) => setSettings({ ...settings, trackingAberturas: event.target.checked })} /> Tracking de abertura</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}><input type="checkbox" checked={Boolean(settings.trackingCliques)} onChange={(event) => setSettings({ ...settings, trackingCliques: event.target.checked })} /> Tracking de cliques</label>
              </div>
              <div style={previewBoxStyle(palette)}>
                Valores conservadores ajudam a proteger a reputacao do dominio. Aumentos significativos de volume devem ser graduais e acompanhados por bounces/complaints.
              </div>
              <button type="button" onClick={saveSettings} style={buttonStyle(palette, 'accent')}><Icon path={mdiTuneVariant} size={0.6} /> Guardar definicoes</button>
            </div>
          </Panel>
          <Panel colors={palette} title="Auditoria">
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead><tr><th>Acao</th><th>Admin</th><th>Quando</th></tr></thead>
                <tbody>
                  {audit.map((item) => (
                    <tr key={item._id}><td>{item.action}</td><td>{item.admin?.email || '-'}</td><td>{formatDate(item.createdAt)}</td></tr>
                  ))}
                  {!audit.length && <EmptyRow colSpan={3} text="Sem eventos de auditoria." />}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      )}

      {confirmOpen && (
        <div style={modalBackdropStyle}>
          <div style={modalStyle(palette)}>
            <h3 style={{ margin: 0, fontFamily: typo.display }}>Confirmar envio</h3>
            <div style={previewBoxStyle(palette)}>
              <strong>{estimate?.eligible || 0} destinatarios unicos elegiveis</strong><br />
              Assunto: {campaignForm.assunto}<br />
              Remetente: {campaignForm.remetente}<br />
              Reply-to: {campaignForm.replyTo}<br />
              Novos envios a criar: {estimate?.newRecipients ?? estimate?.eligible ?? 0}<br />
              Ja preparados nesta campanha: {estimate?.existing || 0}<br />
              Duplicados internos ignorados: {estimate?.duplicates || 0}<br />
              Removidos por supressao: {estimate?.suppressed || 0}<br />
              Emails invalidos: {estimate?.invalid || 0}
            </div>
            <p style={{ color: '#bbf7d0', fontSize: 13 }}>Garantia: o servidor cria no maximo um envio por contacto e por email dentro desta campanha. Se voltares a iniciar, os ja preparados sao ignorados.</p>
            <p style={{ color: '#fecaca', fontSize: 13 }}>Depois de iniciado, o envio ja processado nao pode ser anulado. Os envios pendentes podem ser pausados ou cancelados.</p>
            <Field label='Escreve "ENVIAR" para confirmar'><input value={confirmText} onChange={(event) => setConfirmText(event.target.value)} /></Field>
            <div style={{ ...toolbarStyle, justifyContent: 'flex-end', marginTop: 12 }}>
              <button type="button" onClick={() => setConfirmOpen(false)} style={buttonStyle(palette, 'ghost')}>Voltar</button>
              <button type="button" onClick={startCampaign} style={buttonStyle(palette, 'danger')} disabled={confirmText !== 'ENVIAR' || !estimate?.eligible}><Icon path={mdiPlay} size={0.6} /> Iniciar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Panel({ colors, title, children }) {
  return (
    <section style={{
      border: `1px solid ${colors.border}`,
      background: 'rgba(255,255,255,0.025)',
      borderRadius: 8,
      padding: 14,
      minWidth: 0,
    }}>
      <h3 style={{ margin: '0 0 12px', color: '#fff', fontSize: 15 }}>{title}</h3>
      {children}
    </section>
  );
}

function HelpBox({ colors, title, children }) {
  return (
    <div style={helpBoxStyle(colors)}>
      <span style={helpIconStyle(colors)}><Icon path={mdiClipboardTextOutline} size={0.68} /></span>
      <div>
        <strong style={{ color: '#fff', display: 'block', marginBottom: 3 }}>{title}</strong>
        <div style={{ color: colors.textDim, fontSize: 12.5, lineHeight: 1.55 }}>{children}</div>
      </div>
    </div>
  );
}

function StepCard({ colors, number, title, text, done, active, onClick }) {
  return (
    <button type="button" onClick={onClick} style={stepCardStyle(colors, active)}>
      <span style={stepNumberStyle(colors, done)}>{done ? <Icon path={mdiCheck} size={0.55} /> : number}</span>
      <span style={{ display: 'grid', gap: 3, textAlign: 'left' }}>
        <strong style={{ color: '#fff', fontSize: 13 }}>{title}</strong>
        <span style={{ color: colors.textDim, fontSize: 11.5, lineHeight: 1.35 }}>{text}</span>
      </span>
    </button>
  );
}

function Field({ label, children }) {
  return <label>{label}{children}</label>;
}

function Metric({ colors, fonts, label, value, tone = 'blue' }) {
  const color = colors[tone] || colors.blue;
  const dim = colors[`${tone}Dim`] || colors.blueDim;
  return (
    <div style={{ border: `1px solid ${colors.border}`, background: dim, borderRadius: 8, padding: 12 }}>
      <div style={{ color: colors.textFaint, font: `700 10px ${fonts.mono}`, textTransform: 'uppercase', letterSpacing: '.08em' }}>{label}</div>
      <div style={{ color, font: `800 24px ${fonts.display}`, marginTop: 4 }}>{formatNumber(value)}</div>
    </div>
  );
}

function Badge({ colors, value, tone = 'blue' }) {
  const color = tone === 'red' ? colors.red : tone === 'green' ? colors.green : colors.blue;
  const bg = tone === 'red' ? colors.redDim : tone === 'green' ? colors.greenDim : colors.blueDim;
  return <span style={{ display: 'inline-flex', border: `1px solid ${color}44`, background: bg, color, padding: '4px 7px', borderRadius: 6, fontSize: 11, fontWeight: 800 }}>{value || '-'}</span>;
}

function CheckPill({ colors, checked, label, onClick, small = false }) {
  return (
    <button type="button" onClick={onClick} style={{
      border: `1px solid ${checked ? colors.blue : colors.borderStrong}`,
      background: checked ? colors.blueDim : 'rgba(255,255,255,0.03)',
      color: checked ? '#fff' : colors.textDim,
      borderRadius: 8,
      padding: small ? '7px 9px' : '10px 11px',
      fontWeight: 800,
      fontSize: small ? 12 : 13,
      cursor: 'pointer',
    }}>{checked && <Icon path={mdiCheck} size={0.5} />} {label}</button>
  );
}

function EmptyRow({ colSpan, text }) {
  return <tr><td colSpan={colSpan} style={{ textAlign: 'center', padding: 26, color: '#7c8aa8' }}>{text}</td></tr>;
}

const gridTwoColumns = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
  gap: 14,
  alignItems: 'start',
};

const guideGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'minmax(min(100%, 320px), 0.85fr) minmax(min(100%, 520px), 1.4fr)',
  gap: 14,
  alignItems: 'stretch',
  marginBottom: 16,
};

const filtersGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 145px), 1fr))',
  gap: 8,
  marginBottom: 12,
};

const formGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
  gap: 8,
};

const stepGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: 10,
};

const guideIconStyle = (colors) => ({
  width: 34,
  height: 34,
  borderRadius: 8,
  border: `1px solid ${colors.green}55`,
  background: colors.greenDim,
  color: colors.green,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

const toolbarStyle = {
  display: 'flex',
  gap: 8,
  alignItems: 'center',
  flexWrap: 'wrap',
};

const helpBoxStyle = (colors) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: 10,
  border: `1px solid ${colors.border}`,
  background: 'rgba(255,255,255,0.03)',
  borderRadius: 8,
  padding: 11,
});

const helpIconStyle = (colors) => ({
  width: 28,
  height: 28,
  borderRadius: 8,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.blue,
  background: colors.blueDim,
  flexShrink: 0,
});

const stepCardStyle = (colors, active) => ({
  width: '100%',
  minHeight: 92,
  border: `1px solid ${active ? colors.blue : colors.border}`,
  background: active ? colors.blueDim : 'rgba(255,255,255,0.025)',
  color: colors.text,
  borderRadius: 8,
  padding: 11,
  display: 'flex',
  alignItems: 'flex-start',
  gap: 10,
  cursor: 'pointer',
});

const stepNumberStyle = (colors, done) => ({
  width: 24,
  height: 24,
  borderRadius: 999,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  background: done ? colors.greenDim : 'rgba(255,255,255,0.05)',
  border: `1px solid ${done ? colors.green : colors.borderStrong}`,
  color: done ? colors.green : colors.textDim,
  fontSize: 11,
  fontWeight: 900,
});

const filterPanelStyle = (colors) => ({
  display: 'grid',
  gap: 10,
  border: `1px solid ${colors.border}`,
  background: 'rgba(255,255,255,0.025)',
  borderRadius: 8,
  padding: 12,
});

const muted = (colors) => ({
  color: colors.textDim,
  fontSize: 12,
});

const previewBoxStyle = (colors) => ({
  border: `1px solid ${colors.border}`,
  background: 'rgba(255,255,255,0.035)',
  color: colors.textDim,
  borderRadius: 8,
  padding: 12,
  fontSize: 13,
});

const tabStyle = (colors, active) => ({
  border: 0,
  borderBottom: `2px solid ${active ? colors.blue : 'transparent'}`,
  background: active ? colors.panelAlt : 'transparent',
  color: active ? '#fff' : colors.textDim,
  padding: '11px 14px',
  cursor: 'pointer',
  borderRadius: '8px 8px 0 0',
  fontWeight: 800,
  whiteSpace: 'nowrap',
});

const buttonStyle = (colors, variant = 'default') => {
  const map = {
    default: { bg: colors.blueDim, border: colors.blue, color: '#dbeafe' },
    ghost: { bg: 'rgba(255,255,255,0.035)', border: colors.borderStrong, color: colors.text },
    accent: { bg: colors.greenDim, border: colors.green, color: '#bbf7d0' },
    danger: { bg: colors.redDim, border: colors.red, color: '#fecaca' },
  };
  const item = map[variant] || map.default;
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    border: `1px solid ${item.border}`,
    background: item.bg,
    color: item.color,
    borderRadius: 8,
    padding: '10px 12px',
    cursor: 'pointer',
    fontWeight: 800,
    fontSize: 12,
  };
};

const miniButtonStyle = (colors, variant = 'ghost') => ({
  ...buttonStyle(colors, variant === 'accent' ? 'default' : variant),
  padding: '7px 9px',
  fontSize: 11,
});

const iconButtonStyle = (colors) => ({
  border: 0,
  background: 'transparent',
  color: colors.textDim,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
});

const modalBackdropStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: 1000,
  background: 'rgba(0,0,0,.68)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
};

const modalStyle = (colors) => ({
  width: 'min(560px, 100%)',
  border: `1px solid ${colors.borderStrong}`,
  background: colors.panel,
  color: colors.text,
  borderRadius: 10,
  padding: 18,
  boxShadow: '0 24px 80px rgba(0,0,0,.45)',
});
