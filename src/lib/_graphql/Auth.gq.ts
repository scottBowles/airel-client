import type * as Types from './types.gq';

import { writable } from "svelte/store"
import { g } from '$lib/config/g'
import type { GFetchReturnWithErrors, GGetParameters } from '@leveluptuts/g-query'
import gql from 'graphql-tag';
export type LoginMutationVariables = Types.Exact<{
  username: Types.Scalars['String'];
  password: Types.Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', tokenAuth?: { __typename?: 'ObtainJSONWebTokenPayload', token: string, payload: any } | null };


type SubscribeWrapperArgs<T> = {
	variables?: T,
}

interface CacheFunctionOptions {
	update?: boolean
}


export const LoginDoc = gql`
    mutation login($username: String!, $password: String!) {
  tokenAuth(input: {username: $username, password: $password}) {
    token
    payload
  }
}
    `;

export const login = ({ variables }: SubscribeWrapperArgs<LoginMutationVariables>):
Promise<GFetchReturnWithErrors<LoginMutation>> =>
	g.fetch<LoginMutation>({
		queries: [{ query: LoginDoc, variables }],
		fetch,
	})
