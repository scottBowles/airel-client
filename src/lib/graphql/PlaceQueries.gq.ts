import type * as Types from './types.gq';

import { writable } from "svelte/store"
import { g } from '$lib/config/g'
import type { GFetchReturnWithErrors, GGetParameters } from '@leveluptuts/g-query'
import gql from 'graphql-tag';
export type PlacesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PlacesQuery = { __typename?: 'Query', places?: { __typename?: 'PlaceNodeConnection', edges: Array<{ __typename?: 'PlaceNodeEdge', node?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageId?: string | null, thumbnailId?: string | null, created: any, updated: any, placeType: Types.PlacePlacePlaceTypeChoices, population: number, parent?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageId?: string | null, thumbnailId?: string | null, created: any, updated: any, placeType: Types.PlacePlacePlaceTypeChoices, population: number, parent?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageId?: string | null, thumbnailId?: string | null, created: any, updated: any, placeType: Types.PlacePlacePlaceTypeChoices, population: number } | null } | null } | null } | null> } | null };

export type PlaceByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type PlaceByIdQuery = { __typename?: 'Query', place?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageId?: string | null, thumbnailId?: string | null, created: any, updated: any, placeType: Types.PlacePlacePlaceTypeChoices, population: number, parent?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageId?: string | null, thumbnailId?: string | null, created: any, updated: any, placeType: Types.PlacePlacePlaceTypeChoices, population: number, parent?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageId?: string | null, thumbnailId?: string | null, created: any, updated: any, placeType: Types.PlacePlacePlaceTypeChoices, population: number } | null } | null } | null };


type SubscribeWrapperArgs<T> = {
	variables?: T,
}

interface CacheFunctionOptions {
	update?: boolean
}


export const PlacesDoc = gql`
    query places {
  places {
    edges {
      node {
        id
        name
        description
        imageId
        thumbnailId
        created
        updated
        placeType
        population
        parent {
          id
          name
          description
          imageId
          thumbnailId
          created
          updated
          placeType
          population
          parent {
            id
            name
            description
            imageId
            thumbnailId
            created
            updated
            placeType
            population
          }
        }
      }
    }
  }
}
    `;
export const PlaceByIdDoc = gql`
    query placeById($id: ID!) {
  place(id: $id) {
    id
    name
    description
    imageId
    thumbnailId
    created
    updated
    placeType
    population
    parent {
      id
      name
      description
      imageId
      thumbnailId
      created
      updated
      placeType
      population
      parent {
        id
        name
        description
        imageId
        thumbnailId
        created
        updated
        placeType
        population
      }
    }
  }
}
    `;

export const places = writable<GFetchReturnWithErrors<PlacesQuery>>({
	errors: [],
	gQueryStatus: 'LOADING',
})

// Cached
export async function getPlaces({ fetch, variables }: GGetParameters<PlacesQueryVariables>, options?: CacheFunctionOptions) {
	const data = await g.fetch<PlacesQuery>({
		queries: [{ query: PlacesDoc, variables }],
		fetch
	})
	places.set({ ...data, errors: data?.errors, gQueryStatus: 'LOADED' })
	return data
}



export const placeById = writable<GFetchReturnWithErrors<PlaceByIdQuery>>({
	errors: [],
	gQueryStatus: 'LOADING',
})

// Cached
export async function getPlaceById({ fetch, variables }: GGetParameters<PlaceByIdQueryVariables>, options?: CacheFunctionOptions) {
	const data = await g.fetch<PlaceByIdQuery>({
		queries: [{ query: PlaceByIdDoc, variables }],
		fetch
	})
	placeById.set({ ...data, errors: data?.errors, gQueryStatus: 'LOADED' })
	return data
}

