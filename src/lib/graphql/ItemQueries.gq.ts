import type * as Types from './types.gq';

import { writable } from "svelte/store"
import { g } from '$lib/config/g'
import type { GFetchReturnWithErrors, GGetParameters } from '@leveluptuts/g-query'
import gql from 'graphql-tag';
export type ItemsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ItemsQuery = { __typename?: 'Query', items?: { __typename?: 'ItemNodeConnection', edges: Array<{ __typename?: 'ItemNodeEdge', node?: { __typename?: 'ItemNode', id: string, name: string, description?: string | null, armor?: { __typename?: 'ArmorTraitsNode', acBonus: number } | null, weapon?: { __typename?: 'WeaponTraitsNode', attackBonus: number } | null, equipment?: { __typename?: 'EquipmentTraitsNode', briefDescription: string } | null } | null } | null> } | null };

export type ItemByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type ItemByIdQuery = { __typename?: 'Query', item?: { __typename?: 'ItemNode', id: string, name: string, description?: string | null } | null };


type SubscribeWrapperArgs<T> = {
	variables?: T,
}

interface CacheFunctionOptions {
	update?: boolean
}


export const ItemsDoc = gql`
    query items {
  items {
    edges {
      node {
        id
        name
        description
        armor {
          acBonus
        }
        weapon {
          attackBonus
        }
        equipment {
          briefDescription
        }
      }
    }
  }
}
    `;
export const ItemByIdDoc = gql`
    query itemById($id: ID!) {
  item(id: $id) {
    id
    name
    description
  }
}
    `;

export const items = writable<GFetchReturnWithErrors<ItemsQuery>>({
	errors: [],
	gQueryStatus: 'LOADING',
})

// Cached
export async function getItems({ fetch, variables }: GGetParameters<ItemsQueryVariables>, options?: CacheFunctionOptions) {
	const data = await g.fetch<ItemsQuery>({
		queries: [{ query: ItemsDoc, variables }],
		fetch
	})
	items.set({ ...data, errors: data?.errors, gQueryStatus: 'LOADED' })
	return data
}



export const itemById = writable<GFetchReturnWithErrors<ItemByIdQuery>>({
	errors: [],
	gQueryStatus: 'LOADING',
})

// Cached
export async function getItemById({ fetch, variables }: GGetParameters<ItemByIdQueryVariables>, options?: CacheFunctionOptions) {
	const data = await g.fetch<ItemByIdQuery>({
		queries: [{ query: ItemByIdDoc, variables }],
		fetch
	})
	itemById.set({ ...data, errors: data?.errors, gQueryStatus: 'LOADED' })
	return data
}

