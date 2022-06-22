export const getParentName = (type: string): string => {
	return {
		Star: '',
		Planet: 'Star',
		Moon: 'Planet',
		Region: 'Planet or Moon',
		Town: 'Planet, Moon, or Region',
		District: 'Region or Town',
		Location: 'Town, District, or Location'
	}[type];
};

export const getChildrenName = (type: string): string => {
	return {
		Star: 'Planets',
		Planet: 'Moons, Regions, or Towns',
		Moon: 'Regions or Towns',
		Region: 'Towns or Districts',
		Town: 'Districts or Locations',
		District: 'Locations',
		Location: 'Locations'
	}[type];
};

export const filterForParent = (placeType) => {
	const typeFilterMap = {
		Star: () => false,
		Planet: ({ node }) => ['Star'].includes(node.placeTypeDisplay),
		Moon: ({ node }) => ['Planet'].includes(node.placeTypeDisplay),
		Region: ({ node }) => ['Planet', 'Moon'].includes(node.placeTypeDisplay),
		Town: ({ node }) => ['Planet', 'Moon', 'Region'].includes(node.placeTypeDisplay),
		District: ({ node }) => ['Region', 'Town'].includes(node.placeTypeDisplay),
		Location: ({ node }) => ['Town', 'District', 'Location'].includes(node.placeTypeDisplay)
	};
	return typeFilterMap[placeType] || (() => false);
};

export const filterForChildren = (placeType) => {
	const typeFilterMap = {
		Star: ({ node }) => ['Planets'].includes(node.placeTypeDisplay),
		Planet: ({ node }) => ['Moons', 'Regions', 'Towns'].includes(node.placeTypeDisplay),
		Moon: ({ node }) => ['Regions', 'Towns'].includes(node.placeTypeDisplay),
		Region: ({ node }) => ['Towns', 'Districts'].includes(node.placeTypeDisplay),
		Town: ({ node }) => ['Districts', 'Locations'].includes(node.placeTypeDisplay),
		District: ({ node }) => ['Locations'].includes(node.placeTypeDisplay),
		Location: ({ node }) => ['Locations'].includes(node.placeTypeDisplay)
	};
	return typeFilterMap[placeType] || (() => false);
};
