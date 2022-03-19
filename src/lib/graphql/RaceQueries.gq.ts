import type * as Types from './types.gq';

import { writable } from "svelte/store"
import { g } from '$lib/config/g'
import type { GFetchReturnWithErrors, GGetParameters } from '@leveluptuts/g-query'
import gql from 'graphql-tag';
export type RacesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type RacesQuery = { __typename?: 'Query', races?: { __typename?: 'RaceNodeConnection', edges: Array<{ __typename?: 'RaceNodeEdge', node?: { __typename?: 'RaceNode', id: string, name: string, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: Types.RaceRaceAlignmentChoices | null, size?: Types.RaceRaceSizeChoices | null, speed?: number | null, baseRace?: { __typename?: 'RaceNode', id: string, name: string, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: Types.RaceRaceAlignmentChoices | null, size?: Types.RaceRaceSizeChoices | null, speed?: number | null } | null, subraces: { __typename?: 'RaceNodeConnection', edges: Array<{ __typename?: 'RaceNodeEdge', node?: { __typename?: 'RaceNode', id: string, name: string, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: Types.RaceRaceAlignmentChoices | null, size?: Types.RaceRaceSizeChoices | null, speed?: number | null } | null } | null> }, languages: { __typename?: 'LanguageNodeConnection', edges: Array<{ __typename?: 'LanguageNodeEdge', node?: { __typename?: 'LanguageNode', id: string, name: string, description: string, script?: { __typename?: 'ScriptNode', name: string } | null } | null } | null> }, traits: { __typename?: 'TraitNodeConnection', edges: Array<{ __typename?: 'TraitNodeEdge', node?: { __typename?: 'TraitNode', id: string, name: string, description?: string | null } | null } | null> } } | null } | null> } | null };

export type RaceByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type RaceByIdQuery = { __typename?: 'Query', race?: { __typename?: 'RaceNode', id: string, name: string, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: Types.RaceRaceAlignmentChoices | null, size?: Types.RaceRaceSizeChoices | null, speed?: number | null, baseRace?: { __typename?: 'RaceNode', id: string, name: string, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: Types.RaceRaceAlignmentChoices | null, size?: Types.RaceRaceSizeChoices | null, speed?: number | null } | null, subraces: { __typename?: 'RaceNodeConnection', edges: Array<{ __typename?: 'RaceNodeEdge', node?: { __typename?: 'RaceNode', id: string, name: string, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: Types.RaceRaceAlignmentChoices | null, size?: Types.RaceRaceSizeChoices | null, speed?: number | null } | null } | null> }, languages: { __typename?: 'LanguageNodeConnection', edges: Array<{ __typename?: 'LanguageNodeEdge', node?: { __typename?: 'LanguageNode', id: string, name: string, description: string, script?: { __typename?: 'ScriptNode', name: string } | null } | null } | null> }, traits: { __typename?: 'TraitNodeConnection', edges: Array<{ __typename?: 'TraitNodeEdge', node?: { __typename?: 'TraitNode', id: string, name: string, description?: string | null } | null } | null> } } | null };


type SubscribeWrapperArgs<T> = {
	variables?: T,
}

interface CacheFunctionOptions {
	update?: boolean
}


export const RacesDoc = gql`
    query races {
  races {
    edges {
      node {
        id
        name
        ageOfAdulthood
        lifeExpectancy
        alignment
        size
        speed
        baseRace {
          id
          name
          ageOfAdulthood
          lifeExpectancy
          alignment
          size
          speed
        }
        subraces {
          edges {
            node {
              id
              name
              ageOfAdulthood
              lifeExpectancy
              alignment
              size
              speed
            }
          }
        }
        languages {
          edges {
            node {
              id
              name
              description
              script {
                name
              }
            }
          }
        }
        traits {
          edges {
            node {
              id
              name
              description
            }
          }
        }
      }
    }
  }
}
    `;
export const RaceByIdDoc = gql`
    query raceById($id: ID!) {
  race(id: $id) {
    id
    name
    ageOfAdulthood
    lifeExpectancy
    alignment
    size
    speed
    baseRace {
      id
      name
      ageOfAdulthood
      lifeExpectancy
      alignment
      size
      speed
    }
    subraces {
      edges {
        node {
          id
          name
          ageOfAdulthood
          lifeExpectancy
          alignment
          size
          speed
        }
      }
    }
    languages {
      edges {
        node {
          id
          name
          description
          script {
            name
          }
        }
      }
    }
    traits {
      edges {
        node {
          id
          name
          description
        }
      }
    }
  }
}
    `;

export const races = writable<GFetchReturnWithErrors<RacesQuery>>({
	errors: [],
	gQueryStatus: 'LOADING',
})

// Cached
export async function getRaces({ fetch, variables }: GGetParameters<RacesQueryVariables>, options?: CacheFunctionOptions) {
	const data = await g.fetch<RacesQuery>({
		queries: [{ query: RacesDoc, variables }],
		fetch
	})
	races.set({ ...data, errors: data?.errors, gQueryStatus: 'LOADED' })
	return data
}



export const raceById = writable<GFetchReturnWithErrors<RaceByIdQuery>>({
	errors: [],
	gQueryStatus: 'LOADING',
})

// Cached
export async function getRaceById({ fetch, variables }: GGetParameters<RaceByIdQueryVariables>, options?: CacheFunctionOptions) {
	const data = await g.fetch<RaceByIdQuery>({
		queries: [{ query: RaceByIdDoc, variables }],
		fetch
	})
	raceById.set({ ...data, errors: data?.errors, gQueryStatus: 'LOADED' })
	return data
}

