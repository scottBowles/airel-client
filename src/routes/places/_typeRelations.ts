export const getParentName = (type: string): string => {
	return {
		Star: '',
		Planet: 'Star',
		Moon: 'Planet',
		Region: 'Planet or Moon',
		Town: 'Region',
		District: 'Town',
		Location: 'District or Location'
	}[type];
};

export const getChildrenName = (type: string): string => {
	return {
		Star: 'Planets',
		Planet: 'Moons and Regions',
		Moon: 'Regions',
		Region: 'Towns',
		Town: 'Districts',
		District: 'Locations',
		Location: 'Locations'
	}[type];
};

export const filterForParent = (placeType) => {
	const typeFilterMap = {
		Star: () => false,
		Planet: ({ node }) => node.placeTypeDisplay === 'Star',
		Moon: ({ node }) => node.placeTypeDisplay === 'Planet',
		Region: ({ node }) => node.placeTypeDisplay === 'Planet' || node.placeTypeDisplay === 'Moon',
		Town: ({ node }) => node.placeTypeDisplay === 'Region',
		District: ({ node }) => node.placeTypeDisplay === 'Town',
		Location: ({ node }) =>
			node.placeTypeDisplay === 'District' || node.placeTypeDisplay === 'Location'
	};
	return typeFilterMap[placeType] || (() => false);
};

export const filterForChildren = (placeType) => {
	const typeFilterMap = {
		Star: ({ node }) => node.placeTypeDisplay === 'Planet',
		Planet: ({ node }) => node.placeTypeDisplay === 'Region',
		Moon: ({ node }) => node.placeTypeDisplay === 'Region',
		Region: ({ node }) => node.placeTypeDisplay === 'Town',
		Town: ({ node }) => node.placeTypeDisplay === 'District',
		District: ({ node }) => node.placeTypeDisplay === 'Location',
		Location: ({ node }) => node.placeTypeDisplay === 'Location'
	};
	return typeFilterMap[placeType] || (() => false);
};
