import type * as Types from './types.gq';

import { writable } from "svelte/store"
import { g } from '$lib/config/g'
import type { GFetchReturnWithErrors, GGetParameters } from '@leveluptuts/g-query'
import gql from 'graphql-tag';
export type AssociationsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AssociationsQuery = { __typename?: 'Query', associations?: { __typename?: 'AssociationNodeConnection', edges: Array<{ __typename?: 'AssociationNodeEdge', node?: { __typename?: 'AssociationNode', id: string, name: string, description?: string | null, imageId?: string | null, thumbnailId?: string | null } | null } | null> } | null };

export type AssociationByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type AssociationByIdQuery = { __typename?: 'Query', association?: { __typename?: 'AssociationNode', id: string, name: string, description?: string | null, imageId?: string | null, thumbnailId?: string | null } | null };


type SubscribeWrapperArgs<T> = {
	variables?: T,
}

interface CacheFunctionOptions {
	update?: boolean
}


export const AssociationsDoc = gql`
    query associations {
  associations {
    edges {
      node {
        id
        name
        description
        imageId
        thumbnailId
      }
    }
  }
}
    `;
export const AssociationByIdDoc = gql`
    query associationById($id: ID!) {
  association(id: $id) {
    id
    name
    description
    imageId
    thumbnailId
  }
}
    `;

export const associations = writable<GFetchReturnWithErrors<AssociationsQuery>>({
	errors: [],
	gQueryStatus: 'LOADING',
})

// Cached
export async function getAssociations({ fetch, variables }: GGetParameters<AssociationsQueryVariables>, options?: CacheFunctionOptions) {
	const data = await g.fetch<AssociationsQuery>({
		queries: [{ query: AssociationsDoc, variables }],
		fetch
	})
	associations.set({ ...data, errors: data?.errors, gQueryStatus: 'LOADED' })
	return data
}



export const associationById = writable<GFetchReturnWithErrors<AssociationByIdQuery>>({
	errors: [],
	gQueryStatus: 'LOADING',
})

// Cached
export async function getAssociationById({ fetch, variables }: GGetParameters<AssociationByIdQueryVariables>, options?: CacheFunctionOptions) {
	const data = await g.fetch<AssociationByIdQuery>({
		queries: [{ query: AssociationByIdDoc, variables }],
		fetch
	})
	associationById.set({ ...data, errors: data?.errors, gQueryStatus: 'LOADED' })
	return data
}

