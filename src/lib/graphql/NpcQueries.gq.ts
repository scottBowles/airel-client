import type * as Types from './types.gq';

import { writable } from "svelte/store"
import { g } from '$lib/config/g'
import type { GFetchReturnWithErrors, GGetParameters } from '@leveluptuts/g-query'
import gql from 'graphql-tag';
export type NpcsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type NpcsQuery = { __typename?: 'Query', npcs?: { __typename?: 'NPCNodeConnection', edges: Array<{ __typename?: 'NPCNodeEdge', node?: { __typename?: 'NPCNode', id: string, name: string, description?: string | null, imageId?: string | null, thumbnailId?: string | null, size?: Types.CharacterNpcSizeChoices | null, race?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageId?: string | null, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: Types.RaceRaceAlignmentChoices | null, size?: Types.RaceRaceSizeChoices | null, speed?: number | null } | null, featuresAndTraits?: { __typename?: 'FeaturesAndTraitConnection', edges: Array<{ __typename?: 'FeaturesAndTraitEdge', node?: { __typename?: 'FeatureNode', id: string, name: string, description: string } | null } | null> } | null, proficiencies: { __typename?: 'ProficiencyNodeConnection', edges: Array<{ __typename?: 'ProficiencyNodeEdge', node?: { __typename?: 'ProficiencyNode', id: string, name: string, description: string, proficiencyType: Types.CharacterProficiencyProficiencyTypeChoices } | null } | null> } } | null } | null> } | null };

export type NpcByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type NpcByIdQuery = { __typename?: 'Query', npc?: { __typename?: 'NPCNode', id: string, name: string, description?: string | null, imageId?: string | null, thumbnailId?: string | null, size?: Types.CharacterNpcSizeChoices | null, race?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageId?: string | null, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: Types.RaceRaceAlignmentChoices | null, size?: Types.RaceRaceSizeChoices | null, speed?: number | null } | null, featuresAndTraits?: { __typename?: 'FeaturesAndTraitConnection', edges: Array<{ __typename?: 'FeaturesAndTraitEdge', node?: { __typename?: 'FeatureNode', id: string, name: string, description: string } | null } | null> } | null, proficiencies: { __typename?: 'ProficiencyNodeConnection', edges: Array<{ __typename?: 'ProficiencyNodeEdge', node?: { __typename?: 'ProficiencyNode', id: string, name: string, description: string, proficiencyType: Types.CharacterProficiencyProficiencyTypeChoices } | null } | null> } } | null };


type SubscribeWrapperArgs<T> = {
	variables?: T,
}

interface CacheFunctionOptions {
	update?: boolean
}


export const NpcsDoc = gql`
    query npcs {
  npcs {
    edges {
      node {
        id
        name
        description
        imageId
        thumbnailId
        size
        race {
          id
          name
          description
          imageId
          thumbnailId
          ageOfAdulthood
          lifeExpectancy
          alignment
          size
          speed
        }
        featuresAndTraits {
          edges {
            node {
              id
              name
              description
            }
          }
        }
        proficiencies {
          edges {
            node {
              id
              name
              description
              proficiencyType
            }
          }
        }
      }
    }
  }
}
    `;
export const NpcByIdDoc = gql`
    query npcById($id: ID!) {
  npc(id: $id) {
    id
    name
    description
    imageId
    thumbnailId
    size
    race {
      id
      name
      description
      imageId
      thumbnailId
      ageOfAdulthood
      lifeExpectancy
      alignment
      size
      speed
    }
    featuresAndTraits {
      edges {
        node {
          id
          name
          description
        }
      }
    }
    proficiencies {
      edges {
        node {
          id
          name
          description
          proficiencyType
        }
      }
    }
  }
}
    `;

export const npcs = writable<GFetchReturnWithErrors<NpcsQuery>>({
	errors: [],
	gQueryStatus: 'LOADING',
})

// Cached
export async function getNpcs({ fetch, variables }: GGetParameters<NpcsQueryVariables>, options?: CacheFunctionOptions) {
	const data = await g.fetch<NpcsQuery>({
		queries: [{ query: NpcsDoc, variables }],
		fetch
	})
	npcs.set({ ...data, errors: data?.errors, gQueryStatus: 'LOADED' })
	return data
}



export const npcById = writable<GFetchReturnWithErrors<NpcByIdQuery>>({
	errors: [],
	gQueryStatus: 'LOADING',
})

// Cached
export async function getNpcById({ fetch, variables }: GGetParameters<NpcByIdQueryVariables>, options?: CacheFunctionOptions) {
	const data = await g.fetch<NpcByIdQuery>({
		queries: [{ query: NpcByIdDoc, variables }],
		fetch
	})
	npcById.set({ ...data, errors: data?.errors, gQueryStatus: 'LOADED' })
	return data
}

