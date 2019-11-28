/* eslint-disable class-methods-use-this */
import React from 'react';
import {Animated, Dimensions} from 'react-native';
import Styles from './styles';
import {View} from '../../View';
import {BindSimple} from '../../../Component';
import Circle from './Circle';
import {Utils} from '../../../Utils';
import {ActivityIndicator} from '../../ActivityIndicators';

const {width} = Dimensions.get('window');

class TabNavigator extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			number: 0,
			properties: {},
			isShow: !props.late, // отображать навигатор или нет
		};

		BindSimple(this, {
			styles: Styles,
		});
		this.animatedValue = new Animated.Value(0);
		this.width = width;
	}

	componentDidMount() {
		this.setState({isShow: true});
	}

	nextScreen(properties) {
		// console.log('nextScreen', properties, this);
		const {styles, props} = this;
		const {number} = this.state;
		const {screens = {}, onNavigation = () => {}} = props;

		const length = Utils.objectToArray(screens).length - 1;
		let num = number + 1;
		num = num > length ? length : num;

		this.scroll.getNode().scrollTo({x: num * styles.size.width, animated: true});
		this.setState({number: num, properties});
		onNavigation(num, Utils.objectToArray(screens)[num]);
	}

	prevScreen(properties) {
		const {styles, props} = this;
		const {number} = this.state;
		const {screens = {}, onNavigation = () => {}} = props;

		let num = number - 1;
		num = num > 0 ? num : 0;

		this.scroll.getNode().scrollTo({x: num * styles.size.width, animated: true});
		this.setState({number: num, props: properties});
		onNavigation(num, Utils.objectToArray(screens)[num]);
	}

	render() {
		// console.log('TabNav', this.props, this.state);
		const {styles, props, state} = this;
		const {properties, number, isShow} = state;
		const {
			screens = {},
			TabBar,
			style = {},
			swipeEnabled,
			initialRouteName,
			maxScreen,
			late,
		} = props;

		let tabBar = screen => (
			<View style={styles.tabBar}>
				{Utils.objectToArray(screens).map((item, index) => (
					<Circle
						index={index}
						animatedValue={this.animatedValue}
						width={styles.size.width}
						key={index}
					/>
				))}
			</View>
		);
		if (TabBar === null) {
			tabBar = () => null;
		}
		if (TabBar) {
			tabBar = TabBar;
		}

		return (
			<View style={{flex: 1, ...style}}>
				{isShow ? (
					<Animated.ScrollView
						ref={ref => (this.scroll = ref)}
						horizontal
						bounces={false}
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
						snapToInterval={styles.size.width}
						snapToAlignment='start'
						decelerationRate='fast'
						scrollEnabled={swipeEnabled}
						onScroll={Animated.event([{nativeEvent: {contentOffset: {x: this.animatedValue}}}], {
							useNativeDriver: true,
						})}
						style={styles.scroll}
						contentContainerStyle={styles.content}
					>
						{Utils.objectToArray(screens).map((item, index) => {
							if (item.screen) {
								// фрагменты расположенный дальше чем maxScreen от текущего экрана не будут отрисованы
								if (item.importantScreen || !maxScreen || Math.abs(index - number) > maxScreen) {
									return (
										<View key={item.id} style={styles.size}>
											{item.screen({
												nav: {
													next: this.nextScreen.bind(this),
													prev: this.prevScreen.bind(this),
													properties,
												},
											})}
										</View>
									);
								}
								return <View key={item.id} style={styles.size} />;
							}
							return null;
						})}
					</Animated.ScrollView>
				) : (
					<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
						<ActivityIndicator animated />
					</View>
				)}

				{tabBar(screens)}
			</View>
		);
	}
}

export {TabNavigator as ScrollTab};
