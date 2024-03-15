export const PUBLIC_PAGES = ['/login'] as const;

export const themes = ['light', 'dark', 'trek'] as const;

// export const themes = [
// 	'light',
// 	'dark',
// 	'trek',
// 	'cupcake',
// 	'bumblebee',
// 	'emerald',
// 	'corporate',
// 	'synthwave',
// 	'retro',
// 	'cyberpunk',
// 	'valentine',
// 	'halloween',
// 	'garden',
// 	'forest',
// 	'aqua',
// 	'lofi',
// 	'pastel',
// 	'fantasy',
// 	'wireframe',
// 	'black',
// 	'luxury',
// 	'dracula',
// 	'cmyk',
// 	'autumn',
// 	'business',
// 	'acid',
// 	'lemonade',
// 	'night',
// 	'coffee',
// 	'winter'
// ];

export const ENTITY_TYPE = {
	ARTIFACT: 'Artifact',
	ASSOCIATION: 'Association',
	CHARACTER: 'Character',
	ITEM: 'Item',
	PLACE: 'Place',
	RACE: 'Race'
} as const;

export const ENTITY_TYPES = Object.values(ENTITY_TYPE);

export type EntityType = (typeof ENTITY_TYPE)[keyof typeof ENTITY_TYPE];

export const ENTITY_TYPE_PLURALS = {
	[ENTITY_TYPE.ARTIFACT]: 'Artifacts',
	[ENTITY_TYPE.ASSOCIATION]: 'Associations',
	[ENTITY_TYPE.CHARACTER]: 'Characters',
	[ENTITY_TYPE.ITEM]: 'Items',
	[ENTITY_TYPE.PLACE]: 'Places',
	[ENTITY_TYPE.RACE]: 'Races'
} as const;

export type EntityTypePlural = (typeof ENTITY_TYPE_PLURALS)[keyof typeof ENTITY_TYPE_PLURALS];

export const entityPlural = (entityType: EntityType): EntityTypePlural =>
	ENTITY_TYPE_PLURALS[entityType];

// Must use `:` rather than `/` as separator for DEFAULT_IMAGE_SRC
export const DEFAULT_IMAGE_SRC = 'dnd:placeholder.jpg';
