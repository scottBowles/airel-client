export const getParentName = (type: string): string => {
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

export const getChildrenName = (type: string): string => {
	return {
		Star: 'Planets',
		Planet: 'Moons, Regions, or Towns',
		Moon: 'Regions or Towns',
		Region: 'Towns, Districts, or Locations',
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
		Location: ({ node }) =>
			['Region', 'Town', 'District', 'Location'].includes(node.placeTypeDisplay)
	};
	return typeFilterMap[placeType] || (() => false);
};

export const filterForChildren = (placeType) => {
	const typeFilterMap = {
		Star: ({ node }) => ['Planet'].includes(node.placeTypeDisplay),
		Planet: ({ node }) => ['Moon', 'Region', 'Town'].includes(node.placeTypeDisplay),
		Moon: ({ node }) => ['Region', 'Town'].includes(node.placeTypeDisplay),
		Region: ({ node }) => ['Town', 'District', 'Location'].includes(node.placeTypeDisplay),
		Town: ({ node }) => ['District', 'Location'].includes(node.placeTypeDisplay),
		District: ({ node }) => ['Location'].includes(node.placeTypeDisplay),
		Location: ({ node }) => ['Location'].includes(node.placeTypeDisplay)
	};
	return typeFilterMap[placeType] || (() => false);
};
