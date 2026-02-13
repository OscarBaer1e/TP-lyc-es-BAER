import axios from 'axios';
import lyceesFallback from '../data/lycees';

const LYCEES_DATA_URL =
  'https://www.data.gouv.fr/fr/datasets/r/2a84ffc7-7121-48e2-9de3-3e2f3ab8b8e8';

export interface LyceeRecord {
  code_uai?: string;
  nom_etablissement?: string;
  sigle_uai?: string;
  code_academie?: string;
  academie?: string;
  statut?: string;
  libelle?: string;
  code_postal?: string;
  adresse_postale?: string;
  mail?: string | null;
  [key: string]: unknown;
}

export async function loadLyceesWithAxios(): Promise<LyceeRecord[]> {
  try {
    const response = await axios.get<LyceeRecord[]>(LYCEES_DATA_URL, {
      timeout: 15000,
      headers: { Accept: 'application/json' },
    });
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data;
    }
  } catch {
  }
  return lyceesFallback as LyceeRecord[];
}
