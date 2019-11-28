import {registerComponent, Navigation} from './core/navigation';
import {OnboardingScreen, PlaygroundScreen, IndicatorsScreen, MainScreen} from './modules';
import {AppScreen} from './core/app';
import {Offline, Fab, BlurOverlay} from './simple';
import {settingsDefault, rootLoadApp} from './routes';
import {ArSceneScreen} from './modules/ArScene';

/** Инициализация модулей */
function initModules() {
	// простые компоненты
	registerComponent('blurOverlay', BlurOverlay); // Слой размытия для режима в фоне
	registerComponent('fab', Fab); // фаб меню
	registerComponent('offline', Offline); // планка оффлайн режима
	// умные компоненты
	registerComponent('main', MainScreen);
	registerComponent('indicators', IndicatorsScreen);
	registerComponent('playground', PlaygroundScreen);
	registerComponent('arScene', ArSceneScreen);
	registerComponent('onboarding', OnboardingScreen);
	registerComponent('initApp', AppScreen);
}

/** Инициализация дерева навигаци */
function initRoutes() {
	Navigation.events().registerAppLaunchedListener(() => {
		Navigation.setDefaultOptions(settingsDefault);
		Navigation.setRoot(rootLoadApp);
	});
}

/** Точка входа */
export default function runApp() {
	initModules();
	initRoutes();
}
