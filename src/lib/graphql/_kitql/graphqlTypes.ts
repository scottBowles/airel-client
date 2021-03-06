import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
};

export type AbilityScoreIncreaseNode = Node & {
  __typename?: 'AbilityScoreIncreaseNode';
  abilityScore: RaceAbilityScoreIncreaseAbilityScoreChoices;
  /** The ID of the object */
  id: Scalars['ID'];
  increase: Scalars['Int'];
};

export type AbilityScoreIncreaseNodeConnection = {
  __typename?: 'AbilityScoreIncreaseNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<AbilityScoreIncreaseNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `AbilityScoreIncreaseNode` and its cursor. */
export type AbilityScoreIncreaseNodeEdge = {
  __typename?: 'AbilityScoreIncreaseNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<AbilityScoreIncreaseNode>;
};

export type AbilityscoreincreaseCreateMutationInput = {
  abilityScore: Scalars['String'];
  clientMutationId?: InputMaybe<Scalars['String']>;
  increase: Scalars['Int'];
};

export type AbilityscoreincreaseCreateMutationPayload = {
  __typename?: 'AbilityscoreincreaseCreateMutationPayload';
  abilityScoreIncrease?: Maybe<AbilityScoreIncreaseNode>;
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type AddEntityLogMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  entityId?: InputMaybe<Scalars['ID']>;
  logId?: InputMaybe<Scalars['ID']>;
  logUrl?: InputMaybe<Scalars['String']>;
};

export type AddEntityLogMutationPayload = {
  __typename?: 'AddEntityLogMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  log?: Maybe<GameLogNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type ArmorInput = {
  acBonus?: InputMaybe<Scalars['Int']>;
};

export type ArmorTraitsNode = Node & {
  __typename?: 'ArmorTraitsNode';
  acBonus: Scalars['Int'];
  /** The ID of the object */
  id: Scalars['ID'];
};

export type ArtifactAddImageMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  imageId?: InputMaybe<Scalars['String']>;
};

export type ArtifactAddImageMutationPayload = {
  __typename?: 'ArtifactAddImageMutationPayload';
  artifact?: Maybe<ArtifactNode>;
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type ArtifactCreateMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  imageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  items?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  thumbnailId?: InputMaybe<Scalars['String']>;
};

