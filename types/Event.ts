export interface ParisEvent {
  recordid: string;
  fields: {
    title: string;
    cover_url?: string;
    address_name?: string;
    address_street?: string;
    date_start?: string;
    date_end?: string;
    lead_text?: string;
    price_type?: string;
    tags?: string[];
  };
}

export interface EventsResponse {
  records: {
    recordid: string;
    fields: ParisEvent['fields'];
  }[];
} 