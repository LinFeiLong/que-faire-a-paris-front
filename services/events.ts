const API_BASE_URL = 'https://opendata.paris.fr/api/records/1.0/search/';
const DATASET = 'que-faire-a-paris-';

interface FilterOptions {
  search?: string;
  dateStart?: string;
  dateEnd?: string;
  priceTypes?: string[];
  tags?: string[];
  rows?: number;
}

export async function fetchEvents({
  search,
  dateStart,
  dateEnd,
  priceTypes,
  tags,
  rows = 20
}: FilterOptions = {}) {
  const params = new URLSearchParams({
    dataset: DATASET,
    rows: rows.toString(),
  });

  const filters = [];
  if (search) filters.push(search);
  if (dateStart) filters.push(`date_start>=${dateStart}`);
  if (dateEnd) filters.push(`date_end<=${dateEnd}`);
  if (priceTypes?.length) filters.push(`(${priceTypes.map(p => `price_type="${p}"`).join(' OR ')})`);
  if (tags?.length) filters.push(`(${tags.map(t => `tags="${t}"`).join(' OR ')})`);

  if (filters.length > 0) {
    params.append('q', filters.join(' AND '));
  }

  const response = await fetch(`${API_BASE_URL}?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }

  return response.json();
}

export async function fetchEventById(id: string) {
  const params = new URLSearchParams({
    dataset: DATASET,
    q: `recordid:${id}`,
  });

  const response = await fetch(`${API_BASE_URL}?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch event');
  }

  const data = await response.json();
  return data.records[0];
} 