export type ArtifactCreateMutationPayload = {
  __typename?: 'ArtifactCreateMutationPayload';
  artifact?: Maybe<ArtifactNode>;
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type ArtifactDeleteMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ArtifactDeleteMutationPayload = {
  __typename?: 'ArtifactDeleteMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type ArtifactLockMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ArtifactLockMutationPayload = {
  __typename?: 'ArtifactLockMutationPayload';
  artifact?: Maybe<ArtifactNode>;
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type ArtifactNode = Node & {
  __typename?: 'ArtifactNode';
  created: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  /** The ID of the object */
  id: Scalars['ID'];
  imageIds: Array<Scalars['String']>;
  items: ItemNodeConnection;
  lockTime?: Maybe<Scalars['DateTime']>;
  lockUser?: Maybe<UserNode>;
  lockedBySelf?: Maybe<Scalars['Boolean']>;
  logs: GameLogNodeConnection;
  markdownNotes?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  thumbnailId?: Maybe<Scalars['String']>;
  updated: Scalars['DateTime'];
};


export type ArtifactNodeItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  created?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  updated?: InputMaybe<Scalars['DateTime']>;
};


export type ArtifactNodeLogsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type ArtifactNodeConnection = {
  __typename?: 'ArtifactNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ArtifactNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ArtifactNode` and its cursor. */
export type ArtifactNodeEdge = {
  __typename?: 'ArtifactNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<ArtifactNode>;
};

export type ArtifactPatchMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  imageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  items?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  thumbnailId?: InputMaybe<Scalars['String']>;
};

export type ArtifactPatchMutationPayload = {
  __typename?: 'ArtifactPatchMutationPayload';
  artifact?: Maybe<ArtifactNode>;
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type ArtifactReleaseLockMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ArtifactReleaseLockMutationPayload = {
  __typename?: 'ArtifactReleaseLockMutationPayload';
  artifact?: Maybe<ArtifactNode>;
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type ArtifactUpdateMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  imageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  items?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  thumbnailId?: InputMaybe<Scalars['String']>;
};

export type ArtifactUpdateMutationPayload = {
  __typename?: 'ArtifactUpdateMutationPayload';
  artifact?: Maybe<ArtifactNode>;
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type AssociationAddImageMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  imageId?: InputMaybe<Scalars['String']>;
};

export type AssociationAddImageMutationPayload = {
  __typename?: 'AssociationAddImageMutationPayload';
  association?: Maybe<AssociationNode>;
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type AssociationCreateMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  imageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  npcs?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  thumbnailId?: InputMaybe<Scalars['String']>;
};

export type AssociationCreateMutationPayload = {
  __typename?: 'AssociationCreateMutationPayload';
  association?: Maybe<AssociationNode>;
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type AssociationDeleteMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type AssociationDeleteMutationPayload = {
  __typename?: 'AssociationDeleteMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type AssociationLockMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type AssociationLockMutationPayload = {
  __typename?: 'AssociationLockMutationPayload';
  association?: Maybe<AssociationNode>;
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type AssociationNode = Node & {
  __typename?: 'AssociationNode';
  created: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  /** The ID of the object */
  id: Scalars['ID'];
  imageIds: Array<Scalars['String']>;
  lockTime?: Maybe<Scalars['DateTime']>;
  lockUser?: Maybe<UserNode>;
  lockedBySelf?: Maybe<Scalars['Boolean']>;
  logs: GameLogNodeConnection;
  markdownNotes?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  npcs: NpcNodeConnection;
  thumbnailId?: Maybe<Scalars['String']>;
  updated: Scalars['DateTime'];
};


export type AssociationNodeLogsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type AssociationNodeNpcsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type AssociationNodeConnection = {
  __typename?: 'AssociationNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<AssociationNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `AssociationNode` and its cursor. */
export type AssociationNodeEdge = {
  __typename?: 'AssociationNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<AssociationNode>;
};

export type AssociationPatchMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  imageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  npcs?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  thumbnailId?: InputMaybe<Scalars['String']>;
};

export type AssociationPatchMutationPayload = {
  __typename?: 'AssociationPatchMutationPayload';
  association?: Maybe<AssociationNode>;
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type AssociationReleaseLockMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type AssociationReleaseLockMutationPayload = {
  __typename?: 'AssociationReleaseLockMutationPayload';
  association?: Maybe<AssociationNode>;
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type AssociationUpdateMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  imageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  npcs?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  thumbnailId?: InputMaybe<Scalars['String']>;
};

export type AssociationUpdateMutationPayload = {
  __typename?: 'AssociationUpdateMutationPayload';
  association?: Maybe<AssociationNode>;
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

/** An enumeration. */
export enum CharacterNpcSizeChoices {
  /** Gargantuan */
  Gargantuan = 'GARGANTUAN',
  /** Huge */
  Huge = 'HUGE',
  /** Large */
  Large = 'LARGE',
  /** Medium */
  Medium = 'MEDIUM',
  /** Small */
  Small = 'SMALL',
  /** Tiny */
  Tiny = 'TINY'
}

/** An enumeration. */
export enum CharacterProficiencyProficiencyTypeChoices {
  /** Ability */
  Ability = 'ABILITY',
  /** Armor */
  Armor = 'ARMOR',
  /** Language */
  Language = 'LANGUAGE',
  /** Other */
  Other = 'OTHER',
  /** Skill */
  Skill = 'SKILL',
  /** Tool */
  Tool = 'TOOL',
  /** Weapon */
  Weapon = 'WEAPON'
}

/** An enumeration. */
export enum CharacterSkillRelatedAbilityChoices {
  /** Charisma */
  Charisma = 'CHARISMA',
  /** Constitution */
  Constitution = 'CONSTITUTION',
  /** Dexterity */
  Dexterity = 'DEXTERITY',
  /** Intelligence */
  Intelligence = 'INTELLIGENCE',
  /** Strength */
  Strength = 'STRENGTH',
  /** Wisdom */
  Wisdom = 'WISDOM'
}

export type EquipmentInput = {
  briefDescription?: InputMaybe<Scalars['String']>;
};

export type EquipmentTraitsNode = Node & {
  __typename?: 'EquipmentTraitsNode';
  briefDescription: Scalars['String'];
  /** The ID of the object */
  id: Scalars['ID'];
};

export type ExportAddImageMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  imageId?: InputMaybe<Scalars['String']>;
};

export type ExportAddImageMutationPayload = {
  __typename?: 'ExportAddImageMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  export?: Maybe<ExportNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type ExportConnection = {
  __typename?: 'ExportConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ExportEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

export type ExportCreateMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ExportCreateMutationPayload = {
  __typename?: 'ExportCreateMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  export?: Maybe<ExportNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type ExportDeleteMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ExportDeleteMutationPayload = {
  __typename?: 'ExportDeleteMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

/** A Relay edge containing a `Export` and its cursor. */
export type ExportEdge = {
  __typename?: 'ExportEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<ExportNode>;
  significance?: Maybe<Scalars['String']>;
};

export type ExportLockMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ExportLockMutationPayload = {
  __typename?: 'ExportLockMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  export?: Maybe<ExportNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type ExportNode = Node & {
  __typename?: 'ExportNode';
  created: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  /** The ID of the object */
  id: Scalars['ID'];
  lockTime?: Maybe<Scalars['DateTime']>;
  lockUser?: Maybe<UserNode>;
  lockedBySelf?: Maybe<Scalars['Boolean']>;
  markdownNotes?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  updated: Scalars['DateTime'];
};

export type ExportNodeConnection = {
  __typename?: 'ExportNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ExportNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ExportNode` and its cursor. */
export type ExportNodeEdge = {
  __typename?: 'ExportNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<ExportNode>;
};

export type ExportPatchMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ExportPatchMutationPayload = {
  __typename?: 'ExportPatchMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  export?: Maybe<ExportNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type ExportReleaseLockMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ExportReleaseLockMutationPayload = {
  __typename?: 'ExportReleaseLockMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  export?: Maybe<ExportNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type ExportUpdateMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ExportUpdateMutationPayload = {
  __typename?: 'ExportUpdateMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  export?: Maybe<ExportNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type FeatureCreateMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FeatureCreateMutationPayload = {
  __typename?: 'FeatureCreateMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  feature?: Maybe<FeatureNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type FeatureDeleteMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type FeatureDeleteMutationPayload = {
  __typename?: 'FeatureDeleteMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type FeatureNode = Node & {
  __typename?: 'FeatureNode';
  description: Scalars['String'];
  /** The ID of the object */
  id: Scalars['ID'];
  name: Scalars['String'];
  npcs: NpcNodeConnection;
};


export type FeatureNodeNpcsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type FeatureNodeConnection = {
  __typename?: 'FeatureNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<FeatureNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `FeatureNode` and its cursor. */
export type FeatureNodeEdge = {
  __typename?: 'FeatureNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<FeatureNode>;
};

export type FeaturePatchMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FeaturePatchMutationPayload = {
  __typename?: 'FeaturePatchMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  feature?: Maybe<FeatureNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type FeatureUpdateMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FeatureUpdateMutationPayload = {
  __typename?: 'FeatureUpdateMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  feature?: Maybe<FeatureNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type FeaturesAndTraitConnection = {
  __typename?: 'FeaturesAndTraitConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<FeaturesAndTraitEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `FeaturesAndTrait` and its cursor. */
export type FeaturesAndTraitEdge = {
  __typename?: 'FeaturesAndTraitEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<FeatureNode>;
};

export type GameLogNode = Node & {
  __typename?: 'GameLogNode';
  /** The ID of the object */
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type GameLogNodeConnection = {
  __typename?: 'GameLogNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<GameLogNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `GameLogNode` and its cursor. */
export type GameLogNodeEdge = {
  __typename?: 'GameLogNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<GameLogNode>;
};

export type ItemAddImageMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  imageId?: InputMaybe<Scalars['String']>;
};

export type ItemAddImageMutationPayload = {
  __typename?: 'ItemAddImageMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  item?: Maybe<ItemNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type ItemCreateMutationInput = {
  armor?: InputMaybe<ArmorInput>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  equipment?: InputMaybe<EquipmentInput>;
  imageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  thumbnailId?: InputMaybe<Scalars['String']>;
  weapon?: InputMaybe<WeaponInput>;
};

export type ItemCreateMutationPayload = {
  __typename?: 'ItemCreateMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  item?: Maybe<ItemNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type ItemDeleteMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ItemDeleteMutationPayload = {
  __typename?: 'ItemDeleteMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type ItemLockMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ItemLockMutationPayload = {
  __typename?: 'ItemLockMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  item?: Maybe<ItemNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type ItemNode = Node & {
  __typename?: 'ItemNode';
  armor?: Maybe<ArmorTraitsNode>;
  created: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  equipment?: Maybe<EquipmentTraitsNode>;
  /** The ID of the object */
  id: Scalars['ID'];
  imageIds: Array<Scalars['String']>;
  lockTime?: Maybe<Scalars['DateTime']>;
  lockUser?: Maybe<UserNode>;
  lockedBySelf?: Maybe<Scalars['Boolean']>;
  logs: GameLogNodeConnection;
  markdownNotes?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  thumbnailId?: Maybe<Scalars['String']>;
  updated: Scalars['DateTime'];
  weapon?: Maybe<WeaponTraitsNode>;
};


export type ItemNodeLogsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type ItemNodeConnection = {
  __typename?: 'ItemNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ItemNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ItemNode` and its cursor. */
export type ItemNodeEdge = {
  __typename?: 'ItemNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<ItemNode>;
};

export type ItemPatchMutationInput = {
  armor?: InputMaybe<ArmorInput>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  equipment?: InputMaybe<EquipmentInput>;
  id?: InputMaybe<Scalars['ID']>;
  imageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  thumbnailId?: InputMaybe<Scalars['String']>;
  weapon?: InputMaybe<WeaponInput>;
};

export type ItemPatchMutationPayload = {
  __typename?: 'ItemPatchMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  item?: Maybe<ItemNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type ItemReleaseLockMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ItemReleaseLockMutationPayload = {
  __typename?: 'ItemReleaseLockMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  item?: Maybe<ItemNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type ItemUpdateMutationInput = {
  armor?: InputMaybe<ArmorInput>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  equipment?: InputMaybe<EquipmentInput>;
  id?: InputMaybe<Scalars['ID']>;
  imageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  thumbnailId?: InputMaybe<Scalars['String']>;
  weapon?: InputMaybe<WeaponInput>;
};

export type ItemUpdateMutationPayload = {
  __typename?: 'ItemUpdateMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  item?: Maybe<ItemNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type LanguageCreateMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  script?: InputMaybe<Scalars['String']>;
};

export type LanguageCreateMutationPayload = {
  __typename?: 'LanguageCreateMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  language?: Maybe<LanguageNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type LanguageDeleteMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type LanguageDeleteMutationPayload = {
  __typename?: 'LanguageDeleteMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type LanguageNode = Node & {
  __typename?: 'LanguageNode';
  description: Scalars['String'];
  /** The ID of the object */
  id: Scalars['ID'];
  name: Scalars['String'];
  script?: Maybe<ScriptNode>;
};

export type LanguageNodeConnection = {
  __typename?: 'LanguageNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<LanguageNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `LanguageNode` and its cursor. */
export type LanguageNodeEdge = {
  __typename?: 'LanguageNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<LanguageNode>;
};

export type LanguagePatchMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  script?: InputMaybe<Scalars['String']>;
};

export type LanguagePatchMutationPayload = {
  __typename?: 'LanguagePatchMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  language?: Maybe<LanguageNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type LanguageUpdateMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  script?: InputMaybe<Scalars['String']>;
};

export type LanguageUpdateMutationPayload = {
  __typename?: 'LanguageUpdateMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  language?: Maybe<LanguageNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  abilityScoreIncreaseCreate?: Maybe<AbilityscoreincreaseCreateMutationPayload>;
  addEntityLog?: Maybe<AddEntityLogMutationPayload>;
  artifactAddImage?: Maybe<ArtifactAddImageMutationPayload>;
  artifactCreate?: Maybe<ArtifactCreateMutationPayload>;
  artifactDelete?: Maybe<ArtifactDeleteMutationPayload>;
  artifactLock?: Maybe<ArtifactLockMutationPayload>;
  artifactPatch?: Maybe<ArtifactPatchMutationPayload>;
  artifactReleaseLock?: Maybe<ArtifactReleaseLockMutationPayload>;
  artifactUpdate?: Maybe<ArtifactUpdateMutationPayload>;
  associationAddImage?: Maybe<AssociationAddImageMutationPayload>;
  associationCreate?: Maybe<AssociationCreateMutationPayload>;
  associationDelete?: Maybe<AssociationDeleteMutationPayload>;
  associationLock?: Maybe<AssociationLockMutationPayload>;
  associationPatch?: Maybe<AssociationPatchMutationPayload>;
  associationReleaseLock?: Maybe<AssociationReleaseLockMutationPayload>;
  associationUpdate?: Maybe<AssociationUpdateMutationPayload>;
  exportAddImage?: Maybe<ExportAddImageMutationPayload>;
  exportCreate?: Maybe<ExportCreateMutationPayload>;
  exportDelete?: Maybe<ExportDeleteMutationPayload>;
  exportLock?: Maybe<ExportLockMutationPayload>;
  exportPatch?: Maybe<ExportPatchMutationPayload>;
  exportReleaseLock?: Maybe<ExportReleaseLockMutationPayload>;
  exportUpdate?: Maybe<ExportUpdateMutationPayload>;
  featureCreate?: Maybe<FeatureCreateMutationPayload>;
  featureDelete?: Maybe<FeatureDeleteMutationPayload>;
  featurePatch?: Maybe<FeaturePatchMutationPayload>;
  featureUpdate?: Maybe<FeatureUpdateMutationPayload>;
  itemAddImage?: Maybe<ItemAddImageMutationPayload>;
  itemCreate?: Maybe<ItemCreateMutationPayload>;
  itemDelete?: Maybe<ItemDeleteMutationPayload>;
  itemLock?: Maybe<ItemLockMutationPayload>;
  itemPatch?: Maybe<ItemPatchMutationPayload>;
  itemReleaseLock?: Maybe<ItemReleaseLockMutationPayload>;
  itemUpdate?: Maybe<ItemUpdateMutationPayload>;
  languageCreate?: Maybe<LanguageCreateMutationPayload>;
  languageDelete?: Maybe<LanguageDeleteMutationPayload>;
  languagePatch?: Maybe<LanguagePatchMutationPayload>;
  languageUpdate?: Maybe<LanguageUpdateMutationPayload>;
  npcAddImage?: Maybe<NpcAddImageMutationPayload>;
  npcCreate?: Maybe<NpcCreateMutationPayload>;
  npcDelete?: Maybe<NpcDeleteMutationPayload>;
  npcLock?: Maybe<NpcLockMutationPayload>;
  npcPatch?: Maybe<NpcPatchMutationPayload>;
  npcReleaseLock?: Maybe<NpcReleaseLockMutationPayload>;
  npcUpdate?: Maybe<NpcUpdateMutationPayload>;
  placeAddImage?: Maybe<PlaceAddImageMutationPayload>;
  placeCreate?: Maybe<PlaceCreateMutationPayload>;
  placeDelete?: Maybe<PlaceDeleteMutationPayload>;
  placeLock?: Maybe<PlaceLockMutationPayload>;
  placePatch?: Maybe<PlacePatchMutationPayload>;
  placeReleaseLock?: Maybe<PlaceReleaseLockMutationPayload>;
  placeUpdate?: Maybe<PlaceUpdateMutationPayload>;
  proficiencyCreate?: Maybe<ProficiencyCreateMutationPayload>;
  proficiencyDelete?: Maybe<ProficiencyDeleteMutationPayload>;
  proficiencyPatch?: Maybe<ProficiencyPatchMutationPayload>;
  proficiencyUpdate?: Maybe<ProficiencyUpdateMutationPayload>;
  raceAddImage?: Maybe<RaceAddImageMutationPayload>;
  raceCreate?: Maybe<RaceCreateMutationPayload>;
  raceDelete?: Maybe<RaceDeleteMutationPayload>;
  raceLock?: Maybe<RaceLockMutationPayload>;
  racePatch?: Maybe<RacePatchMutationPayload>;
  raceReleaseLock?: Maybe<RaceReleaseLockMutationPayload>;
  raceUpdate?: Maybe<RaceUpdateMutationPayload>;
  refreshToken?: Maybe<RefreshPayload>;
  removeEntityLog?: Maybe<RemoveEntityLogMutationPayload>;
  scriptCreate?: Maybe<ScriptCreateMutationPayload>;
  scriptDelete?: Maybe<ScriptDeleteMutationPayload>;
  scriptPatch?: Maybe<ScriptPatchMutationPayload>;
  scriptUpdate?: Maybe<ScriptUpdateMutationPayload>;
  skillCreate?: Maybe<SkillCreateMutationPayload>;
  skillDelete?: Maybe<SkillDeleteMutationPayload>;
  skillPatch?: Maybe<SkillPatchMutationPayload>;
  skillUpdate?: Maybe<SkillUpdateMutationPayload>;
  /** Obtain JSON Web Token mutation */
  tokenAuth?: Maybe<ObtainJsonWebTokenPayload>;
  traitCreate?: Maybe<TraitCreateMutationPayload>;
  traitDelete?: Maybe<TraitDeleteMutationPayload>;
  traitPatch?: Maybe<TraitPatchMutationPayload>;
  traitUpdate?: Maybe<TraitUpdateMutationPayload>;
  verifyToken?: Maybe<VerifyPayload>;
};


export type MutationAbilityScoreIncreaseCreateArgs = {
  input: AbilityscoreincreaseCreateMutationInput;
};


export type MutationAddEntityLogArgs = {
  input: AddEntityLogMutationInput;
};


export type MutationArtifactAddImageArgs = {
  input: ArtifactAddImageMutationInput;
};


export type MutationArtifactCreateArgs = {
  input: ArtifactCreateMutationInput;
};


export type MutationArtifactDeleteArgs = {
  input: ArtifactDeleteMutationInput;
};


export type MutationArtifactLockArgs = {
  input: ArtifactLockMutationInput;
};


export type MutationArtifactPatchArgs = {
  input: ArtifactPatchMutationInput;
};


export type MutationArtifactReleaseLockArgs = {
  input: ArtifactReleaseLockMutationInput;
};


export type MutationArtifactUpdateArgs = {
  input: ArtifactUpdateMutationInput;
};


export type MutationAssociationAddImageArgs = {
  input: AssociationAddImageMutationInput;
};


export type MutationAssociationCreateArgs = {
  input: AssociationCreateMutationInput;
};


export type MutationAssociationDeleteArgs = {
  input: AssociationDeleteMutationInput;
};


export type MutationAssociationLockArgs = {
  input: AssociationLockMutationInput;
};


export type MutationAssociationPatchArgs = {
  input: AssociationPatchMutationInput;
};


export type MutationAssociationReleaseLockArgs = {
  input: AssociationReleaseLockMutationInput;
};


export type MutationAssociationUpdateArgs = {
  input: AssociationUpdateMutationInput;
};


export type MutationExportAddImageArgs = {
  input: ExportAddImageMutationInput;
};


export type MutationExportCreateArgs = {
  input: ExportCreateMutationInput;
};


export type MutationExportDeleteArgs = {
  input: ExportDeleteMutationInput;
};


export type MutationExportLockArgs = {
  input: ExportLockMutationInput;
};


export type MutationExportPatchArgs = {
  input: ExportPatchMutationInput;
};


export type MutationExportReleaseLockArgs = {
  input: ExportReleaseLockMutationInput;
};


export type MutationExportUpdateArgs = {
  input: ExportUpdateMutationInput;
};


export type MutationFeatureCreateArgs = {
  input: FeatureCreateMutationInput;
};


export type MutationFeatureDeleteArgs = {
  input: FeatureDeleteMutationInput;
};


export type MutationFeaturePatchArgs = {
  input: FeaturePatchMutationInput;
};


export type MutationFeatureUpdateArgs = {
  input: FeatureUpdateMutationInput;
};


export type MutationItemAddImageArgs = {
  input: ItemAddImageMutationInput;
};


export type MutationItemCreateArgs = {
  input: ItemCreateMutationInput;
};


export type MutationItemDeleteArgs = {
  input: ItemDeleteMutationInput;
};


export type MutationItemLockArgs = {
  input: ItemLockMutationInput;
};


export type MutationItemPatchArgs = {
  input: ItemPatchMutationInput;
};


export type MutationItemReleaseLockArgs = {
  input: ItemReleaseLockMutationInput;
};


export type MutationItemUpdateArgs = {
  input: ItemUpdateMutationInput;
};


export type MutationLanguageCreateArgs = {
  input: LanguageCreateMutationInput;
};


export type MutationLanguageDeleteArgs = {
  input: LanguageDeleteMutationInput;
};


export type MutationLanguagePatchArgs = {
  input: LanguagePatchMutationInput;
};


export type MutationLanguageUpdateArgs = {
  input: LanguageUpdateMutationInput;
};


export type MutationNpcAddImageArgs = {
  input: NpcAddImageMutationInput;
};


export type MutationNpcCreateArgs = {
  input: NpcCreateMutationInput;
};


export type MutationNpcDeleteArgs = {
  input: NpcDeleteMutationInput;
};


export type MutationNpcLockArgs = {
  input: NpcLockMutationInput;
};


export type MutationNpcPatchArgs = {
  input: NpcPatchMutationInput;
};


export type MutationNpcReleaseLockArgs = {
  input: NpcReleaseLockMutationInput;
};


export type MutationNpcUpdateArgs = {
  input: NpcUpdateMutationInput;
};


export type MutationPlaceAddImageArgs = {
  input: PlaceAddImageMutationInput;
};


export type MutationPlaceCreateArgs = {
  input: PlaceCreateMutationInput;
};


export type MutationPlaceDeleteArgs = {
  input: PlaceDeleteMutationInput;
};


export type MutationPlaceLockArgs = {
  input: PlaceLockMutationInput;
};


export type MutationPlacePatchArgs = {
  input: PlacePatchMutationInput;
};


export type MutationPlaceReleaseLockArgs = {
  input: PlaceReleaseLockMutationInput;
};


export type MutationPlaceUpdateArgs = {
  input: PlaceUpdateMutationInput;
};


export type MutationProficiencyCreateArgs = {
  input: ProficiencyCreateMutationInput;
};


export type MutationProficiencyDeleteArgs = {
  input: ProficiencyDeleteMutationInput;
};


export type MutationProficiencyPatchArgs = {
  input: ProficiencyPatchMutationInput;
};


export type MutationProficiencyUpdateArgs = {
  input: ProficiencyUpdateMutationInput;
};


export type MutationRaceAddImageArgs = {
  input: RaceAddImageMutationInput;
};


export type MutationRaceCreateArgs = {
  input: RaceCreateMutationInput;
};


export type MutationRaceDeleteArgs = {
  input: RaceDeleteMutationInput;
};


export type MutationRaceLockArgs = {
  input: RaceLockMutationInput;
};


export type MutationRacePatchArgs = {
  input: RacePatchMutationInput;
};


export type MutationRaceReleaseLockArgs = {
  input: RaceReleaseLockMutationInput;
};


export type MutationRaceUpdateArgs = {
  input: RaceUpdateMutationInput;
};


export type MutationRefreshTokenArgs = {
  input: RefreshInput;
};


export type MutationRemoveEntityLogArgs = {
  input: RemoveEntityLogMutationInput;
};


export type MutationScriptCreateArgs = {
  input: ScriptCreateMutationInput;
};


export type MutationScriptDeleteArgs = {
  input: ScriptDeleteMutationInput;
};


export type MutationScriptPatchArgs = {
  input: ScriptPatchMutationInput;
};


export type MutationScriptUpdateArgs = {
  input: ScriptUpdateMutationInput;
};


export type MutationSkillCreateArgs = {
  input: SkillCreateMutationInput;
};


export type MutationSkillDeleteArgs = {
  input: SkillDeleteMutationInput;
};


export type MutationSkillPatchArgs = {
  input: SkillPatchMutationInput;
};


export type MutationSkillUpdateArgs = {
  input: SkillUpdateMutationInput;
};


export type MutationTokenAuthArgs = {
  input: ObtainJsonWebTokenInput;
};


export type MutationTraitCreateArgs = {
  input: TraitCreateMutationInput;
};


export type MutationTraitDeleteArgs = {
  input: TraitDeleteMutationInput;
};


export type MutationTraitPatchArgs = {
  input: TraitPatchMutationInput;
};


export type MutationTraitUpdateArgs = {
  input: TraitUpdateMutationInput;
};


export type MutationVerifyTokenArgs = {
  input: VerifyInput;
};

export type NpcNode = Node & {
  __typename?: 'NPCNode';
  associations: AssociationNodeConnection;
  created: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  featuresAndTraits?: Maybe<FeaturesAndTraitConnection>;
  /** The ID of the object */
  id: Scalars['ID'];
  imageIds: Array<Scalars['String']>;
  lockTime?: Maybe<Scalars['DateTime']>;
  lockUser?: Maybe<UserNode>;
  lockedBySelf?: Maybe<Scalars['Boolean']>;
  logs: GameLogNodeConnection;
  markdownNotes?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  proficiencies: ProficiencyNodeConnection;
  profiencies?: Maybe<ProficiencyConnection>;
  race?: Maybe<RaceNode>;
  size?: Maybe<CharacterNpcSizeChoices>;
  slug: Scalars['String'];
  thumbnailId?: Maybe<Scalars['String']>;
  updated: Scalars['DateTime'];
};


export type NpcNodeAssociationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  created?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  updated?: InputMaybe<Scalars['DateTime']>;
};


export type NpcNodeFeaturesAndTraitsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type NpcNodeLogsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type NpcNodeProficienciesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type NpcNodeProfienciesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type NpcNodeConnection = {
  __typename?: 'NPCNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<NpcNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `NPCNode` and its cursor. */
export type NpcNodeEdge = {
  __typename?: 'NPCNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<NpcNode>;
};

/** An object with an ID */
export type Node = {
  /** The ID of the object */
  id: Scalars['ID'];
};

export type NpcAddImageMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  imageId?: InputMaybe<Scalars['String']>;
};

export type NpcAddImageMutationPayload = {
  __typename?: 'NpcAddImageMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  npc?: Maybe<NpcNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type NpcCreateMutationInput = {
  associations?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  imageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Scalars['ID']>;
  thumbnailId?: InputMaybe<Scalars['String']>;
};

export type NpcCreateMutationPayload = {
  __typename?: 'NpcCreateMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  npc?: Maybe<NpcNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type NpcDeleteMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type NpcDeleteMutationPayload = {
  __typename?: 'NpcDeleteMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type NpcLockMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type NpcLockMutationPayload = {
  __typename?: 'NpcLockMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  npc?: Maybe<NpcNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type NpcPatchMutationInput = {
  associations?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  imageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Scalars['ID']>;
  thumbnailId?: InputMaybe<Scalars['String']>;
};

export type NpcPatchMutationPayload = {
  __typename?: 'NpcPatchMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  npc?: Maybe<NpcNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type NpcReleaseLockMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type NpcReleaseLockMutationPayload = {
  __typename?: 'NpcReleaseLockMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  npc?: Maybe<NpcNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type NpcUpdateMutationInput = {
  associations?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  imageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  race?: InputMaybe<Scalars['ID']>;
  thumbnailId?: InputMaybe<Scalars['String']>;
};

export type NpcUpdateMutationPayload = {
  __typename?: 'NpcUpdateMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  npc?: Maybe<NpcNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type ObtainJsonWebTokenInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

/** Obtain JSON Web Token mutation */
export type ObtainJsonWebTokenPayload = {
  __typename?: 'ObtainJSONWebTokenPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  token: Scalars['String'];
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type PlaceAddImageMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  imageId?: InputMaybe<Scalars['String']>;
};

export type PlaceAddImageMutationPayload = {
  __typename?: 'PlaceAddImageMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  place?: Maybe<PlaceNode>;
};

export type PlaceAssociationConnection = {
  __typename?: 'PlaceAssociationConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<PlaceAssociationEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `PlaceAssociation` and its cursor. */
export type PlaceAssociationEdge = {
  __typename?: 'PlaceAssociationEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<AssociationNode>;
  notes?: Maybe<Scalars['String']>;
};

export type PlaceAssociationInput = {
  association?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
};

export type PlaceCreateMutationInput = {
  associations?: InputMaybe<Array<InputMaybe<PlaceAssociationInput>>>;
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  exports?: InputMaybe<Array<InputMaybe<PlaceExportInput>>>;
  imageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['ID']>;
  placeType?: InputMaybe<Scalars['String']>;
  population?: InputMaybe<Scalars['Int']>;
  races?: InputMaybe<Array<InputMaybe<PlaceRaceInput>>>;
  thumbnailId?: InputMaybe<Scalars['String']>;
};

export type PlaceCreateMutationPayload = {
  __typename?: 'PlaceCreateMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  place?: Maybe<PlaceNode>;
};

export type PlaceDeleteMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type PlaceDeleteMutationPayload = {
  __typename?: 'PlaceDeleteMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type PlaceExportInput = {
  export?: InputMaybe<Scalars['String']>;
  significance?: InputMaybe<Scalars['Int']>;
};

export type PlaceLockMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type PlaceLockMutationPayload = {
  __typename?: 'PlaceLockMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  place?: Maybe<PlaceNode>;
};

export type PlaceNode = Node & {
  __typename?: 'PlaceNode';
  associations?: Maybe<PlaceAssociationConnection>;
  children: PlaceNodeConnection;
  commonRaces?: Maybe<RaceConnection>;
  created: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  exports?: Maybe<ExportConnection>;
  /** The ID of the object */
  id: Scalars['ID'];
  imageIds: Array<Scalars['String']>;
  lockTime?: Maybe<Scalars['DateTime']>;
  lockUser?: Maybe<UserNode>;
  lockedBySelf?: Maybe<Scalars['Boolean']>;
  logs: GameLogNodeConnection;
  markdownNotes?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  parent?: Maybe<PlaceNode>;
  placeType?: Maybe<PlacePlacePlaceTypeChoices>;
  placeTypeDisplay?: Maybe<Scalars['String']>;
  population: Scalars['Int'];
  thumbnailId?: Maybe<Scalars['String']>;
  updated: Scalars['DateTime'];
};


export type PlaceNodeAssociationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type PlaceNodeChildrenArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  created?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  placeType?: InputMaybe<Scalars['String']>;
  updated?: InputMaybe<Scalars['DateTime']>;
};


export type PlaceNodeCommonRacesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type PlaceNodeExportsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type PlaceNodeLogsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type PlaceNodeConnection = {
  __typename?: 'PlaceNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<PlaceNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `PlaceNode` and its cursor. */
export type PlaceNodeEdge = {
  __typename?: 'PlaceNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<PlaceNode>;
};

export type PlacePatchMutationInput = {
  associations?: InputMaybe<Array<InputMaybe<PlaceAssociationInput>>>;
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  exports?: InputMaybe<Array<InputMaybe<PlaceExportInput>>>;
  id?: InputMaybe<Scalars['ID']>;
  imageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['ID']>;
  placeType?: InputMaybe<Scalars['String']>;
  population?: InputMaybe<Scalars['Int']>;
  races?: InputMaybe<Array<InputMaybe<PlaceRaceInput>>>;
  thumbnailId?: InputMaybe<Scalars['String']>;
};

export type PlacePatchMutationPayload = {
  __typename?: 'PlacePatchMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  place?: Maybe<PlaceNode>;
};

/** An enumeration. */
export enum PlacePlacePlaceTypeChoices {
  /** District */
  District = 'DISTRICT',
  /** Location */
  Location = 'LOCATION',
  /** Moon */
  Moon = 'MOON',
  /** Planet */
  Planet = 'PLANET',
  /** Region */
  Region = 'REGION',
  /** Star */
  Star = 'STAR',
  /** Town */
  Town = 'TOWN'
}

export type PlaceRaceInput = {
  notes?: InputMaybe<Scalars['String']>;
  percent?: InputMaybe<Scalars['Float']>;
  race?: InputMaybe<RaceInput>;
};

export type PlaceReleaseLockMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type PlaceReleaseLockMutationPayload = {
  __typename?: 'PlaceReleaseLockMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  place?: Maybe<PlaceNode>;
};

export type PlaceUpdateMutationInput = {
  associations?: InputMaybe<Array<InputMaybe<PlaceAssociationInput>>>;
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  exports?: InputMaybe<Array<InputMaybe<PlaceExportInput>>>;
  id?: InputMaybe<Scalars['ID']>;
  imageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['ID']>;
  placeType?: InputMaybe<Scalars['String']>;
  population?: InputMaybe<Scalars['Int']>;
  races?: InputMaybe<Array<InputMaybe<PlaceRaceInput>>>;
  thumbnailId?: InputMaybe<Scalars['String']>;
};

export type PlaceUpdateMutationPayload = {
  __typename?: 'PlaceUpdateMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  place?: Maybe<PlaceNode>;
};

export type ProficiencyConnection = {
  __typename?: 'ProficiencyConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ProficiencyEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

export type ProficiencyCreateMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  proficiencyType?: InputMaybe<Scalars['String']>;
};

export type ProficiencyCreateMutationPayload = {
  __typename?: 'ProficiencyCreateMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  proficiency?: Maybe<ProficiencyNode>;
};

export type ProficiencyDeleteMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ProficiencyDeleteMutationPayload = {
  __typename?: 'ProficiencyDeleteMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

/** A Relay edge containing a `Proficiency` and its cursor. */
export type ProficiencyEdge = {
  __typename?: 'ProficiencyEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<ProficiencyNode>;
};

export type ProficiencyNode = Node & {
  __typename?: 'ProficiencyNode';
  description: Scalars['String'];
  /** The ID of the object */
  id: Scalars['ID'];
  name: Scalars['String'];
  npcs: NpcNodeConnection;
  proficiencyType: CharacterProficiencyProficiencyTypeChoices;
};


export type ProficiencyNodeNpcsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type ProficiencyNodeConnection = {
  __typename?: 'ProficiencyNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ProficiencyNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ProficiencyNode` and its cursor. */
export type ProficiencyNodeEdge = {
  __typename?: 'ProficiencyNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<ProficiencyNode>;
};

export type ProficiencyPatchMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  proficiencyType?: InputMaybe<Scalars['String']>;
};

export type ProficiencyPatchMutationPayload = {
  __typename?: 'ProficiencyPatchMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  proficiency?: Maybe<ProficiencyNode>;
};

export type ProficiencyUpdateMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  proficiencyType?: InputMaybe<Scalars['String']>;
};

export type ProficiencyUpdateMutationPayload = {
  __typename?: 'ProficiencyUpdateMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  proficiency?: Maybe<ProficiencyNode>;
};

export type Query = {
  __typename?: 'Query';
  abilityScoreIncrease?: Maybe<AbilityScoreIncreaseNode>;
  abilityScoreIncreases?: Maybe<AbilityScoreIncreaseNodeConnection>;
  artifact?: Maybe<ArtifactNode>;
  artifacts?: Maybe<ArtifactNodeConnection>;
  association?: Maybe<AssociationNode>;
  associations?: Maybe<AssociationNodeConnection>;
  export?: Maybe<ExportNode>;
  exports?: Maybe<ExportNodeConnection>;
  feature?: Maybe<FeatureNode>;
  features?: Maybe<FeatureNodeConnection>;
  gameLogs?: Maybe<GameLogNodeConnection>;
  item?: Maybe<ItemNode>;
  items?: Maybe<ItemNodeConnection>;
  language?: Maybe<LanguageNode>;
  languages?: Maybe<LanguageNodeConnection>;
  me?: Maybe<UserNode>;
  npc?: Maybe<NpcNode>;
  npcs?: Maybe<NpcNodeConnection>;
  place?: Maybe<PlaceNode>;
  places?: Maybe<PlaceNodeConnection>;
  proficiencies?: Maybe<ProficiencyNodeConnection>;
  proficiency?: Maybe<ProficiencyNode>;
  race?: Maybe<RaceNode>;
  races?: Maybe<RaceNodeConnection>;
  script?: Maybe<ScriptNode>;
  scripts?: Maybe<ScriptNodeConnection>;
  skill?: Maybe<SkillNode>;
  skills?: Maybe<SkillNodeConnection>;
  trait?: Maybe<TraitNode>;
  traits?: Maybe<TraitNodeConnection>;
  user?: Maybe<UserNode>;
  users?: Maybe<UserNodeConnection>;
};


export type QueryAbilityScoreIncreaseArgs = {
  id: Scalars['ID'];
};


export type QueryAbilityScoreIncreasesArgs = {
  abilityScore?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryArtifactArgs = {
  id: Scalars['ID'];
};


export type QueryArtifactsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  created?: InputMaybe<Scalars['DateTime']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryAssociationArgs = {
  id: Scalars['ID'];
};


export type QueryAssociationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  created?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  updated?: InputMaybe<Scalars['DateTime']>;
};


export type QueryExportArgs = {
  id: Scalars['ID'];
};


export type QueryExportsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryFeatureArgs = {
  id: Scalars['ID'];
};


export type QueryFeaturesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGameLogsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryItemArgs = {
  id: Scalars['ID'];
};


export type QueryItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  created?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  updated?: InputMaybe<Scalars['DateTime']>;
};


export type QueryLanguageArgs = {
  id: Scalars['ID'];
};


export type QueryLanguagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryNpcArgs = {
  id: Scalars['ID'];
};


export type QueryNpcsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryPlaceArgs = {
  id: Scalars['ID'];
};


export type QueryPlacesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  created?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  placeType?: InputMaybe<Scalars['String']>;
  updated?: InputMaybe<Scalars['DateTime']>;
};


export type QueryProficienciesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryProficiencyArgs = {
  id: Scalars['ID'];
};


export type QueryRaceArgs = {
  id: Scalars['ID'];
};


export type QueryRacesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryScriptArgs = {
  id: Scalars['ID'];
};


export type QueryScriptsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QuerySkillArgs = {
  id: Scalars['ID'];
};


export type QuerySkillsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryTraitArgs = {
  id: Scalars['ID'];
};


export type QueryTraitsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  isDM?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

/** An enumeration. */
export enum RaceAbilityScoreIncreaseAbilityScoreChoices {
  /** Charisma */
  Charisma = 'CHARISMA',
  /** Constitution */
  Constitution = 'CONSTITUTION',
  /** Dexterity */
  Dexterity = 'DEXTERITY',
  /** Intelligence */
  Intelligence = 'INTELLIGENCE',
  /** Strength */
  Strength = 'STRENGTH',
  /** Wisdom */
  Wisdom = 'WISDOM'
}

export type RaceAddImageMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  imageId?: InputMaybe<Scalars['String']>;
};

export type RaceAddImageMutationPayload = {
  __typename?: 'RaceAddImageMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  race?: Maybe<RaceNode>;
};

export type RaceConnection = {
  __typename?: 'RaceConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<RaceEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

export type RaceCreateMutationInput = {
  ageOfAdulthood?: InputMaybe<Scalars['Int']>;
  alignment?: InputMaybe<Scalars['String']>;
  baseRace?: InputMaybe<Scalars['String']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  imageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  languages?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lifeExpectancy?: InputMaybe<Scalars['Int']>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['String']>;
  speed?: InputMaybe<Scalars['Int']>;
  subraces?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  thumbnailId?: InputMaybe<Scalars['String']>;
  traits?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type RaceCreateMutationPayload = {
  __typename?: 'RaceCreateMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  race?: Maybe<RaceNode>;
};

export type RaceDeleteMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type RaceDeleteMutationPayload = {
  __typename?: 'RaceDeleteMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

/** A Relay edge containing a `Race` and its cursor. */
export type RaceEdge = {
  __typename?: 'RaceEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<RaceNode>;
  notes?: Maybe<Scalars['String']>;
  percent?: Maybe<Scalars['Float']>;
};

/**
 * This should eventually be constructed in the Race app and
 * imported from there
 */
export type RaceInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type RaceLockMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type RaceLockMutationPayload = {
  __typename?: 'RaceLockMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  race?: Maybe<RaceNode>;
};

export type RaceNode = Node & {
  __typename?: 'RaceNode';
  abilityScoreIncreases: AbilityScoreIncreaseNodeConnection;
  ageOfAdulthood?: Maybe<Scalars['Int']>;
  alignment?: Maybe<RaceRaceAlignmentChoices>;
  baseRace?: Maybe<RaceNode>;
  description?: Maybe<Scalars['String']>;
  /** The ID of the object */
  id: Scalars['ID'];
  imageIds: Array<Scalars['String']>;
  languages: LanguageNodeConnection;
  lifeExpectancy?: Maybe<Scalars['Int']>;
  lockTime?: Maybe<Scalars['DateTime']>;
  lockUser?: Maybe<UserNode>;
  lockedBySelf?: Maybe<Scalars['Boolean']>;
  logs: GameLogNodeConnection;
  markdownNotes?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  size?: Maybe<RaceRaceSizeChoices>;
  speed?: Maybe<Scalars['Int']>;
  subraces: RaceNodeConnection;
  thumbnailId?: Maybe<Scalars['String']>;
  traits: TraitNodeConnection;
};


export type RaceNodeAbilityScoreIncreasesArgs = {
  abilityScore?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type RaceNodeLanguagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type RaceNodeLogsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type RaceNodeSubracesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type RaceNodeTraitsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type RaceNodeConnection = {
  __typename?: 'RaceNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<RaceNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `RaceNode` and its cursor. */
export type RaceNodeEdge = {
  __typename?: 'RaceNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<RaceNode>;
};

export type RacePatchMutationInput = {
  ageOfAdulthood?: InputMaybe<Scalars['Int']>;
  alignment?: InputMaybe<Scalars['String']>;
  baseRace?: InputMaybe<Scalars['String']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  imageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  languages?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lifeExpectancy?: InputMaybe<Scalars['Int']>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['String']>;
  speed?: InputMaybe<Scalars['Int']>;
  subraces?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  thumbnailId?: InputMaybe<Scalars['String']>;
  traits?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type RacePatchMutationPayload = {
  __typename?: 'RacePatchMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  race?: Maybe<RaceNode>;
};

/** An enumeration. */
export enum RaceRaceAlignmentChoices {
  /** Chaotic Evil */
  Ce = 'CE',
  /** Chaotic Good */
  Cg = 'CG',
  /** Chaotic Neutral */
  Cn = 'CN',
  /** Lawful Evil */
  Le = 'LE',
  /** Lawful Good */
  Lg = 'LG',
  /** Lawful Neutral */
  Ln = 'LN',
  /** True Neutral */
  N = 'N',
  /** Neutral Evil */
  Ne = 'NE',
  /** Neutral Good */
  Ng = 'NG'
}

/** An enumeration. */
export enum RaceRaceSizeChoices {
  /** Gargantuan */
  Gargantuan = 'GARGANTUAN',
  /** Huge */
  Huge = 'HUGE',
  /** Large */
  Large = 'LARGE',
  /** Medium */
  Medium = 'MEDIUM',
  /** Small */
  Small = 'SMALL',
  /** Tiny */
  Tiny = 'TINY'
}

export type RaceReleaseLockMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type RaceReleaseLockMutationPayload = {
  __typename?: 'RaceReleaseLockMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  race?: Maybe<RaceNode>;
};

export type RaceUpdateMutationInput = {
  ageOfAdulthood?: InputMaybe<Scalars['Int']>;
  alignment?: InputMaybe<Scalars['String']>;
  baseRace?: InputMaybe<Scalars['String']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  imageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  languages?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lifeExpectancy?: InputMaybe<Scalars['Int']>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['String']>;
  speed?: InputMaybe<Scalars['Int']>;
  subraces?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  thumbnailId?: InputMaybe<Scalars['String']>;
  traits?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type RaceUpdateMutationPayload = {
  __typename?: 'RaceUpdateMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  race?: Maybe<RaceNode>;
};

export type RefreshInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
};

export type RefreshPayload = {
  __typename?: 'RefreshPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  token: Scalars['String'];
};

export type RemoveEntityLogMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  entityId?: InputMaybe<Scalars['ID']>;
  logId?: InputMaybe<Scalars['ID']>;
};

export type RemoveEntityLogMutationPayload = {
  __typename?: 'RemoveEntityLogMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type ScriptCreateMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ScriptCreateMutationPayload = {
  __typename?: 'ScriptCreateMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  script?: Maybe<ScriptNode>;
};

export type ScriptDeleteMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type ScriptDeleteMutationPayload = {
  __typename?: 'ScriptDeleteMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type ScriptNode = Node & {
  __typename?: 'ScriptNode';
  /** The ID of the object */
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type ScriptNodeConnection = {
  __typename?: 'ScriptNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ScriptNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ScriptNode` and its cursor. */
export type ScriptNodeEdge = {
  __typename?: 'ScriptNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<ScriptNode>;
};

export type ScriptPatchMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ScriptPatchMutationPayload = {
  __typename?: 'ScriptPatchMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  script?: Maybe<ScriptNode>;
};

export type ScriptUpdateMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type ScriptUpdateMutationPayload = {
  __typename?: 'ScriptUpdateMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  script?: Maybe<ScriptNode>;
};

export type SkillCreateMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  custom?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  relatedAbility?: InputMaybe<Scalars['String']>;
};

export type SkillCreateMutationPayload = {
  __typename?: 'SkillCreateMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  skill?: Maybe<SkillNode>;
};

export type SkillDeleteMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type SkillDeleteMutationPayload = {
  __typename?: 'SkillDeleteMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type SkillNode = Node & {
  __typename?: 'SkillNode';
  custom: Scalars['Boolean'];
  description: Scalars['String'];
  /** The ID of the object */
  id: Scalars['ID'];
  name: Scalars['String'];
  relatedAbility: CharacterSkillRelatedAbilityChoices;
};

export type SkillNodeConnection = {
  __typename?: 'SkillNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<SkillNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `SkillNode` and its cursor. */
export type SkillNodeEdge = {
  __typename?: 'SkillNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<SkillNode>;
};

export type SkillPatchMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  custom?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  relatedAbility?: InputMaybe<Scalars['String']>;
};

export type SkillPatchMutationPayload = {
  __typename?: 'SkillPatchMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  skill?: Maybe<SkillNode>;
};

export type SkillUpdateMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  custom?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  relatedAbility?: InputMaybe<Scalars['String']>;
};

export type SkillUpdateMutationPayload = {
  __typename?: 'SkillUpdateMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  skill?: Maybe<SkillNode>;
};

export type TraitCreateMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type TraitCreateMutationPayload = {
  __typename?: 'TraitCreateMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  trait?: Maybe<TraitNode>;
};

export type TraitDeleteMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type TraitDeleteMutationPayload = {
  __typename?: 'TraitDeleteMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type TraitNode = Node & {
  __typename?: 'TraitNode';
  description?: Maybe<Scalars['String']>;
  /** The ID of the object */
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type TraitNodeConnection = {
  __typename?: 'TraitNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<TraitNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `TraitNode` and its cursor. */
export type TraitNodeEdge = {
  __typename?: 'TraitNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<TraitNode>;
};

export type TraitPatchMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
};

export type TraitPatchMutationPayload = {
  __typename?: 'TraitPatchMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  trait?: Maybe<TraitNode>;
};

export type TraitUpdateMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
};

export type TraitUpdateMutationPayload = {
  __typename?: 'TraitUpdateMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
  trait?: Maybe<TraitNode>;
};

export type UserNode = Node & {
  __typename?: 'UserNode';
  email: Scalars['String'];
  firstName: Scalars['String'];
  /** The ID of the object */
  id: Scalars['ID'];
  isDM: Scalars['Boolean'];
  lastName: Scalars['String'];
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'];
};

export type UserNodeConnection = {
  __typename?: 'UserNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<UserNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `UserNode` and its cursor. */
export type UserNodeEdge = {
  __typename?: 'UserNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<UserNode>;
};

export type VerifyInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
};

export type VerifyPayload = {
  __typename?: 'VerifyPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  payload: Scalars['GenericScalar'];
};

export type WeaponInput = {
  attackBonus?: InputMaybe<Scalars['Int']>;
};

export type WeaponTraitsNode = Node & {
  __typename?: 'WeaponTraitsNode';
  attackBonus: Scalars['Int'];
  /** The ID of the object */
  id: Scalars['ID'];
};

export type ArtifactAddImageMutationVariables = Exact<{
  id: Scalars['ID'];
  imageId?: InputMaybe<Scalars['String']>;
}>;


export type ArtifactAddImageMutation = { __typename?: 'Mutation', artifactAddImage?: { __typename?: 'ArtifactAddImageMutationPayload', ok?: boolean | null, errors?: string | null, artifact?: { __typename?: 'ArtifactNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, items: { __typename?: 'ItemNodeConnection', edges: Array<{ __typename?: 'ItemNodeEdge', node?: { __typename?: 'ItemNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, armor?: { __typename?: 'ArmorTraitsNode', acBonus: number } | null, weapon?: { __typename?: 'WeaponTraitsNode', attackBonus: number } | null, equipment?: { __typename?: 'EquipmentTraitsNode', briefDescription: string } | null } | null } | null> } } | null } | null };

export type ArtifactByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ArtifactByIdQuery = { __typename?: 'Query', artifact?: { __typename?: 'ArtifactNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, items: { __typename?: 'ItemNodeConnection', edges: Array<{ __typename?: 'ItemNodeEdge', node?: { __typename?: 'ItemNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, armor?: { __typename?: 'ArmorTraitsNode', acBonus: number } | null, weapon?: { __typename?: 'WeaponTraitsNode', attackBonus: number } | null, equipment?: { __typename?: 'EquipmentTraitsNode', briefDescription: string } | null } | null } | null> } } | null };

export type ArtifactCreateMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  thumbnailId?: InputMaybe<Scalars['String']>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  imageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  items?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type ArtifactCreateMutation = { __typename?: 'Mutation', artifactCreate?: { __typename?: 'ArtifactCreateMutationPayload', ok?: boolean | null, errors?: string | null, artifact?: { __typename?: 'ArtifactNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, items: { __typename?: 'ItemNodeConnection', edges: Array<{ __typename?: 'ItemNodeEdge', node?: { __typename?: 'ItemNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, armor?: { __typename?: 'ArmorTraitsNode', acBonus: number } | null, weapon?: { __typename?: 'WeaponTraitsNode', attackBonus: number } | null, equipment?: { __typename?: 'EquipmentTraitsNode', briefDescription: string } | null } | null } | null> } } | null } | null };

export type ArtifactFieldsFragment = { __typename?: 'ArtifactNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, items: { __typename?: 'ItemNodeConnection', edges: Array<{ __typename?: 'ItemNodeEdge', node?: { __typename?: 'ItemNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, armor?: { __typename?: 'ArmorTraitsNode', acBonus: number } | null, weapon?: { __typename?: 'WeaponTraitsNode', attackBonus: number } | null, equipment?: { __typename?: 'EquipmentTraitsNode', briefDescription: string } | null } | null } | null> } };

export type ArtifactLockMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ArtifactLockMutation = { __typename?: 'Mutation', artifactLock?: { __typename?: 'ArtifactLockMutationPayload', ok?: boolean | null, errors?: string | null, artifact?: { __typename?: 'ArtifactNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, items: { __typename?: 'ItemNodeConnection', edges: Array<{ __typename?: 'ItemNodeEdge', node?: { __typename?: 'ItemNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, armor?: { __typename?: 'ArmorTraitsNode', acBonus: number } | null, weapon?: { __typename?: 'WeaponTraitsNode', attackBonus: number } | null, equipment?: { __typename?: 'EquipmentTraitsNode', briefDescription: string } | null } | null } | null> } } | null } | null };

