import type * as Types from './types.gq';

import { writable } from "svelte/store"
import { g } from '$lib/config/g'
import type { GFetchReturnWithErrors, GGetParameters } from '@leveluptuts/g-query'
import gql from 'graphql-tag';
export type ArtifactsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ArtifactsQuery = { __typename?: 'Query', artifacts?: { __typename?: 'ArtifactNodeConnection', edges: Array<{ __typename?: 'ArtifactNodeEdge', node?: { __typename?: 'ArtifactNode', id: string, name: string, description?: string | null, imageId?: string | null, thumbnailId?: string | null, created: any, updated: any, items: { __typename?: 'ItemNodeConnection', edges: Array<{ __typename?: 'ItemNodeEdge', node?: { __typename?: 'ItemNode', id: string, name: string, weapon?: { __typename?: 'WeaponTraitsNode', attackBonus: number } | null, armor?: { __typename?: 'ArmorTraitsNode', acBonus: number } | null, equipment?: { __typename?: 'EquipmentTraitsNode', briefDescription: string } | null } | null } | null> } } | null } | null> } | null };

export type ArtifactByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type ArtifactByIdQuery = { __typename?: 'Query', artifact?: { __typename?: 'ArtifactNode', id: string, name: string, description?: string | null, imageId?: string | null, thumbnailId?: string | null, created: any, updated: any, items: { __typename?: 'ItemNodeConnection', edges: Array<{ __typename?: 'ItemNodeEdge', node?: { __typename?: 'ItemNode', id: string, name: string, weapon?: { __typename?: 'WeaponTraitsNode', attackBonus: number } | null, armor?: { __typename?: 'ArmorTraitsNode', acBonus: number } | null, equipment?: { __typename?: 'EquipmentTraitsNode', briefDescription: string } | null } | null } | null> } } | null };


type SubscribeWrapperArgs<T> = {
	variables?: T,
}

interface CacheFunctionOptions {
	update?: boolean
}


export const ArtifactsDoc = gql`
    query artifacts {
  artifacts {
    edges {
      node {
        id
        name
        description
        imageId
        thumbnailId
        created
        updated
        items {
          edges {
            node {
              id
              name
              weapon {
                attackBonus
              }
              armor {
                acBonus
              }
              equipment {
                briefDescription
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const ArtifactByIdDoc = gql`
    query artifactById($id: ID!) {
  artifact(id: $id) {
    id
    name
    description
    imageId
    thumbnailId
    created
    updated
    items {
      edges {
        node {
          id
          name
          weapon {
            attackBonus
          }
          armor {
            acBonus
          }
          equipment {
            briefDescription
          }
        }
      }
    }
  }
}
    `;

export const artifacts = writable<GFetchReturnWithErrors<ArtifactsQuery>>({
	errors: [],
	gQueryStatus: 'LOADING',
})

// Cached
export async function getArtifacts({ fetch, variables }: GGetParameters<ArtifactsQueryVariables>, options?: CacheFunctionOptions) {
	const data = await g.fetch<ArtifactsQuery>({
		queries: [{ query: ArtifactsDoc, variables }],
		fetch
	})
	artifacts.set({ ...data, errors: data?.errors, gQueryStatus: 'LOADED' })
	return data
}



export const artifactById = writable<GFetchReturnWithErrors<ArtifactByIdQuery>>({
	errors: [],
	gQueryStatus: 'LOADING',
})

// Cached
export async function getArtifactById({ fetch, variables }: GGetParameters<ArtifactByIdQueryVariables>, options?: CacheFunctionOptions) {
	const data = await g.fetch<ArtifactByIdQuery>({
		queries: [{ query: ArtifactByIdDoc, variables }],
		fetch
	})
	artifactById.set({ ...data, errors: data?.errors, gQueryStatus: 'LOADED' })
	return data
}

