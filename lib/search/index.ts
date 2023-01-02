import { MeiliSearch } from 'meilisearch';
import type { Index } from 'meilisearch';

import { MEILISEARCH_KEY, MEILISEARCH_URL } from '@app/lib/config';

export interface ISearchSubject {
  id: number;
  summary: string;
  tag?: string[];
  name: string[];
  date?: number;
  score: number;
  page_rank: number;
  heat: number;
  rank: number;
  platform?: number;
  type: number;
  nsfw: boolean;
}

const client = MEILISEARCH_URL
  ? new MeiliSearch({
      host: MEILISEARCH_URL,
      apiKey: MEILISEARCH_KEY,
    })
  : null;

const Search: Index<ISearchSubject> | null = client
  ? client.index<ISearchSubject>('subjects')
  : null;

export async function search(keyword: string): Promise<ISearchSubject[]> {
  if (Search === null) {
    return [];
  }

  const q = await Search.search<ISearchSubject>(keyword, {
    limit: 10,
    filter: [[]],
  });

  return q.hits;
}
