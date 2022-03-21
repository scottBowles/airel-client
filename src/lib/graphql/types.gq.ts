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
   * Leverages the internal Python implementation of UUID (uuid.UUID) to provide native UUID objects
   * in fields, resolvers and input.
   */
  UUID: any;
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

export type ArmorInput = {
  acBonus?: InputMaybe<Scalars['Int']>;
};

export type ArmorTraitsNode = Node & {
  __typename?: 'ArmorTraitsNode';
  acBonus: Scalars['Int'];
  /** The ID of the object */
  id: Scalars['ID'];
};

export type ArtifactInput = {
  notes?: InputMaybe<Scalars['String']>;
};

export type ArtifactNode = Node & {
  __typename?: 'ArtifactNode';
  created: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  /** The ID of the object */
  id: Scalars['ID'];
  imageId?: Maybe<Scalars['String']>;
  items: ItemNodeConnection;
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

export type AssociationConnection = {
  __typename?: 'AssociationConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<AssociationEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

export type AssociationCreateMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  imageId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
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

/** A Relay edge containing a `Association` and its cursor. */
export type AssociationEdge = {
  __typename?: 'AssociationEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<AssociationNode>;
  notes?: Maybe<Scalars['String']>;
};

export type AssociationNode = Node & {
  __typename?: 'AssociationNode';
  created: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  /** The ID of the object */
  id: Scalars['ID'];
  imageId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  thumbnailId?: Maybe<Scalars['String']>;
  updated: Scalars['DateTime'];
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
  imageId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  thumbnailId?: InputMaybe<Scalars['String']>;
};

export type AssociationPatchMutationPayload = {
  __typename?: 'AssociationPatchMutationPayload';
  association?: Maybe<AssociationNode>;
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type AssociationUpdateMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  imageId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
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

export type ExportNode = Node & {
  __typename?: 'ExportNode';
  created: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  /** The ID of the object */
  id: Scalars['ID'];
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
  name?: InputMaybe<Scalars['String']>;
};

export type ExportPatchMutationPayload = {
  __typename?: 'ExportPatchMutationPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  errors?: Maybe<Scalars['String']>;
  export?: Maybe<ExportNode>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type ExportUpdateMutationInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
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

export type ItemCreateMutationInput = {
  armor?: InputMaybe<ArmorInput>;
  artifact?: InputMaybe<ArtifactInput>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  equipment?: InputMaybe<EquipmentInput>;
  imageId?: InputMaybe<Scalars['String']>;
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

export type ItemNode = Node & {
  __typename?: 'ItemNode';
  armor?: Maybe<ArmorTraitsNode>;
  created: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  equipment?: Maybe<EquipmentTraitsNode>;
  /** The ID of the object */
  id: Scalars['ID'];
  imageId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  thumbnailId?: Maybe<Scalars['String']>;
  updated: Scalars['DateTime'];
  weapon?: Maybe<WeaponTraitsNode>;
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
  artifact?: InputMaybe<ArtifactInput>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  equipment?: InputMaybe<EquipmentInput>;
  id?: InputMaybe<Scalars['ID']>;
  imageId?: InputMaybe<Scalars['String']>;
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

export type ItemUpdateMutationInput = {
  armor?: InputMaybe<ArmorInput>;
  artifact?: InputMaybe<ArtifactInput>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  equipment?: InputMaybe<EquipmentInput>;
  id?: InputMaybe<Scalars['ID']>;
  imageId?: InputMaybe<Scalars['String']>;
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
  associationCreate?: Maybe<AssociationCreateMutationPayload>;
  associationDelete?: Maybe<AssociationDeleteMutationPayload>;
  associationPatch?: Maybe<AssociationPatchMutationPayload>;
  associationUpdate?: Maybe<AssociationUpdateMutationPayload>;
  exportCreate?: Maybe<ExportCreateMutationPayload>;
  exportDelete?: Maybe<ExportDeleteMutationPayload>;
  exportPatch?: Maybe<ExportPatchMutationPayload>;
  exportUpdate?: Maybe<ExportUpdateMutationPayload>;
  featureCreate?: Maybe<FeatureCreateMutationPayload>;
  featureDelete?: Maybe<FeatureDeleteMutationPayload>;
  featurePatch?: Maybe<FeaturePatchMutationPayload>;
  featureUpdate?: Maybe<FeatureUpdateMutationPayload>;
  itemCreate?: Maybe<ItemCreateMutationPayload>;
  itemDelete?: Maybe<ItemDeleteMutationPayload>;
  itemPatch?: Maybe<ItemPatchMutationPayload>;
  itemUpdate?: Maybe<ItemUpdateMutationPayload>;
  languageCreate?: Maybe<LanguageCreateMutationPayload>;
  languageDelete?: Maybe<LanguageDeleteMutationPayload>;
  languagePatch?: Maybe<LanguagePatchMutationPayload>;
  languageUpdate?: Maybe<LanguageUpdateMutationPayload>;
  placeCreate?: Maybe<PlaceCreateMutationPayload>;
  placeDelete?: Maybe<PlaceDeleteMutationPayload>;
  placePatch?: Maybe<PlacePatchMutationPayload>;
  placeUpdate?: Maybe<PlaceUpdateMutationPayload>;
  proficiencyCreate?: Maybe<ProficiencyCreateMutationPayload>;
  proficiencyDelete?: Maybe<ProficiencyDeleteMutationPayload>;
  proficiencyPatch?: Maybe<ProficiencyPatchMutationPayload>;
  proficiencyUpdate?: Maybe<ProficiencyUpdateMutationPayload>;
  raceCreate?: Maybe<RaceCreateMutationPayload>;
  raceDelete?: Maybe<RaceDeleteMutationPayload>;
  racePatch?: Maybe<RacePatchMutationPayload>;
  raceUpdate?: Maybe<RaceUpdateMutationPayload>;
  scriptCreate?: Maybe<ScriptCreateMutationPayload>;
  scriptDelete?: Maybe<ScriptDeleteMutationPayload>;
  scriptPatch?: Maybe<ScriptPatchMutationPayload>;
  scriptUpdate?: Maybe<ScriptUpdateMutationPayload>;
  skillCreate?: Maybe<SkillCreateMutationPayload>;
  skillDelete?: Maybe<SkillDeleteMutationPayload>;
  skillPatch?: Maybe<SkillPatchMutationPayload>;
  skillUpdate?: Maybe<SkillUpdateMutationPayload>;
  traitCreate?: Maybe<TraitCreateMutationPayload>;
  traitDelete?: Maybe<TraitDeleteMutationPayload>;
  traitPatch?: Maybe<TraitPatchMutationPayload>;
  traitUpdate?: Maybe<TraitUpdateMutationPayload>;
};


export type MutationAbilityScoreIncreaseCreateArgs = {
  input: AbilityscoreincreaseCreateMutationInput;
};


export type MutationAssociationCreateArgs = {
  input: AssociationCreateMutationInput;
};


export type MutationAssociationDeleteArgs = {
  input: AssociationDeleteMutationInput;
};


export type MutationAssociationPatchArgs = {
  input: AssociationPatchMutationInput;
};


export type MutationAssociationUpdateArgs = {
  input: AssociationUpdateMutationInput;
};


export type MutationExportCreateArgs = {
  input: ExportCreateMutationInput;
};


export type MutationExportDeleteArgs = {
  input: ExportDeleteMutationInput;
};


export type MutationExportPatchArgs = {
  input: ExportPatchMutationInput;
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


export type MutationItemCreateArgs = {
  input: ItemCreateMutationInput;
};


export type MutationItemDeleteArgs = {
  input: ItemDeleteMutationInput;
};


export type MutationItemPatchArgs = {
  input: ItemPatchMutationInput;
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


export type MutationPlaceCreateArgs = {
  input: PlaceCreateMutationInput;
};


export type MutationPlaceDeleteArgs = {
  input: PlaceDeleteMutationInput;
};


export type MutationPlacePatchArgs = {
  input: PlacePatchMutationInput;
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


export type MutationRaceCreateArgs = {
  input: RaceCreateMutationInput;
};


export type MutationRaceDeleteArgs = {
  input: RaceDeleteMutationInput;
};


export type MutationRacePatchArgs = {
  input: RacePatchMutationInput;
};


export type MutationRaceUpdateArgs = {
  input: RaceUpdateMutationInput;
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

export type NpcNode = Node & {
  __typename?: 'NPCNode';
  created: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  featuresAndTraits?: Maybe<FeaturesAndTraitConnection>;
  /** The ID of the object */
  id: Scalars['ID'];
  imageId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  proficiencies: ProficiencyNodeConnection;
  profiencies?: Maybe<ProficiencyConnection>;
  race?: Maybe<RaceNode>;
  size?: Maybe<CharacterNpcSizeChoices>;
  slug: Scalars['String'];
  thumbnailId?: Maybe<Scalars['String']>;
  updated: Scalars['DateTime'];
};


export type NpcNodeFeaturesAndTraitsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
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

export type PlaceAssociationInput = {
  association?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
};

export type PlaceCreateMutationInput = {
  associations?: InputMaybe<Array<InputMaybe<PlaceAssociationInput>>>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  exports?: InputMaybe<Array<InputMaybe<PlaceExportInput>>>;
  imageId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['UUID']>;
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

export type PlaceNode = Node & {
  __typename?: 'PlaceNode';
  associations?: Maybe<AssociationConnection>;
  children: PlaceNodeConnection;
  commonRaces?: Maybe<RaceConnection>;
  created: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  exports?: Maybe<ExportConnection>;
  /** The ID of the object */
  id: Scalars['ID'];
  imageId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  parent?: Maybe<PlaceNode>;
  placeType: PlacePlacePlaceTypeChoices;
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
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  exports?: InputMaybe<Array<InputMaybe<PlaceExportInput>>>;
  id?: InputMaybe<Scalars['ID']>;
  imageId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['UUID']>;
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

export type PlaceUpdateMutationInput = {
  associations?: InputMaybe<Array<InputMaybe<PlaceAssociationInput>>>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  exports?: InputMaybe<Array<InputMaybe<PlaceExportInput>>>;
  id?: InputMaybe<Scalars['ID']>;
  imageId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['UUID']>;
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
  item?: Maybe<ItemNode>;
  items?: Maybe<ItemNodeConnection>;
  language?: Maybe<LanguageNode>;
  languages?: Maybe<LanguageNodeConnection>;
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
  imageId?: InputMaybe<Scalars['String']>;
  languages?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lifeExpectancy?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
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

export type RaceNode = Node & {
  __typename?: 'RaceNode';
  abilityScoreIncreases: AbilityScoreIncreaseNodeConnection;
  ageOfAdulthood?: Maybe<Scalars['Int']>;
  alignment?: Maybe<RaceRaceAlignmentChoices>;
  baseRace?: Maybe<RaceNode>;
  description?: Maybe<Scalars['String']>;
  /** The ID of the object */
  id: Scalars['ID'];
  imageId?: Maybe<Scalars['String']>;
  languages: LanguageNodeConnection;
  lifeExpectancy?: Maybe<Scalars['Int']>;
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
  imageId?: InputMaybe<Scalars['String']>;
  languages?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lifeExpectancy?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
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

export type RaceUpdateMutationInput = {
  ageOfAdulthood?: InputMaybe<Scalars['Int']>;
  alignment?: InputMaybe<Scalars['String']>;
  baseRace?: InputMaybe<Scalars['String']>;
  clientMutationId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  imageId?: InputMaybe<Scalars['String']>;
  languages?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lifeExpectancy?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
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

export type WeaponInput = {
  attackBonus?: InputMaybe<Scalars['Int']>;
};

export type WeaponTraitsNode = Node & {
  __typename?: 'WeaponTraitsNode';
  attackBonus: Scalars['Int'];
  /** The ID of the object */
  id: Scalars['ID'];
};