export type ArtifactPatchMutationVariables = Exact<{
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  thumbnailId?: InputMaybe<Scalars['String']>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  items?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type ArtifactPatchMutation = { __typename?: 'Mutation', artifactPatch?: { __typename?: 'ArtifactPatchMutationPayload', ok?: boolean | null, errors?: string | null, artifact?: { __typename?: 'ArtifactNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, items: { __typename?: 'ItemNodeConnection', edges: Array<{ __typename?: 'ItemNodeEdge', node?: { __typename?: 'ItemNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, armor?: { __typename?: 'ArmorTraitsNode', acBonus: number } | null, weapon?: { __typename?: 'WeaponTraitsNode', attackBonus: number } | null, equipment?: { __typename?: 'EquipmentTraitsNode', briefDescription: string } | null } | null } | null> } } | null } | null };

export type ArtifactReleaseLockMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ArtifactReleaseLockMutation = { __typename?: 'Mutation', artifactReleaseLock?: { __typename?: 'ArtifactReleaseLockMutationPayload', ok?: boolean | null, errors?: string | null, artifact?: { __typename?: 'ArtifactNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, items: { __typename?: 'ItemNodeConnection', edges: Array<{ __typename?: 'ItemNodeEdge', node?: { __typename?: 'ItemNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, armor?: { __typename?: 'ArmorTraitsNode', acBonus: number } | null, weapon?: { __typename?: 'WeaponTraitsNode', attackBonus: number } | null, equipment?: { __typename?: 'EquipmentTraitsNode', briefDescription: string } | null } | null } | null> } } | null } | null };

