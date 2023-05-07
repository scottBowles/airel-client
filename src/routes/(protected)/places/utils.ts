import { capitalize } from '$lib/utils';

export const getChildrenName = (type: string | null) => {
	const mapping = {
		Star: 'Planets',
		Planet: 'Moons, Regions, or Towns',
		Moon: 'Regions or Towns',
		Region: 'Towns, Districts, or Locations',
		Town: 'Districts or Locations',
		District: 'Locations',
		Location: 'Locations'
	};

	if (type && type in mapping) {
		return mapping[type as keyof typeof mapping];
	}

	return 'Children';
};

export const getParentName = (type: string) => {
	return {
		Star: '',
		Planet: 'Star',
		Moon: 'Planet',
		Region: 'Planet or Moon',
		Town: 'Planet, Moon, or Region',
		District: 'Region or Town',
		Location: 'Region, Town, District, or Location'
	}[type];
};

export const PLACE_TYPE_OPTIONS = [
	{
		text: 'Star',
		id: 'STAR'
	},
	{
		text: 'Planet',
		id: 'PLANET'
	},
	{
		text: 'Moon',
		id: 'MOON'
	},
	{
		text: 'Region',
		id: 'REGION'
	},
	{
		text: 'Town',
		id: 'TOWN'
	},
	{
		text: 'District',
		id: 'DISTRICT'
	},
	{
		text: 'Location',
		id: 'LOCATION'
	}
] as const;

type PlaceType = 'DISTRICT' | 'LOCATION' | 'MOON' | 'PLANET' | 'REGION' | 'STAR' | 'TOWN';
type PlaceSelectEdge = { node: { id: string; name: string; placeType: string | null } };

export const filterForParent = (placeType: PlaceType) => {
	const parentTypesForChild = {
		STAR: [] as string[],
		PLANET: ['STAR'],
		MOON: ['PLANET'],
		REGION: ['PLANET', 'MOON'],
		TOWN: ['PLANET', 'MOON', 'REGION'],
		DISTRICT: ['REGION', 'TOWN'],
		LOCATION: ['REGION', 'TOWN', 'DISTRICT']
	};
	const parentTypes = parentTypesForChild[placeType];
	return (edge: PlaceSelectEdge) => parentTypes.includes(edge.node.placeType ?? '');
};

export const filterForChildren = (placeType: PlaceType) => {
	const childrenTypesForParent = {
		STAR: ['PLANET'],
		PLANET: ['MOON', 'REGION', 'TOWN'],
		MOON: ['REGION', 'TOWN'],
		REGION: ['TOWN', 'DISTRICT', 'LOCATION'],
		TOWN: ['DISTRICT', 'LOCATION'],
		DISTRICT: ['LOCATION'],
		LOCATION: ['LOCATION']
	};
	const childrenTypes = childrenTypesForParent[placeType];
	return (edge: PlaceSelectEdge) => childrenTypes.includes(edge.node.placeType ?? '');
};

export function getSelectOptionFromEdge({ node }: PlaceSelectEdge) {
	const placeTypeLabel = node.placeType ? ` (${capitalize(node.placeType)})` : '';
	return {
		label: node.name + placeTypeLabel,
		value: node.id
	};
}
