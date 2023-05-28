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
	ARTIFACT: 'artifact',
	ASSOCIATION: 'association',
	CHARACTER: 'character',
	ITEM: 'item',
	PLACE: 'place',
	RACE: 'race'
} as const;

export const ENTITY_TYPES = Object.values(ENTITY_TYPE);

export type EntityType = (typeof ENTITY_TYPE)[keyof typeof ENTITY_TYPE];

export const ENTITY_TYPE_PLURALS = {
	[ENTITY_TYPE.ARTIFACT]: 'artifacts',
	[ENTITY_TYPE.ASSOCIATION]: 'associations',
	[ENTITY_TYPE.CHARACTER]: 'characters',
	[ENTITY_TYPE.ITEM]: 'items',
	[ENTITY_TYPE.PLACE]: 'places',
	[ENTITY_TYPE.RACE]: 'races'
} as const;

export type EntityTypePlural = (typeof ENTITY_TYPE_PLURALS)[keyof typeof ENTITY_TYPE_PLURALS];

export const entityPlural = (entityType: EntityType): EntityTypePlural =>
	ENTITY_TYPE_PLURALS[entityType];