export type ArtifactsQueryVariables = Exact<{ [key: string]: never; }>;


export type ArtifactsQuery = { __typename?: 'Query', artifacts?: { __typename?: 'ArtifactNodeConnection', edges: Array<{ __typename?: 'ArtifactNodeEdge', node?: { __typename?: 'ArtifactNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, items: { __typename?: 'ItemNodeConnection', edges: Array<{ __typename?: 'ItemNodeEdge', node?: { __typename?: 'ItemNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, armor?: { __typename?: 'ArmorTraitsNode', acBonus: number } | null, weapon?: { __typename?: 'WeaponTraitsNode', attackBonus: number } | null, equipment?: { __typename?: 'EquipmentTraitsNode', briefDescription: string } | null } | null } | null> } } | null } | null> } | null };

export type AssociationAddImageMutationVariables = Exact<{
  id: Scalars['ID'];
  imageId?: InputMaybe<Scalars['String']>;
}>;


export type AssociationAddImageMutation = { __typename?: 'Mutation', associationAddImage?: { __typename?: 'AssociationAddImageMutationPayload', ok?: boolean | null, errors?: string | null, association?: { __typename?: 'AssociationNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, npcs: { __typename?: 'NPCNodeConnection', edges: Array<{ __typename?: 'NPCNodeEdge', node?: { __typename?: 'NPCNode', id: string, name: string, description?: string | null } | null } | null> } } | null } | null };

export type AssociationByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AssociationByIdQuery = { __typename?: 'Query', association?: { __typename?: 'AssociationNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, npcs: { __typename?: 'NPCNodeConnection', edges: Array<{ __typename?: 'NPCNodeEdge', node?: { __typename?: 'NPCNode', id: string, name: string, description?: string | null } | null } | null> } } | null };

export type AssociationCreateMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  thumbnailId?: InputMaybe<Scalars['String']>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  imageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  npcs?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>;
}>;


export type AssociationCreateMutation = { __typename?: 'Mutation', associationCreate?: { __typename?: 'AssociationCreateMutationPayload', ok?: boolean | null, errors?: string | null, association?: { __typename?: 'AssociationNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, npcs: { __typename?: 'NPCNodeConnection', edges: Array<{ __typename?: 'NPCNodeEdge', node?: { __typename?: 'NPCNode', id: string, name: string, description?: string | null } | null } | null> } } | null } | null };

export type AssociationFieldsFragment = { __typename?: 'AssociationNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, npcs: { __typename?: 'NPCNodeConnection', edges: Array<{ __typename?: 'NPCNodeEdge', node?: { __typename?: 'NPCNode', id: string, name: string, description?: string | null } | null } | null> } };

export type AssociationLockMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AssociationLockMutation = { __typename?: 'Mutation', associationLock?: { __typename?: 'AssociationLockMutationPayload', ok?: boolean | null, errors?: string | null, association?: { __typename?: 'AssociationNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, npcs: { __typename?: 'NPCNodeConnection', edges: Array<{ __typename?: 'NPCNodeEdge', node?: { __typename?: 'NPCNode', id: string, name: string, description?: string | null } | null } | null> } } | null } | null };

export type AssociationPatchMutationVariables = Exact<{
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  thumbnailId?: InputMaybe<Scalars['String']>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  npcs?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>;
}>;


export type AssociationPatchMutation = { __typename?: 'Mutation', associationPatch?: { __typename?: 'AssociationPatchMutationPayload', ok?: boolean | null, errors?: string | null, association?: { __typename?: 'AssociationNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, npcs: { __typename?: 'NPCNodeConnection', edges: Array<{ __typename?: 'NPCNodeEdge', node?: { __typename?: 'NPCNode', id: string, name: string, description?: string | null } | null } | null> } } | null } | null };

export type AssociationReleaseLockMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AssociationReleaseLockMutation = { __typename?: 'Mutation', associationReleaseLock?: { __typename?: 'AssociationReleaseLockMutationPayload', ok?: boolean | null, errors?: string | null, association?: { __typename?: 'AssociationNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, npcs: { __typename?: 'NPCNodeConnection', edges: Array<{ __typename?: 'NPCNodeEdge', node?: { __typename?: 'NPCNode', id: string, name: string, description?: string | null } | null } | null> } } | null } | null };

export type AssociationNamesAndIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type AssociationNamesAndIdsQuery = { __typename?: 'Query', associations?: { __typename?: 'AssociationNodeConnection', edges: Array<{ __typename?: 'AssociationNodeEdge', node?: { __typename?: 'AssociationNode', id: string, name: string } | null } | null> } | null };

export type AssociationsQueryVariables = Exact<{ [key: string]: never; }>;


export type AssociationsQuery = { __typename?: 'Query', associations?: { __typename?: 'AssociationNodeConnection', edges: Array<{ __typename?: 'AssociationNodeEdge', node?: { __typename?: 'AssociationNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, npcs: { __typename?: 'NPCNodeConnection', edges: Array<{ __typename?: 'NPCNodeEdge', node?: { __typename?: 'NPCNode', id: string, name: string, description?: string | null } | null } | null> } } | null } | null> } | null };

export type AddEntityLogMutationVariables = Exact<{
  entityId: Scalars['ID'];
  logId?: InputMaybe<Scalars['ID']>;
  logUrl?: InputMaybe<Scalars['String']>;
}>;


export type AddEntityLogMutation = { __typename?: 'Mutation', addEntityLog?: { __typename?: 'AddEntityLogMutationPayload', ok?: boolean | null, errors?: string | null, log?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null };

export type RemoveEntityLogMutationVariables = Exact<{
  entityId: Scalars['ID'];
  logId: Scalars['ID'];
}>;


export type RemoveEntityLogMutation = { __typename?: 'Mutation', removeEntityLog?: { __typename?: 'RemoveEntityLogMutationPayload', ok?: boolean | null, errors?: string | null } | null };

export type ItemAddImageMutationVariables = Exact<{
  id: Scalars['ID'];
  imageId?: InputMaybe<Scalars['String']>;
}>;


export type ItemAddImageMutation = { __typename?: 'Mutation', itemAddImage?: { __typename?: 'ItemAddImageMutationPayload', ok?: boolean | null, errors?: string | null, item?: { __typename?: 'ItemNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, armor?: { __typename?: 'ArmorTraitsNode', acBonus: number } | null, weapon?: { __typename?: 'WeaponTraitsNode', attackBonus: number } | null, equipment?: { __typename?: 'EquipmentTraitsNode', briefDescription: string } | null } | null } | null };

export type ItemByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ItemByIdQuery = { __typename?: 'Query', item?: { __typename?: 'ItemNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, armor?: { __typename?: 'ArmorTraitsNode', acBonus: number } | null, weapon?: { __typename?: 'WeaponTraitsNode', attackBonus: number } | null, equipment?: { __typename?: 'EquipmentTraitsNode', briefDescription: string } | null } | null };

export type ItemCreateMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  thumbnailId?: InputMaybe<Scalars['String']>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  imageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  armor?: InputMaybe<ArmorInput>;
  equipment?: InputMaybe<EquipmentInput>;
  weapon?: InputMaybe<WeaponInput>;
}>;


export type ItemCreateMutation = { __typename?: 'Mutation', itemCreate?: { __typename?: 'ItemCreateMutationPayload', ok?: boolean | null, errors?: string | null, item?: { __typename?: 'ItemNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, armor?: { __typename?: 'ArmorTraitsNode', acBonus: number } | null, weapon?: { __typename?: 'WeaponTraitsNode', attackBonus: number } | null, equipment?: { __typename?: 'EquipmentTraitsNode', briefDescription: string } | null } | null } | null };

export type ItemFieldsFragment = { __typename?: 'ItemNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, armor?: { __typename?: 'ArmorTraitsNode', acBonus: number } | null, weapon?: { __typename?: 'WeaponTraitsNode', attackBonus: number } | null, equipment?: { __typename?: 'EquipmentTraitsNode', briefDescription: string } | null };

export type ItemLockMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ItemLockMutation = { __typename?: 'Mutation', itemLock?: { __typename?: 'ItemLockMutationPayload', ok?: boolean | null, errors?: string | null, item?: { __typename?: 'ItemNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, armor?: { __typename?: 'ArmorTraitsNode', acBonus: number } | null, weapon?: { __typename?: 'WeaponTraitsNode', attackBonus: number } | null, equipment?: { __typename?: 'EquipmentTraitsNode', briefDescription: string } | null } | null } | null };

export type ItemPatchMutationVariables = Exact<{
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  thumbnailId?: InputMaybe<Scalars['String']>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  armor?: InputMaybe<ArmorInput>;
  equipment?: InputMaybe<EquipmentInput>;
  weapon?: InputMaybe<WeaponInput>;
}>;


export type ItemPatchMutation = { __typename?: 'Mutation', itemPatch?: { __typename?: 'ItemPatchMutationPayload', ok?: boolean | null, errors?: string | null, item?: { __typename?: 'ItemNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, armor?: { __typename?: 'ArmorTraitsNode', acBonus: number } | null, weapon?: { __typename?: 'WeaponTraitsNode', attackBonus: number } | null, equipment?: { __typename?: 'EquipmentTraitsNode', briefDescription: string } | null } | null } | null };

export type ItemReleaseLockMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ItemReleaseLockMutation = { __typename?: 'Mutation', itemReleaseLock?: { __typename?: 'ItemReleaseLockMutationPayload', ok?: boolean | null, errors?: string | null, item?: { __typename?: 'ItemNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, armor?: { __typename?: 'ArmorTraitsNode', acBonus: number } | null, weapon?: { __typename?: 'WeaponTraitsNode', attackBonus: number } | null, equipment?: { __typename?: 'EquipmentTraitsNode', briefDescription: string } | null } | null } | null };

export type ItemNamesAndIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemNamesAndIdsQuery = { __typename?: 'Query', items?: { __typename?: 'ItemNodeConnection', edges: Array<{ __typename?: 'ItemNodeEdge', node?: { __typename?: 'ItemNode', id: string, name: string } | null } | null> } | null };

export type ItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemsQuery = { __typename?: 'Query', items?: { __typename?: 'ItemNodeConnection', edges: Array<{ __typename?: 'ItemNodeEdge', node?: { __typename?: 'ItemNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, armor?: { __typename?: 'ArmorTraitsNode', acBonus: number } | null, weapon?: { __typename?: 'WeaponTraitsNode', attackBonus: number } | null, equipment?: { __typename?: 'EquipmentTraitsNode', briefDescription: string } | null } | null } | null> } | null };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', tokenAuth?: { __typename?: 'ObtainJSONWebTokenPayload', token: string, payload: any } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'UserNode', username: string, firstName: string, lastName: string, email: string, isDM: boolean, id: string } | null };

export type NpcAddImageMutationVariables = Exact<{
  id: Scalars['ID'];
  imageId?: InputMaybe<Scalars['String']>;
}>;


export type NpcAddImageMutation = { __typename?: 'Mutation', npcAddImage?: { __typename?: 'NpcAddImageMutationPayload', ok?: boolean | null, errors?: string | null, npc?: { __typename?: 'NPCNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, size?: CharacterNpcSizeChoices | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, race?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null } | null, associations: { __typename?: 'AssociationNodeConnection', edges: Array<{ __typename?: 'AssociationNodeEdge', node?: { __typename?: 'AssociationNode', id: string, name: string, description?: string | null } | null } | null> }, featuresAndTraits?: { __typename?: 'FeaturesAndTraitConnection', edges: Array<{ __typename?: 'FeaturesAndTraitEdge', node?: { __typename?: 'FeatureNode', id: string, name: string, description: string } | null } | null> } | null, proficiencies: { __typename?: 'ProficiencyNodeConnection', edges: Array<{ __typename?: 'ProficiencyNodeEdge', node?: { __typename?: 'ProficiencyNode', id: string, name: string, description: string, proficiencyType: CharacterProficiencyProficiencyTypeChoices } | null } | null> } } | null } | null };

export type NpcByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NpcByIdQuery = { __typename?: 'Query', npc?: { __typename?: 'NPCNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, size?: CharacterNpcSizeChoices | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, race?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null } | null, associations: { __typename?: 'AssociationNodeConnection', edges: Array<{ __typename?: 'AssociationNodeEdge', node?: { __typename?: 'AssociationNode', id: string, name: string, description?: string | null } | null } | null> }, featuresAndTraits?: { __typename?: 'FeaturesAndTraitConnection', edges: Array<{ __typename?: 'FeaturesAndTraitEdge', node?: { __typename?: 'FeatureNode', id: string, name: string, description: string } | null } | null> } | null, proficiencies: { __typename?: 'ProficiencyNodeConnection', edges: Array<{ __typename?: 'ProficiencyNodeEdge', node?: { __typename?: 'ProficiencyNode', id: string, name: string, description: string, proficiencyType: CharacterProficiencyProficiencyTypeChoices } | null } | null> } } | null };

export type NpcCreateMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  thumbnailId?: InputMaybe<Scalars['String']>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  imageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  associations?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>;
  race?: InputMaybe<Scalars['ID']>;
}>;


export type NpcCreateMutation = { __typename?: 'Mutation', npcCreate?: { __typename?: 'NpcCreateMutationPayload', ok?: boolean | null, errors?: string | null, npc?: { __typename?: 'NPCNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, size?: CharacterNpcSizeChoices | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, race?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null } | null, associations: { __typename?: 'AssociationNodeConnection', edges: Array<{ __typename?: 'AssociationNodeEdge', node?: { __typename?: 'AssociationNode', id: string, name: string, description?: string | null } | null } | null> }, featuresAndTraits?: { __typename?: 'FeaturesAndTraitConnection', edges: Array<{ __typename?: 'FeaturesAndTraitEdge', node?: { __typename?: 'FeatureNode', id: string, name: string, description: string } | null } | null> } | null, proficiencies: { __typename?: 'ProficiencyNodeConnection', edges: Array<{ __typename?: 'ProficiencyNodeEdge', node?: { __typename?: 'ProficiencyNode', id: string, name: string, description: string, proficiencyType: CharacterProficiencyProficiencyTypeChoices } | null } | null> } } | null } | null };

export type NpcFieldsFragment = { __typename?: 'NPCNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, size?: CharacterNpcSizeChoices | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, race?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null } | null, associations: { __typename?: 'AssociationNodeConnection', edges: Array<{ __typename?: 'AssociationNodeEdge', node?: { __typename?: 'AssociationNode', id: string, name: string, description?: string | null } | null } | null> }, featuresAndTraits?: { __typename?: 'FeaturesAndTraitConnection', edges: Array<{ __typename?: 'FeaturesAndTraitEdge', node?: { __typename?: 'FeatureNode', id: string, name: string, description: string } | null } | null> } | null, proficiencies: { __typename?: 'ProficiencyNodeConnection', edges: Array<{ __typename?: 'ProficiencyNodeEdge', node?: { __typename?: 'ProficiencyNode', id: string, name: string, description: string, proficiencyType: CharacterProficiencyProficiencyTypeChoices } | null } | null> } };

export type NpcLockMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NpcLockMutation = { __typename?: 'Mutation', npcLock?: { __typename?: 'NpcLockMutationPayload', ok?: boolean | null, errors?: string | null, npc?: { __typename?: 'NPCNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, size?: CharacterNpcSizeChoices | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, race?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null } | null, associations: { __typename?: 'AssociationNodeConnection', edges: Array<{ __typename?: 'AssociationNodeEdge', node?: { __typename?: 'AssociationNode', id: string, name: string, description?: string | null } | null } | null> }, featuresAndTraits?: { __typename?: 'FeaturesAndTraitConnection', edges: Array<{ __typename?: 'FeaturesAndTraitEdge', node?: { __typename?: 'FeatureNode', id: string, name: string, description: string } | null } | null> } | null, proficiencies: { __typename?: 'ProficiencyNodeConnection', edges: Array<{ __typename?: 'ProficiencyNodeEdge', node?: { __typename?: 'ProficiencyNode', id: string, name: string, description: string, proficiencyType: CharacterProficiencyProficiencyTypeChoices } | null } | null> } } | null } | null };

export type NpcPatchMutationVariables = Exact<{
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  thumbnailId?: InputMaybe<Scalars['String']>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  associations?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>;
  race?: InputMaybe<Scalars['ID']>;
}>;


export type NpcPatchMutation = { __typename?: 'Mutation', npcPatch?: { __typename?: 'NpcPatchMutationPayload', ok?: boolean | null, errors?: string | null, npc?: { __typename?: 'NPCNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, size?: CharacterNpcSizeChoices | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, race?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null } | null, associations: { __typename?: 'AssociationNodeConnection', edges: Array<{ __typename?: 'AssociationNodeEdge', node?: { __typename?: 'AssociationNode', id: string, name: string, description?: string | null } | null } | null> }, featuresAndTraits?: { __typename?: 'FeaturesAndTraitConnection', edges: Array<{ __typename?: 'FeaturesAndTraitEdge', node?: { __typename?: 'FeatureNode', id: string, name: string, description: string } | null } | null> } | null, proficiencies: { __typename?: 'ProficiencyNodeConnection', edges: Array<{ __typename?: 'ProficiencyNodeEdge', node?: { __typename?: 'ProficiencyNode', id: string, name: string, description: string, proficiencyType: CharacterProficiencyProficiencyTypeChoices } | null } | null> } } | null } | null };

export type NpcReleaseLockMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NpcReleaseLockMutation = { __typename?: 'Mutation', npcReleaseLock?: { __typename?: 'NpcReleaseLockMutationPayload', ok?: boolean | null, errors?: string | null, npc?: { __typename?: 'NPCNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, size?: CharacterNpcSizeChoices | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, race?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null } | null, associations: { __typename?: 'AssociationNodeConnection', edges: Array<{ __typename?: 'AssociationNodeEdge', node?: { __typename?: 'AssociationNode', id: string, name: string, description?: string | null } | null } | null> }, featuresAndTraits?: { __typename?: 'FeaturesAndTraitConnection', edges: Array<{ __typename?: 'FeaturesAndTraitEdge', node?: { __typename?: 'FeatureNode', id: string, name: string, description: string } | null } | null> } | null, proficiencies: { __typename?: 'ProficiencyNodeConnection', edges: Array<{ __typename?: 'ProficiencyNodeEdge', node?: { __typename?: 'ProficiencyNode', id: string, name: string, description: string, proficiencyType: CharacterProficiencyProficiencyTypeChoices } | null } | null> } } | null } | null };

export type NpcNamesAndIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type NpcNamesAndIdsQuery = { __typename?: 'Query', npcs?: { __typename?: 'NPCNodeConnection', edges: Array<{ __typename?: 'NPCNodeEdge', node?: { __typename?: 'NPCNode', id: string, name: string } | null } | null> } | null };

export type NpcsQueryVariables = Exact<{ [key: string]: never; }>;


export type NpcsQuery = { __typename?: 'Query', npcs?: { __typename?: 'NPCNodeConnection', edges: Array<{ __typename?: 'NPCNodeEdge', node?: { __typename?: 'NPCNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, size?: CharacterNpcSizeChoices | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, race?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null } | null, associations: { __typename?: 'AssociationNodeConnection', edges: Array<{ __typename?: 'AssociationNodeEdge', node?: { __typename?: 'AssociationNode', id: string, name: string, description?: string | null } | null } | null> }, featuresAndTraits?: { __typename?: 'FeaturesAndTraitConnection', edges: Array<{ __typename?: 'FeaturesAndTraitEdge', node?: { __typename?: 'FeatureNode', id: string, name: string, description: string } | null } | null> } | null, proficiencies: { __typename?: 'ProficiencyNodeConnection', edges: Array<{ __typename?: 'ProficiencyNodeEdge', node?: { __typename?: 'ProficiencyNode', id: string, name: string, description: string, proficiencyType: CharacterProficiencyProficiencyTypeChoices } | null } | null> } } | null } | null> } | null };

export type PlaceAddImageMutationVariables = Exact<{
  id: Scalars['ID'];
  imageId?: InputMaybe<Scalars['String']>;
}>;


export type PlaceAddImageMutation = { __typename?: 'Mutation', placeAddImage?: { __typename?: 'PlaceAddImageMutationPayload', ok?: boolean | null, errors?: string | null, place?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, parent?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number, parent?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null } | null } | null } | null } | null } | null } | null, children: { __typename?: 'PlaceNodeConnection', edges: Array<{ __typename?: 'PlaceNodeEdge', node?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number } | null } | null> } } | null } | null };

export type PlaceByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PlaceByIdQuery = { __typename?: 'Query', place?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, parent?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number, parent?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null } | null } | null } | null } | null } | null } | null, children: { __typename?: 'PlaceNodeConnection', edges: Array<{ __typename?: 'PlaceNodeEdge', node?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number } | null } | null> } } | null };

export type PlaceCreateMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  thumbnailId?: InputMaybe<Scalars['String']>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  imageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  placeType?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['ID']>;
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>;
}>;


export type PlaceCreateMutation = { __typename?: 'Mutation', placeCreate?: { __typename?: 'PlaceCreateMutationPayload', ok?: boolean | null, errors?: string | null, place?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, parent?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number, parent?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null } | null } | null } | null } | null } | null } | null, children: { __typename?: 'PlaceNodeConnection', edges: Array<{ __typename?: 'PlaceNodeEdge', node?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number } | null } | null> } } | null } | null };

export type PlaceFieldsFragment = { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, parent?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number, parent?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null } | null } | null } | null } | null } | null } | null, children: { __typename?: 'PlaceNodeConnection', edges: Array<{ __typename?: 'PlaceNodeEdge', node?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number } | null } | null> } };

export type PlaceListFieldsFragment = { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, placeTypeDisplay?: string | null };

export type PlaceLockMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PlaceLockMutation = { __typename?: 'Mutation', placeLock?: { __typename?: 'PlaceLockMutationPayload', ok?: boolean | null, errors?: string | null, place?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, parent?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number, parent?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null } | null } | null } | null } | null } | null } | null, children: { __typename?: 'PlaceNodeConnection', edges: Array<{ __typename?: 'PlaceNodeEdge', node?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number } | null } | null> } } | null } | null };

export type PlacePatchMutationVariables = Exact<{
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  thumbnailId?: InputMaybe<Scalars['String']>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  placeType?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['ID']>;
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>;
}>;


export type PlacePatchMutation = { __typename?: 'Mutation', placePatch?: { __typename?: 'PlacePatchMutationPayload', ok?: boolean | null, errors?: string | null, place?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, parent?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number, parent?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null } | null } | null } | null } | null } | null } | null, children: { __typename?: 'PlaceNodeConnection', edges: Array<{ __typename?: 'PlaceNodeEdge', node?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number } | null } | null> } } | null } | null };

export type PlaceReleaseLockMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PlaceReleaseLockMutation = { __typename?: 'Mutation', placeReleaseLock?: { __typename?: 'PlaceReleaseLockMutationPayload', ok?: boolean | null, errors?: string | null, place?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, parent?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number, parent?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, parent?: { __typename?: 'PlaceNode', id: string, name: string, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null } | null } | null } | null } | null } | null } | null, children: { __typename?: 'PlaceNodeConnection', edges: Array<{ __typename?: 'PlaceNodeEdge', node?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, created: any, updated: any, placeType?: PlacePlacePlaceTypeChoices | null, placeTypeDisplay?: string | null, population: number } | null } | null> } } | null } | null };

export type PlacesForSearchQueryVariables = Exact<{ [key: string]: never; }>;


export type PlacesForSearchQuery = { __typename?: 'Query', places?: { __typename?: 'PlaceNodeConnection', edges: Array<{ __typename?: 'PlaceNodeEdge', node?: { __typename?: 'PlaceNode', id: string, name: string, placeTypeDisplay?: string | null } | null } | null> } | null };

export type PlacesQueryVariables = Exact<{ [key: string]: never; }>;


export type PlacesQuery = { __typename?: 'Query', places?: { __typename?: 'PlaceNodeConnection', edges: Array<{ __typename?: 'PlaceNodeEdge', node?: { __typename?: 'PlaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, placeTypeDisplay?: string | null } | null } | null> } | null };

export type RaceAddImageMutationVariables = Exact<{
  id: Scalars['ID'];
  imageId?: InputMaybe<Scalars['String']>;
}>;


export type RaceAddImageMutation = { __typename?: 'Mutation', raceAddImage?: { __typename?: 'RaceAddImageMutationPayload', ok?: boolean | null, errors?: string | null, race?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, baseRace?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null } | null, subraces: { __typename?: 'RaceNodeConnection', edges: Array<{ __typename?: 'RaceNodeEdge', node?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null } | null } | null> }, languages: { __typename?: 'LanguageNodeConnection', edges: Array<{ __typename?: 'LanguageNodeEdge', node?: { __typename?: 'LanguageNode', id: string, name: string, description: string, script?: { __typename?: 'ScriptNode', name: string } | null } | null } | null> }, traits: { __typename?: 'TraitNodeConnection', edges: Array<{ __typename?: 'TraitNodeEdge', node?: { __typename?: 'TraitNode', id: string, name: string, description?: string | null } | null } | null> } } | null } | null };

export type RaceByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RaceByIdQuery = { __typename?: 'Query', race?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, baseRace?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null } | null, subraces: { __typename?: 'RaceNodeConnection', edges: Array<{ __typename?: 'RaceNodeEdge', node?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null } | null } | null> }, languages: { __typename?: 'LanguageNodeConnection', edges: Array<{ __typename?: 'LanguageNodeEdge', node?: { __typename?: 'LanguageNode', id: string, name: string, description: string, script?: { __typename?: 'ScriptNode', name: string } | null } | null } | null> }, traits: { __typename?: 'TraitNodeConnection', edges: Array<{ __typename?: 'TraitNodeEdge', node?: { __typename?: 'TraitNode', id: string, name: string, description?: string | null } | null } | null> } } | null };

export type RaceCreateMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  thumbnailId?: InputMaybe<Scalars['String']>;
  markdownNotes?: InputMaybe<Scalars['String']>;
  imageIds?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type RaceCreateMutation = { __typename?: 'Mutation', raceCreate?: { __typename?: 'RaceCreateMutationPayload', ok?: boolean | null, errors?: string | null, race?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, baseRace?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null } | null, subraces: { __typename?: 'RaceNodeConnection', edges: Array<{ __typename?: 'RaceNodeEdge', node?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null } | null } | null> }, languages: { __typename?: 'LanguageNodeConnection', edges: Array<{ __typename?: 'LanguageNodeEdge', node?: { __typename?: 'LanguageNode', id: string, name: string, description: string, script?: { __typename?: 'ScriptNode', name: string } | null } | null } | null> }, traits: { __typename?: 'TraitNodeConnection', edges: Array<{ __typename?: 'TraitNodeEdge', node?: { __typename?: 'TraitNode', id: string, name: string, description?: string | null } | null } | null> } } | null } | null };

export type RaceFieldsFragment = { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, baseRace?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null } | null, subraces: { __typename?: 'RaceNodeConnection', edges: Array<{ __typename?: 'RaceNodeEdge', node?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null } | null } | null> }, languages: { __typename?: 'LanguageNodeConnection', edges: Array<{ __typename?: 'LanguageNodeEdge', node?: { __typename?: 'LanguageNode', id: string, name: string, description: string, script?: { __typename?: 'ScriptNode', name: string } | null } | null } | null> }, traits: { __typename?: 'TraitNodeConnection', edges: Array<{ __typename?: 'TraitNodeEdge', node?: { __typename?: 'TraitNode', id: string, name: string, description?: string | null } | null } | null> } };

