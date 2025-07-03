class ThemeState {
	value = $state('dark');

	constructor(init = 'dark') {
		this.value = init;
	}
}

export default ThemeState;
