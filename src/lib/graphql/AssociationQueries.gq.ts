import type * as Types from './types.gq';

import { writable } from "svelte/store"
import { g } from '$lib/config/g'
import type { GFetchReturnWithErrors, GGetParameters } from '@leveluptuts/g-query'
import gql from 'graphql-tag';
export type AssociationsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AssociationsQuery = { __typename?: 'Query', associations?: { __typename?: 'AssociationNodeConnection', edges: Array<{ __typename?: 'AssociationNodeEdge', node?: { __typename?: 'AssociationNode', id: string, name: string, description?: string | null, imageId?: string | null, thumbnailId?: string | null, markdownNotes: string, lockTime?: any | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null } | null } | null> } | null };

export type AssociationByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type AssociationByIdQuery = { __typename?: 'Query', association?: { __typename?: 'AssociationNode', id: string, name: string, description?: string | null, imageId?: string | null, thumbnailId?: string | null, markdownNotes: string, lockTime?: any | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null } | null };

export type AssociationLockMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type AssociationLockMutation = { __typename?: 'Mutation', associationLock?: { __typename?: 'AssociationLockMutationPayload', ok?: boolean | null, errors?: string | null } | null };

export type AssociationReleaseLockMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type AssociationReleaseLockMutation = { __typename?: 'Mutation', associationReleaseLock?: { __typename?: 'AssociationReleaseLockMutationPayload', ok?: boolean | null, errors?: string | null } | null };

export type AssociationPatchMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  name?: Types.InputMaybe<Types.Scalars['String']>;
  description?: Types.InputMaybe<Types.Scalars['String']>;
  imageId?: Types.InputMaybe<Types.Scalars['String']>;
  thumbnailId?: Types.InputMaybe<Types.Scalars['String']>;
  markdownNotes?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type AssociationPatchMutation = { __typename?: 'Mutation', associationPatch?: { __typename?: 'AssociationPatchMutationPayload', ok?: boolean | null, errors?: string | null, association?: { __typename?: 'AssociationNode', id: string, name: string, description?: string | null, imageId?: string | null, thumbnailId?: string | null, markdownNotes: string, lockTime?: any | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null } | null } | null };


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
        markdownNotes
        lockUser {
          id
          username
        }
        lockTime
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
    markdownNotes
    lockUser {
      id
      username
    }
    lockTime
  }
}
    `;
export const AssociationLockDoc = gql`
    mutation associationLock($id: ID!) {
  associationLock(input: {id: $id}) {
    ok
    errors
  }
}
    `;
export const AssociationReleaseLockDoc = gql`
    mutation associationReleaseLock($id: ID!) {
  associationReleaseLock(input: {id: $id}) {
    ok
    errors
  }
}
    `;
export const AssociationPatchDoc = gql`
    mutation associationPatch($id: ID!, $name: String, $description: String, $imageId: String, $thumbnailId: String, $markdownNotes: String) {
  associationPatch(
    input: {id: $id, name: $name, description: $description, imageId: $imageId, thumbnailId: $thumbnailId, markdownNotes: $markdownNotes}
  ) {
    ok
    errors
    association {
      id
      name
      description
      imageId
      thumbnailId
      markdownNotes
      lockUser {
        id
        username
      }
      lockTime
    }
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



export const associationLock = ({ variables }: SubscribeWrapperArgs<AssociationLockMutationVariables>):
Promise<GFetchReturnWithErrors<AssociationLockMutation>> =>
	g.fetch<AssociationLockMutation>({
		queries: [{ query: AssociationLockDoc, variables }],
		fetch,
	})


export const associationReleaseLock = ({ variables }: SubscribeWrapperArgs<AssociationReleaseLockMutationVariables>):
Promise<GFetchReturnWithErrors<AssociationReleaseLockMutation>> =>
	g.fetch<AssociationReleaseLockMutation>({
		queries: [{ query: AssociationReleaseLockDoc, variables }],
		fetch,
	})


export const associationPatch = ({ variables }: SubscribeWrapperArgs<AssociationPatchMutationVariables>):
Promise<GFetchReturnWithErrors<AssociationPatchMutation>> =>
	g.fetch<AssociationPatchMutation>({
		queries: [{ query: AssociationPatchDoc, variables }],
		fetch,
	})