export type RaceLockMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RaceLockMutation = { __typename?: 'Mutation', raceLock?: { __typename?: 'RaceLockMutationPayload', ok?: boolean | null, errors?: string | null, race?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, baseRace?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null } | null, subraces: { __typename?: 'RaceNodeConnection', edges: Array<{ __typename?: 'RaceNodeEdge', node?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null } | null } | null> }, languages: { __typename?: 'LanguageNodeConnection', edges: Array<{ __typename?: 'LanguageNodeEdge', node?: { __typename?: 'LanguageNode', id: string, name: string, description: string, script?: { __typename?: 'ScriptNode', name: string } | null } | null } | null> }, traits: { __typename?: 'TraitNodeConnection', edges: Array<{ __typename?: 'TraitNodeEdge', node?: { __typename?: 'TraitNode', id: string, name: string, description?: string | null } | null } | null> } } | null } | null };

export type RacePatchMutationVariables = Exact<{
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  thumbnailId?: InputMaybe<Scalars['String']>;
  markdownNotes?: InputMaybe<Scalars['String']>;
}>;


export type RacePatchMutation = { __typename?: 'Mutation', racePatch?: { __typename?: 'RacePatchMutationPayload', ok?: boolean | null, errors?: string | null, race?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, baseRace?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null } | null, subraces: { __typename?: 'RaceNodeConnection', edges: Array<{ __typename?: 'RaceNodeEdge', node?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null } | null } | null> }, languages: { __typename?: 'LanguageNodeConnection', edges: Array<{ __typename?: 'LanguageNodeEdge', node?: { __typename?: 'LanguageNode', id: string, name: string, description: string, script?: { __typename?: 'ScriptNode', name: string } | null } | null } | null> }, traits: { __typename?: 'TraitNodeConnection', edges: Array<{ __typename?: 'TraitNodeEdge', node?: { __typename?: 'TraitNode', id: string, name: string, description?: string | null } | null } | null> } } | null } | null };

