import { capitalize } from '$lib/utils';

export const getChildrenName = (type: string | null) => {
	const mapping = {
		STAR: 'Planets',
		PLANET: 'Moons, Regions, Towns, Districts, or Locations',
		MOON: 'Regions, Towns, Districts, or Locations',
		REGION: 'Towns, Districts, or Locations',
		TOWN: 'Districts or Locations',
		DISTRICT: 'Locations',
		LOCATION: 'Locations'
	};

	if (type && type.toUpperCase() in mapping) {
		return mapping[type.toUpperCase() as keyof typeof mapping];
	}

	return 'Children';
};

export const getParentName = (type: string) => {
	return (
		{
			STAR: '',
			PLANET: 'Star',
			MOON: 'Planet',
			REGION: 'Planet or Moon',
			TOWN: 'Planet, Moon, or Region',
			DISTRICT: 'Planet, Moon, Region or Town',
			LOCATION: 'Planet, Moon, Region, Town, District, or Location'
		}[type.toUpperCase()] ?? 'Parent'
	);
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
		DISTRICT: ['PLANET', 'MOON', 'REGION', 'TOWN'],
		LOCATION: ['PLANET', 'MOON', 'REGION', 'TOWN', 'DISTRICT', 'LOCATION']
	};
	const parentTypes = parentTypesForChild[placeType];
	return (edge: PlaceSelectEdge) => parentTypes.includes(edge.node.placeType ?? '');
};

export const filterForChildren = (placeType: PlaceType) => {
	const childrenTypesForParent = {
		STAR: ['PLANET'],
		PLANET: ['MOON', 'REGION', 'TOWN', 'DISTRICT', 'LOCATION'],
		MOON: ['REGION', 'TOWN', 'DISTRICT', 'LOCATION'],
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

export const idFromEdge = <T extends { node: { id: string } }>(edge: T) => edge.node.id;
