

/*
create table public.vendor_field_research (
  id uuid primary key default uuid_generate_v4(),
  vendor text not null,
  sow_section text not null check (sow_section ~ '^\d+\.\d+\.\d+$'),
  field_category text not null,
  field_number int not null,
  field_name text not null,
  technical_definition text,
  evaluation_methodology text,
  section_doc_excerpt text,
  field_doc_excerpt text,
  core_data jsonb not null default '{}'::jsonb,
  field_data jsonb not null default '{}'::jsonb,
  embedding vector(1536),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint vendor_field_research_unique unique (vendor, sow_section, field_number)
);
  
create table public.vendor_field_research (
  id uuid primary key default uuid_generate_v4(),

  vendor           text    not null,
  sow_section      text    not null,
  field_category   text    not null,
  field_number     int     not null,
  field_name       text    not null,

  technical_definition  text,
  evaluation_methodology text,

  -- Plain text columns (not JSONB)
  section_doc_excerpt text,
  field_doc_excerpt   text,

  -- JSONB buckets
  core_data      jsonb   not null default '{}'::jsonb,
  field_data     jsonb   not null default '{}'::jsonb,

  embedding      vector(1536),

  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),

  constraint vendor_field_research_unique unique (vendor, sow_section, field_number)
);
*/

interface VendorFieldRecord {
  vendor: string;
  sow_section: string;
  field_category: string;
  field_number: number;
  field_name: string;
  technical_definition: string;
  evaluation_methodology: string;
  section_doc_excerpt: string;
  field_doc_excerpt: string;
  core_data: {
    field_status?: string;
    confidence_level?: string;
    risk?: string;
    validation_date?: string;
    source_url?: string;
  };
  field_data: {
    features?: Array<{
      id: string;
      feature: string;
      detail: string;
      sourceUrl?: string;
    }>;
    [key: string]: unknown;
  };
}

const example = {
  "vendor": "Glean",
  "sow_section": "4.9.1",
  "field_category": "Functional Capabilities",
  "field_number": 1,
  "field_name": "Features Confirmed",
  "technical_definition": "...",
  "evaluation_methodology": "...",
  "section_doc_excerpt": "# 4.9.1 - Functional Capabilities\n\nGlean provides...",
  "field_doc_excerpt": "# Features Confirmed\n\nThe validated list...",
  "core_data": {
    "field_status": "Confirmed",
    "confidence_level": "High",
    "risk": "Low",
    "validation_date": "2026-09-07",
    "source_url": "https://glean.com/docs/search"
  },
  "field_data": {
    "features": [
      {
        "id": "F1",
        "feature": "AI Search",
        "detail": "Semantic search across 100+ connectors",
        "sourceUrl": "https://glean.com/docs/ai-search"
      }
    ]
  }
}