export type RaceReleaseLockMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RaceReleaseLockMutation = { __typename?: 'Mutation', raceReleaseLock?: { __typename?: 'RaceReleaseLockMutationPayload', ok?: boolean | null, errors?: string | null, race?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, baseRace?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null } | null, subraces: { __typename?: 'RaceNodeConnection', edges: Array<{ __typename?: 'RaceNodeEdge', node?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null } | null } | null> }, languages: { __typename?: 'LanguageNodeConnection', edges: Array<{ __typename?: 'LanguageNodeEdge', node?: { __typename?: 'LanguageNode', id: string, name: string, description: string, script?: { __typename?: 'ScriptNode', name: string } | null } | null } | null> }, traits: { __typename?: 'TraitNodeConnection', edges: Array<{ __typename?: 'TraitNodeEdge', node?: { __typename?: 'TraitNode', id: string, name: string, description?: string | null } | null } | null> } } | null } | null };

export type RaceNamesAndIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type RaceNamesAndIdsQuery = { __typename?: 'Query', races?: { __typename?: 'RaceNodeConnection', edges: Array<{ __typename?: 'RaceNodeEdge', node?: { __typename?: 'RaceNode', id: string, name: string } | null } | null> } | null };

export type RacesQueryVariables = Exact<{ [key: string]: never; }>;


export type RacesQuery = { __typename?: 'Query', races?: { __typename?: 'RaceNodeConnection', edges: Array<{ __typename?: 'RaceNodeEdge', node?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, markdownNotes?: string | null, lockTime?: any | null, lockedBySelf?: boolean | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null, lockUser?: { __typename?: 'UserNode', id: string, username: string } | null, logs: { __typename?: 'GameLogNodeConnection', edges: Array<{ __typename?: 'GameLogNodeEdge', node?: { __typename?: 'GameLogNode', id: string, url: string, name?: string | null } | null } | null> }, baseRace?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null } | null, subraces: { __typename?: 'RaceNodeConnection', edges: Array<{ __typename?: 'RaceNodeEdge', node?: { __typename?: 'RaceNode', id: string, name: string, description?: string | null, imageIds: Array<string>, thumbnailId?: string | null, ageOfAdulthood?: number | null, lifeExpectancy?: number | null, alignment?: RaceRaceAlignmentChoices | null, size?: RaceRaceSizeChoices | null, speed?: number | null } | null } | null> }, languages: { __typename?: 'LanguageNodeConnection', edges: Array<{ __typename?: 'LanguageNodeEdge', node?: { __typename?: 'LanguageNode', id: string, name: string, description: string, script?: { __typename?: 'ScriptNode', name: string } | null } | null } | null> }, traits: { __typename?: 'TraitNodeConnection', edges: Array<{ __typename?: 'TraitNodeEdge', node?: { __typename?: 'TraitNode', id: string, name: string, description?: string | null } | null } | null> } } | null } | null> } | null };

export const ArtifactFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArtifactFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ArtifactNode"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageIds"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailId"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"updated"}},{"kind":"Field","name":{"kind":"Name","value":"markdownNotes"}},{"kind":"Field","name":{"kind":"Name","value":"lockUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lockTime"}},{"kind":"Field","name":{"kind":"Name","value":"lockedBySelf"}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageIds"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailId"}},{"kind":"Field","name":{"kind":"Name","value":"armor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acBonus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"weapon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attackBonus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"equipment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"briefDescription"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ArtifactFieldsFragment, unknown>;
export const AssociationFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AssociationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AssociationNode"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageIds"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailId"}},{"kind":"Field","name":{"kind":"Name","value":"markdownNotes"}},{"kind":"Field","name":{"kind":"Name","value":"lockUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lockTime"}},{"kind":"Field","name":{"kind":"Name","value":"lockedBySelf"}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"npcs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AssociationFieldsFragment, unknown>;
export const ItemFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ItemFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ItemNode"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageIds"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailId"}},{"kind":"Field","name":{"kind":"Name","value":"markdownNotes"}},{"kind":"Field","name":{"kind":"Name","value":"lockUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lockTime"}},{"kind":"Field","name":{"kind":"Name","value":"lockedBySelf"}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"armor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acBonus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"weapon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attackBonus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"equipment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"briefDescription"}}]}}]}}]} as unknown as DocumentNode<ItemFieldsFragment, unknown>;
export const NpcFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NpcFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NPCNode"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageIds"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailId"}},{"kind":"Field","name":{"kind":"Name","value":"markdownNotes"}},{"kind":"Field","name":{"kind":"Name","value":"lockUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lockTime"}},{"kind":"Field","name":{"kind":"Name","value":"lockedBySelf"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageIds"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailId"}},{"kind":"Field","name":{"kind":"Name","value":"ageOfAdulthood"}},{"kind":"Field","name":{"kind":"Name","value":"lifeExpectancy"}},{"kind":"Field","name":{"kind":"Name","value":"alignment"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"speed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"associations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuresAndTraits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"proficiencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"proficiencyType"}}]}}]}}]}}]}}]} as unknown as DocumentNode<NpcFieldsFragment, unknown>;
export const PlaceFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlaceNode"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageIds"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailId"}},{"kind":"Field","name":{"kind":"Name","value":"markdownNotes"}},{"kind":"Field","name":{"kind":"Name","value":"lockUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lockTime"}},{"kind":"Field","name":{"kind":"Name","value":"lockedBySelf"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"updated"}},{"kind":"Field","name":{"kind":"Name","value":"placeType"}},{"kind":"Field","name":{"kind":"Name","value":"placeTypeDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"population"}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageIds"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailId"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"updated"}},{"kind":"Field","name":{"kind":"Name","value":"placeType"}},{"kind":"Field","name":{"kind":"Name","value":"placeTypeDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"population"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageIds"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailId"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"updated"}},{"kind":"Field","name":{"kind":"Name","value":"placeType"}},{"kind":"Field","name":{"kind":"Name","value":"placeTypeDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"population"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"placeType"}},{"kind":"Field","name":{"kind":"Name","value":"placeTypeDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"placeType"}},{"kind":"Field","name":{"kind":"Name","value":"placeTypeDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"placeType"}},{"kind":"Field","name":{"kind":"Name","value":"placeTypeDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"placeType"}},{"kind":"Field","name":{"kind":"Name","value":"placeTypeDisplay"}}]}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageIds"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailId"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"updated"}},{"kind":"Field","name":{"kind":"Name","value":"placeType"}},{"kind":"Field","name":{"kind":"Name","value":"placeTypeDisplay"}},{"kind":"Field","name":{"kind":"Name","value":"population"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PlaceFieldsFragment, unknown>;
export const PlaceListFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaceListFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlaceNode"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageIds"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailId"}},{"kind":"Field","name":{"kind":"Name","value":"placeTypeDisplay"}}]}}]} as unknown as DocumentNode<PlaceListFieldsFragment, unknown>;
export const RaceFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RaceFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RaceNode"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageIds"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailId"}},{"kind":"Field","name":{"kind":"Name","value":"markdownNotes"}},{"kind":"Field","name":{"kind":"Name","value":"lockUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lockTime"}},{"kind":"Field","name":{"kind":"Name","value":"lockedBySelf"}},{"kind":"Field","name":{"kind":"Name","value":"ageOfAdulthood"}},{"kind":"Field","name":{"kind":"Name","value":"lifeExpectancy"}},{"kind":"Field","name":{"kind":"Name","value":"alignment"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"speed"}},{"kind":"Field","name":{"kind":"Name","value":"logs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"baseRace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageIds"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailId"}},{"kind":"Field","name":{"kind":"Name","value":"ageOfAdulthood"}},{"kind":"Field","name":{"kind":"Name","value":"lifeExpectancy"}},{"kind":"Field","name":{"kind":"Name","value":"alignment"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"speed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subraces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageIds"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailId"}},{"kind":"Field","name":{"kind":"Name","value":"ageOfAdulthood"}},{"kind":"Field","name":{"kind":"Name","value":"lifeExpectancy"}},{"kind":"Field","name":{"kind":"Name","value":"alignment"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"speed"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"languages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"script"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"traits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RaceFieldsFragment, unknown>;
export const ArtifactAddImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"artifactAddImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artifactAddImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"imageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArtifactFields"}}]}}]}}]}},...ArtifactFieldsFragmentDoc.definitions]} as unknown as DocumentNode<ArtifactAddImageMutation, ArtifactAddImageMutationVariables>;
export const ArtifactByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"artifactById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artifact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArtifactFields"}}]}}]}},...ArtifactFieldsFragmentDoc.definitions]} as unknown as DocumentNode<ArtifactByIdQuery, ArtifactByIdQueryVariables>;
export const ArtifactCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"artifactCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"thumbnailId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"markdownNotes"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageIds"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"items"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artifactCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"thumbnailId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"thumbnailId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"markdownNotes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"markdownNotes"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"imageIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageIds"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"items"},"value":{"kind":"Variable","name":{"kind":"Name","value":"items"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArtifactFields"}}]}}]}}]}},...ArtifactFieldsFragmentDoc.definitions]} as unknown as DocumentNode<ArtifactCreateMutation, ArtifactCreateMutationVariables>;
export const ArtifactLockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"artifactLock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artifactLock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArtifactFields"}}]}}]}}]}},...ArtifactFieldsFragmentDoc.definitions]} as unknown as DocumentNode<ArtifactLockMutation, ArtifactLockMutationVariables>;
export const ArtifactPatchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"artifactPatch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"thumbnailId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"markdownNotes"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"items"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artifactPatch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"thumbnailId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"thumbnailId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"markdownNotes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"markdownNotes"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"items"},"value":{"kind":"Variable","name":{"kind":"Name","value":"items"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArtifactFields"}}]}}]}}]}},...ArtifactFieldsFragmentDoc.definitions]} as unknown as DocumentNode<ArtifactPatchMutation, ArtifactPatchMutationVariables>;
export const ArtifactReleaseLockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"artifactReleaseLock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artifactReleaseLock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"artifact"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArtifactFields"}}]}}]}}]}},...ArtifactFieldsFragmentDoc.definitions]} as unknown as DocumentNode<ArtifactReleaseLockMutation, ArtifactReleaseLockMutationVariables>;
export const ArtifactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artifacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArtifactFields"}}]}}]}}]}}]}},...ArtifactFieldsFragmentDoc.definitions]} as unknown as DocumentNode<ArtifactsQuery, ArtifactsQueryVariables>;
export const AssociationAddImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"associationAddImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"associationAddImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"imageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"association"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssociationFields"}}]}}]}}]}},...AssociationFieldsFragmentDoc.definitions]} as unknown as DocumentNode<AssociationAddImageMutation, AssociationAddImageMutationVariables>;
export const AssociationByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"associationById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"association"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssociationFields"}}]}}]}},...AssociationFieldsFragmentDoc.definitions]} as unknown as DocumentNode<AssociationByIdQuery, AssociationByIdQueryVariables>;
export const AssociationCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"associationCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"thumbnailId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"markdownNotes"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageIds"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"npcs"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"associationCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"thumbnailId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"thumbnailId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"markdownNotes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"markdownNotes"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"imageIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageIds"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"npcs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"npcs"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"association"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssociationFields"}}]}}]}}]}},...AssociationFieldsFragmentDoc.definitions]} as unknown as DocumentNode<AssociationCreateMutation, AssociationCreateMutationVariables>;
export const AssociationLockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"associationLock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"associationLock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"association"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssociationFields"}}]}}]}}]}},...AssociationFieldsFragmentDoc.definitions]} as unknown as DocumentNode<AssociationLockMutation, AssociationLockMutationVariables>;
export const AssociationPatchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"associationPatch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"thumbnailId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"markdownNotes"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"npcs"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"associationPatch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"thumbnailId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"thumbnailId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"markdownNotes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"markdownNotes"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"npcs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"npcs"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"association"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssociationFields"}}]}}]}}]}},...AssociationFieldsFragmentDoc.definitions]} as unknown as DocumentNode<AssociationPatchMutation, AssociationPatchMutationVariables>;
export const AssociationReleaseLockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"associationReleaseLock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"associationReleaseLock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"association"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssociationFields"}}]}}]}}]}},...AssociationFieldsFragmentDoc.definitions]} as unknown as DocumentNode<AssociationReleaseLockMutation, AssociationReleaseLockMutationVariables>;
export const AssociationNamesAndIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"associationNamesAndIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"associations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AssociationNamesAndIdsQuery, AssociationNamesAndIdsQueryVariables>;
export const AssociationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"associations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"associations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AssociationFields"}}]}}]}}]}}]}},...AssociationFieldsFragmentDoc.definitions]} as unknown as DocumentNode<AssociationsQuery, AssociationsQueryVariables>;
export const AddEntityLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addEntityLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entityId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"logId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"logUrl"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addEntityLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"entityId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entityId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"logId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"logId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"logUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"logUrl"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"log"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<AddEntityLogMutation, AddEntityLogMutationVariables>;
export const RemoveEntityLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeEntityLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entityId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"logId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeEntityLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"entityId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entityId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"logId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"logId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}}]}}]} as unknown as DocumentNode<RemoveEntityLogMutation, RemoveEntityLogMutationVariables>;
export const ItemAddImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"itemAddImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemAddImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"imageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ItemFields"}}]}}]}}]}},...ItemFieldsFragmentDoc.definitions]} as unknown as DocumentNode<ItemAddImageMutation, ItemAddImageMutationVariables>;
export const ItemByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"itemById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"item"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ItemFields"}}]}}]}},...ItemFieldsFragmentDoc.definitions]} as unknown as DocumentNode<ItemByIdQuery, ItemByIdQueryVariables>;
export const ItemCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"itemCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"thumbnailId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"markdownNotes"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageIds"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"armor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ArmorInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"equipment"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EquipmentInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"weapon"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"WeaponInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"thumbnailId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"thumbnailId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"markdownNotes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"markdownNotes"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"imageIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageIds"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"armor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"armor"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"equipment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"equipment"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"weapon"},"value":{"kind":"Variable","name":{"kind":"Name","value":"weapon"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ItemFields"}}]}}]}}]}},...ItemFieldsFragmentDoc.definitions]} as unknown as DocumentNode<ItemCreateMutation, ItemCreateMutationVariables>;
export const ItemLockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"itemLock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemLock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ItemFields"}}]}}]}}]}},...ItemFieldsFragmentDoc.definitions]} as unknown as DocumentNode<ItemLockMutation, ItemLockMutationVariables>;
export const ItemPatchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"itemPatch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"thumbnailId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"markdownNotes"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"armor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ArmorInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"equipment"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EquipmentInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"weapon"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"WeaponInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemPatch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"thumbnailId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"thumbnailId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"markdownNotes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"markdownNotes"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"armor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"armor"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"equipment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"equipment"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"weapon"},"value":{"kind":"Variable","name":{"kind":"Name","value":"weapon"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ItemFields"}}]}}]}}]}},...ItemFieldsFragmentDoc.definitions]} as unknown as DocumentNode<ItemPatchMutation, ItemPatchMutationVariables>;
export const ItemReleaseLockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"itemReleaseLock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemReleaseLock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ItemFields"}}]}}]}}]}},...ItemFieldsFragmentDoc.definitions]} as unknown as DocumentNode<ItemReleaseLockMutation, ItemReleaseLockMutationVariables>;
export const ItemNamesAndIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"itemNamesAndIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ItemNamesAndIdsQuery, ItemNamesAndIdsQueryVariables>;
export const ItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ItemFields"}}]}}]}}]}}]}},...ItemFieldsFragmentDoc.definitions]} as unknown as DocumentNode<ItemsQuery, ItemsQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenAuth"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"payload"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isDM"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const NpcAddImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"npcAddImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"npcAddImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"imageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"npc"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NpcFields"}}]}}]}}]}},...NpcFieldsFragmentDoc.definitions]} as unknown as DocumentNode<NpcAddImageMutation, NpcAddImageMutationVariables>;
export const NpcByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"npcById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"npc"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NpcFields"}}]}}]}},...NpcFieldsFragmentDoc.definitions]} as unknown as DocumentNode<NpcByIdQuery, NpcByIdQueryVariables>;
export const NpcCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"npcCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"thumbnailId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"markdownNotes"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageIds"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"associations"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"race"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"npcCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"thumbnailId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"thumbnailId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"markdownNotes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"markdownNotes"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"imageIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageIds"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"associations"},"value":{"kind":"Variable","name":{"kind":"Name","value":"associations"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"race"},"value":{"kind":"Variable","name":{"kind":"Name","value":"race"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"npc"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NpcFields"}}]}}]}}]}},...NpcFieldsFragmentDoc.definitions]} as unknown as DocumentNode<NpcCreateMutation, NpcCreateMutationVariables>;
export const NpcLockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"npcLock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"npcLock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"npc"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NpcFields"}}]}}]}}]}},...NpcFieldsFragmentDoc.definitions]} as unknown as DocumentNode<NpcLockMutation, NpcLockMutationVariables>;
export const NpcPatchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"npcPatch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"thumbnailId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"markdownNotes"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"associations"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"race"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"npcPatch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"thumbnailId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"thumbnailId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"markdownNotes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"markdownNotes"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"associations"},"value":{"kind":"Variable","name":{"kind":"Name","value":"associations"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"race"},"value":{"kind":"Variable","name":{"kind":"Name","value":"race"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"npc"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NpcFields"}}]}}]}}]}},...NpcFieldsFragmentDoc.definitions]} as unknown as DocumentNode<NpcPatchMutation, NpcPatchMutationVariables>;
export const NpcReleaseLockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"npcReleaseLock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"npcReleaseLock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"npc"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NpcFields"}}]}}]}}]}},...NpcFieldsFragmentDoc.definitions]} as unknown as DocumentNode<NpcReleaseLockMutation, NpcReleaseLockMutationVariables>;
export const NpcNamesAndIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"npcNamesAndIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"npcs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<NpcNamesAndIdsQuery, NpcNamesAndIdsQueryVariables>;
export const NpcsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"npcs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"npcs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NpcFields"}}]}}]}}]}}]}},...NpcFieldsFragmentDoc.definitions]} as unknown as DocumentNode<NpcsQuery, NpcsQueryVariables>;
export const PlaceAddImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"placeAddImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"placeAddImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"imageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"place"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFields"}}]}}]}}]}},...PlaceFieldsFragmentDoc.definitions]} as unknown as DocumentNode<PlaceAddImageMutation, PlaceAddImageMutationVariables>;
export const PlaceByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"placeById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"place"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFields"}}]}}]}},...PlaceFieldsFragmentDoc.definitions]} as unknown as DocumentNode<PlaceByIdQuery, PlaceByIdQueryVariables>;
export const PlaceCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"placeCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"thumbnailId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"markdownNotes"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageIds"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"placeType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parent"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"children"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"placeCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"thumbnailId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"thumbnailId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"markdownNotes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"markdownNotes"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"imageIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageIds"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"placeType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"placeType"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"parent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parent"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"children"},"value":{"kind":"Variable","name":{"kind":"Name","value":"children"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"place"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFields"}}]}}]}}]}},...PlaceFieldsFragmentDoc.definitions]} as unknown as DocumentNode<PlaceCreateMutation, PlaceCreateMutationVariables>;
export const PlaceLockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"placeLock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"placeLock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"place"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFields"}}]}}]}}]}},...PlaceFieldsFragmentDoc.definitions]} as unknown as DocumentNode<PlaceLockMutation, PlaceLockMutationVariables>;
export const PlacePatchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"placePatch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"thumbnailId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"markdownNotes"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"placeType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parent"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"children"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"placePatch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"thumbnailId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"thumbnailId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"markdownNotes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"markdownNotes"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"placeType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"placeType"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"parent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parent"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"children"},"value":{"kind":"Variable","name":{"kind":"Name","value":"children"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"place"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFields"}}]}}]}}]}},...PlaceFieldsFragmentDoc.definitions]} as unknown as DocumentNode<PlacePatchMutation, PlacePatchMutationVariables>;
export const PlaceReleaseLockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"placeReleaseLock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"placeReleaseLock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"place"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceFields"}}]}}]}}]}},...PlaceFieldsFragmentDoc.definitions]} as unknown as DocumentNode<PlaceReleaseLockMutation, PlaceReleaseLockMutationVariables>;
export const PlacesForSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"placesForSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"placeTypeDisplay"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PlacesForSearchQuery, PlacesForSearchQueryVariables>;
export const PlacesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaceListFields"}}]}}]}}]}}]}},...PlaceListFieldsFragmentDoc.definitions]} as unknown as DocumentNode<PlacesQuery, PlacesQueryVariables>;
export const RaceAddImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"raceAddImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceAddImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"imageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RaceFields"}}]}}]}}]}},...RaceFieldsFragmentDoc.definitions]} as unknown as DocumentNode<RaceAddImageMutation, RaceAddImageMutationVariables>;
export const RaceByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"raceById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"race"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RaceFields"}}]}}]}},...RaceFieldsFragmentDoc.definitions]} as unknown as DocumentNode<RaceByIdQuery, RaceByIdQueryVariables>;
export const RaceCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"raceCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"thumbnailId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"markdownNotes"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageIds"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"thumbnailId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"thumbnailId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"markdownNotes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"markdownNotes"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"imageIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageIds"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RaceFields"}}]}}]}}]}},...RaceFieldsFragmentDoc.definitions]} as unknown as DocumentNode<RaceCreateMutation, RaceCreateMutationVariables>;
export const RaceLockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"raceLock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceLock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RaceFields"}}]}}]}}]}},...RaceFieldsFragmentDoc.definitions]} as unknown as DocumentNode<RaceLockMutation, RaceLockMutationVariables>;
export const RacePatchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"racePatch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"thumbnailId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"markdownNotes"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"racePatch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"thumbnailId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"thumbnailId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"markdownNotes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"markdownNotes"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RaceFields"}}]}}]}}]}},...RaceFieldsFragmentDoc.definitions]} as unknown as DocumentNode<RacePatchMutation, RacePatchMutationVariables>;
export const RaceReleaseLockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"raceReleaseLock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raceReleaseLock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"race"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RaceFields"}}]}}]}}]}},...RaceFieldsFragmentDoc.definitions]} as unknown as DocumentNode<RaceReleaseLockMutation, RaceReleaseLockMutationVariables>;
export const RaceNamesAndIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"raceNamesAndIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RaceNamesAndIdsQuery, RaceNamesAndIdsQueryVariables>;
export const RacesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"races"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"races"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RaceFields"}}]}}]}}]}}]}},...RaceFieldsFragmentDoc.definitions]} as unknown as DocumentNode<RacesQuery, RacesQueryVariables>;
export const ArtifactFields = gql`
    fragment ArtifactFields on ArtifactNode {
  id
  name
  description
  imageIds
  thumbnailId
  created
  updated
  markdownNotes
  lockUser {
    id
    username
  }
  lockTime
  lockedBySelf
  logs {
    edges {
      node {
        id
        url
        name
      }
    }
  }
  items {
    edges {
      node {
        id
        name
        description
        imageIds
        thumbnailId
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
export const AssociationFields = gql`
    fragment AssociationFields on AssociationNode {
  id
  name
  description
  imageIds
  thumbnailId
  markdownNotes
  lockUser {
    id
    username
  }
  lockTime
  lockedBySelf
  logs {
    edges {
      node {
        id
        url
        name
      }
    }
  }
  npcs {
    edges {
      node {
        id
        name
        description
      }
    }
  }
}
    `;
export const ItemFields = gql`
    fragment ItemFields on ItemNode {
  id
  name
  description
  imageIds
  thumbnailId
  markdownNotes
  lockUser {
    id
    username
  }
  lockTime
  lockedBySelf
  logs {
    edges {
      node {
        id
        url
        name
      }
    }
  }
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
    `;
export const NpcFields = gql`
    fragment NpcFields on NPCNode {
  id
  name
  description
  imageIds
  thumbnailId
  markdownNotes
  lockUser {
    id
    username
  }
  lockTime
  lockedBySelf
  size
  logs {
    edges {
      node {
        id
        url
        name
      }
    }
  }
  race {
    id
    name
    description
    imageIds
    thumbnailId
    ageOfAdulthood
    lifeExpectancy
    alignment
    size
    speed
  }
  associations {
    edges {
      node {
        id
        name
        description
      }
    }
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
    `;
export const PlaceFields = gql`
    fragment PlaceFields on PlaceNode {
  id
  name
  description
  imageIds
  thumbnailId
  markdownNotes
  lockUser {
    id
    username
  }
  lockTime
  lockedBySelf
  created
  updated
  placeType
  placeTypeDisplay
  population
  logs {
    edges {
      node {
        id
        url
        name
      }
    }
  }
  parent {
    id
    name
    description
    imageIds
    thumbnailId
    created
    updated
    placeType
    placeTypeDisplay
    population
    parent {
      id
      name
      description
      imageIds
      thumbnailId
      created
      updated
      placeType
      placeTypeDisplay
      population
      parent {
        id
        name
        placeType
        placeTypeDisplay
        parent {
          id
          name
          placeType
          placeTypeDisplay
          parent {
            id
            name
            placeType
            placeTypeDisplay
            parent {
              id
              name
              placeType
              placeTypeDisplay
            }
          }
        }
      }
    }
  }
  children {
    edges {
      node {
        id
        name
        description
        imageIds
        thumbnailId
        created
        updated
        placeType
        placeTypeDisplay
        population
      }
    }
  }
}
    `;
export const PlaceListFields = gql`
    fragment PlaceListFields on PlaceNode {
  id
  name
  description
  imageIds
  thumbnailId
  placeTypeDisplay
}
    `;
export const RaceFields = gql`
    fragment RaceFields on RaceNode {
  id
  name
  description
  imageIds
  thumbnailId
  markdownNotes
  lockUser {
    id
    username
  }
  lockTime
  lockedBySelf
  ageOfAdulthood
  lifeExpectancy
  alignment
  size
  speed
  logs {
    edges {
      node {
        id
        url
        name
      }
    }
  }
  baseRace {
    id
    name
    description
    imageIds
    thumbnailId
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
        description
        imageIds
        thumbnailId
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
    `;
export const ArtifactAddImage = gql`
    mutation artifactAddImage($id: ID!, $imageId: String) {
  artifactAddImage(input: {id: $id, imageId: $imageId}) {
    ok
    errors
    artifact {
      ...ArtifactFields
    }
  }
}
    ${ArtifactFields}`;
export const ArtifactById = gql`
    query artifactById($id: ID!) {
  artifact(id: $id) {
    ...ArtifactFields
  }
}
    ${ArtifactFields}`;
export const ArtifactCreate = gql`
    mutation artifactCreate($name: String, $description: String, $thumbnailId: String, $markdownNotes: String, $imageIds: [String], $items: [String]) {
  artifactCreate(
    input: {name: $name, description: $description, thumbnailId: $thumbnailId, markdownNotes: $markdownNotes, imageIds: $imageIds, items: $items}
  ) {
    ok
    errors
    artifact {
      ...ArtifactFields
    }
  }
}
    ${ArtifactFields}`;
export const ArtifactLock = gql`
    mutation artifactLock($id: ID!) {
  artifactLock(input: {id: $id}) {
    ok
    errors
    artifact {
      ...ArtifactFields
    }
  }
}
    ${ArtifactFields}`;
export const ArtifactPatch = gql`
    mutation artifactPatch($id: ID!, $name: String, $description: String, $thumbnailId: String, $markdownNotes: String, $items: [String]) {
  artifactPatch(
    input: {id: $id, name: $name, description: $description, thumbnailId: $thumbnailId, markdownNotes: $markdownNotes, items: $items}
  ) {
    ok
    errors
    artifact {
      ...ArtifactFields
    }
  }
}
    ${ArtifactFields}`;
export const ArtifactReleaseLock = gql`
    mutation artifactReleaseLock($id: ID!) {
  artifactReleaseLock(input: {id: $id}) {
    ok
    errors
    artifact {
      ...ArtifactFields
    }
  }
}
    ${ArtifactFields}`;
export const Artifacts = gql`
    query artifacts {
  artifacts {
    edges {
      node {
        ...ArtifactFields
      }
    }
  }
}
    ${ArtifactFields}`;
export const AssociationAddImage = gql`
    mutation associationAddImage($id: ID!, $imageId: String) {
  associationAddImage(input: {id: $id, imageId: $imageId}) {
    ok
    errors
    association {
      ...AssociationFields
    }
  }
}
    ${AssociationFields}`;
export const AssociationById = gql`
    query associationById($id: ID!) {
  association(id: $id) {
    ...AssociationFields
  }
}
    ${AssociationFields}`;
export const AssociationCreate = gql`
    mutation associationCreate($name: String, $description: String, $thumbnailId: String, $markdownNotes: String, $imageIds: [String], $npcs: [ID]) {
  associationCreate(
    input: {name: $name, description: $description, thumbnailId: $thumbnailId, markdownNotes: $markdownNotes, imageIds: $imageIds, npcs: $npcs}
  ) {
    ok
    errors
    association {
      ...AssociationFields
    }
  }
}
    ${AssociationFields}`;
export const AssociationLock = gql`
    mutation associationLock($id: ID!) {
  associationLock(input: {id: $id}) {
    ok
    errors
    association {
      ...AssociationFields
    }
  }
}
    ${AssociationFields}`;
export const AssociationPatch = gql`
    mutation associationPatch($id: ID!, $name: String, $description: String, $thumbnailId: String, $markdownNotes: String, $npcs: [ID]) {
  associationPatch(
    input: {id: $id, name: $name, description: $description, thumbnailId: $thumbnailId, markdownNotes: $markdownNotes, npcs: $npcs}
  ) {
    ok
    errors
    association {
      ...AssociationFields
    }
  }
}
    ${AssociationFields}`;
export const AssociationReleaseLock = gql`
    mutation associationReleaseLock($id: ID!) {
  associationReleaseLock(input: {id: $id}) {
    ok
    errors
    association {
      ...AssociationFields
    }
  }
}
    ${AssociationFields}`;
export const AssociationNamesAndIds = gql`
    query associationNamesAndIds {
  associations {
    edges {
      node {
        id
        name
      }
    }
  }
}
    `;
export const Associations = gql`
    query associations {
  associations {
    edges {
      node {
        ...AssociationFields
      }
    }
  }
}
    ${AssociationFields}`;
export const AddEntityLog = gql`
    mutation addEntityLog($entityId: ID!, $logId: ID, $logUrl: String) {
  addEntityLog(input: {entityId: $entityId, logId: $logId, logUrl: $logUrl}) {
    ok
    errors
    log {
      id
      url
      name
    }
  }
}
    `;
export const RemoveEntityLog = gql`
    mutation removeEntityLog($entityId: ID!, $logId: ID!) {
  removeEntityLog(input: {entityId: $entityId, logId: $logId}) {
    ok
    errors
  }
}
    `;
export const ItemAddImage = gql`
    mutation itemAddImage($id: ID!, $imageId: String) {
  itemAddImage(input: {id: $id, imageId: $imageId}) {
    ok
    errors
    item {
      ...ItemFields
    }
  }
}
    ${ItemFields}`;
export const ItemById = gql`
    query itemById($id: ID!) {
  item(id: $id) {
    ...ItemFields
  }
}
    ${ItemFields}`;
export const ItemCreate = gql`
    mutation itemCreate($name: String, $description: String, $thumbnailId: String, $markdownNotes: String, $imageIds: [String], $armor: ArmorInput, $equipment: EquipmentInput, $weapon: WeaponInput) {
  itemCreate(
    input: {name: $name, description: $description, thumbnailId: $thumbnailId, markdownNotes: $markdownNotes, imageIds: $imageIds, armor: $armor, equipment: $equipment, weapon: $weapon}
  ) {
    ok
    errors
    item {
      ...ItemFields
    }
  }
}
    ${ItemFields}`;
export const ItemLock = gql`
    mutation itemLock($id: ID!) {
  itemLock(input: {id: $id}) {
    ok
    errors
    item {
      ...ItemFields
    }
  }
}
    ${ItemFields}`;
export const ItemPatch = gql`
    mutation itemPatch($id: ID!, $name: String, $description: String, $thumbnailId: String, $markdownNotes: String, $armor: ArmorInput, $equipment: EquipmentInput, $weapon: WeaponInput) {
  itemPatch(
    input: {id: $id, name: $name, description: $description, thumbnailId: $thumbnailId, markdownNotes: $markdownNotes, armor: $armor, equipment: $equipment, weapon: $weapon}
  ) {
    ok
    errors
    item {
      ...ItemFields
    }
  }
}
    ${ItemFields}`;
export const ItemReleaseLock = gql`
    mutation itemReleaseLock($id: ID!) {
  itemReleaseLock(input: {id: $id}) {
    ok
    errors
    item {
      ...ItemFields
    }
  }
}
    ${ItemFields}`;
export const ItemNamesAndIds = gql`
    query itemNamesAndIds {
  items {
    edges {
      node {
        id
        name
      }
    }
  }
}
    `;
export const Items = gql`
    query items {
  items {
    edges {
      node {
        ...ItemFields
      }
    }
  }
}
    ${ItemFields}`;
export const Login = gql`
    mutation login($username: String!, $password: String!) {
  tokenAuth(input: {username: $username, password: $password}) {
    token
    payload
  }
}
    `;
export const Me = gql`
    query me {
  me {
    username
    firstName
    lastName
    email
    isDM
    id
  }
}
    `;
export const NpcAddImage = gql`
    mutation npcAddImage($id: ID!, $imageId: String) {
  npcAddImage(input: {id: $id, imageId: $imageId}) {
    ok
    errors
    npc {
      ...NpcFields
    }
  }
}
    ${NpcFields}`;
export const NpcById = gql`
    query npcById($id: ID!) {
  npc(id: $id) {
    ...NpcFields
  }
}
    ${NpcFields}`;
export const NpcCreate = gql`
    mutation npcCreate($name: String, $description: String, $thumbnailId: String, $markdownNotes: String, $imageIds: [String], $associations: [ID], $race: ID) {
  npcCreate(
    input: {name: $name, description: $description, thumbnailId: $thumbnailId, markdownNotes: $markdownNotes, imageIds: $imageIds, associations: $associations, race: $race}
  ) {
    ok
    errors
    npc {
      ...NpcFields
    }
  }
}
    ${NpcFields}`;
export const NpcLock = gql`
    mutation npcLock($id: ID!) {
  npcLock(input: {id: $id}) {
    ok
    errors
    npc {
      ...NpcFields
    }
  }
}
    ${NpcFields}`;
export const NpcPatch = gql`
    mutation npcPatch($id: ID!, $name: String, $description: String, $thumbnailId: String, $markdownNotes: String, $associations: [ID], $race: ID) {
  npcPatch(
    input: {id: $id, name: $name, description: $description, thumbnailId: $thumbnailId, markdownNotes: $markdownNotes, associations: $associations, race: $race}
  ) {
    ok
    errors
    npc {
      ...NpcFields
    }
  }
}
    ${NpcFields}`;
export const NpcReleaseLock = gql`
    mutation npcReleaseLock($id: ID!) {
  npcReleaseLock(input: {id: $id}) {
    ok
    errors
    npc {
      ...NpcFields
    }
  }
}
    ${NpcFields}`;
export const NpcNamesAndIds = gql`
    query npcNamesAndIds {
  npcs {
    edges {
      node {
        id
        name
      }
    }
  }
}
    `;
export const Npcs = gql`
    query npcs {
  npcs {
    edges {
      node {
        ...NpcFields
      }
    }
  }
}
    ${NpcFields}`;
export const PlaceAddImage = gql`
    mutation placeAddImage($id: ID!, $imageId: String) {
  placeAddImage(input: {id: $id, imageId: $imageId}) {
    ok
    errors
    place {
      ...PlaceFields
    }
  }
}
    ${PlaceFields}`;
export const PlaceById = gql`
    query placeById($id: ID!) {
  place(id: $id) {
    ...PlaceFields
  }
}
    ${PlaceFields}`;
export const PlaceCreate = gql`
    mutation placeCreate($name: String, $description: String, $thumbnailId: String, $markdownNotes: String, $imageIds: [String], $placeType: String, $parent: ID, $children: [ID]) {
  placeCreate(
    input: {name: $name, description: $description, thumbnailId: $thumbnailId, markdownNotes: $markdownNotes, imageIds: $imageIds, placeType: $placeType, parent: $parent, children: $children}
  ) {
    ok
    errors
    place {
      ...PlaceFields
    }
  }
}
    ${PlaceFields}`;
export const PlaceLock = gql`
    mutation placeLock($id: ID!) {
  placeLock(input: {id: $id}) {
    ok
    errors
    place {
      ...PlaceFields
    }
  }
}
    ${PlaceFields}`;
export const PlacePatch = gql`
    mutation placePatch($id: ID!, $name: String, $description: String, $thumbnailId: String, $markdownNotes: String, $placeType: String, $parent: ID, $children: [ID]) {
  placePatch(
    input: {id: $id, name: $name, description: $description, thumbnailId: $thumbnailId, markdownNotes: $markdownNotes, placeType: $placeType, parent: $parent, children: $children}
  ) {
    ok
    errors
    place {
      ...PlaceFields
    }
  }
}
    ${PlaceFields}`;
export const PlaceReleaseLock = gql`
    mutation placeReleaseLock($id: ID!) {
  placeReleaseLock(input: {id: $id}) {
    ok
    errors
    place {
      ...PlaceFields
    }
  }
}
    ${PlaceFields}`;
export const PlacesForSearch = gql`
    query placesForSearch {
  places {
    edges {
      node {
        id
        name
        placeTypeDisplay
      }
    }
  }
}
    `;
export const Places = gql`
    query places {
  places {
    edges {
      node {
        ...PlaceListFields
      }
    }
  }
}
    ${PlaceListFields}`;
export const RaceAddImage = gql`
    mutation raceAddImage($id: ID!, $imageId: String) {
  raceAddImage(input: {id: $id, imageId: $imageId}) {
    ok
    errors
    race {
      ...RaceFields
    }
  }
}
    ${RaceFields}`;
export const RaceById = gql`
    query raceById($id: ID!) {
  race(id: $id) {
    ...RaceFields
  }
}
    ${RaceFields}`;
export const RaceCreate = gql`
    mutation raceCreate($name: String, $description: String, $thumbnailId: String, $markdownNotes: String, $imageIds: [String]) {
  raceCreate(
    input: {name: $name, description: $description, thumbnailId: $thumbnailId, markdownNotes: $markdownNotes, imageIds: $imageIds}
  ) {
    ok
    errors
    race {
      ...RaceFields
    }
  }
}
    ${RaceFields}`;
export const RaceLock = gql`
    mutation raceLock($id: ID!) {
  raceLock(input: {id: $id}) {
    ok
    errors
    race {
      ...RaceFields
    }
  }
}
    ${RaceFields}`;
export const RacePatch = gql`
    mutation racePatch($id: ID!, $name: String, $description: String, $thumbnailId: String, $markdownNotes: String) {
  racePatch(
    input: {id: $id, name: $name, description: $description, thumbnailId: $thumbnailId, markdownNotes: $markdownNotes}
  ) {
    ok
    errors
    race {
      ...RaceFields
    }
  }
}
    ${RaceFields}`;
export const RaceReleaseLock = gql`
    mutation raceReleaseLock($id: ID!) {
  raceReleaseLock(input: {id: $id}) {
    ok
    errors
    race {
      ...RaceFields
    }
  }
}
    ${RaceFields}`;
export const RaceNamesAndIds = gql`
    query raceNamesAndIds {
  races {
    edges {
      node {
        id
        name
      }
    }
  }
}
    `;
export const Races = gql`
    query races {
  races {
    edges {
      node {
        ...RaceFields
      }
    }
  }
}
    ${RaceFields}`;