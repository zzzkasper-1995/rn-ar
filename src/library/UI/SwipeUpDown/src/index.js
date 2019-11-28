// https://github.com/react-native-vietnam/react-native-swipe-up-down
import React, {Component} from 'react';
import {
	Platform,
	StyleSheet,
	View,
	PanResponder,
	Dimensions,
	LayoutAnimation,
	TouchableOpacity,
} from 'react-native';

import SwipeIcon from './components/SwipeIcon';
import images from './assets/images';
import {Log} from '../../../Log';

const MARGIN_TOP = Platform.OS === 'ios' ? 20 : 0;
const DEVICE_HEIGHT = Dimensions.get('window').height - MARGIN_TOP;
type Props = {
	hasRef?: () => void,
	swipeHeight?: number,
	itemMini?: Function,
	itemFull: Function,
	disablePressToShow?: boolean,
	style?: object,
	onShowMini?: () => void,
	onShowFull?: () => void,
	animation?: 'linear' | 'spring' | 'easeInEaseOut' | 'none',
	topDragHeight?: number,
	initCollapsed?: Boolean,
};

export default class SwipeUpDown extends Component<Props> {
	static defautProps = {
		disablePressToShow: false,
		topDragHeight: 0,
		itemMini: undefined,
		initCollapsed: true,
	};

	constructor(props) {
		super(props);
		this.state = {
			collapsed: props.initCollapsed,
		};
		this.disablePressToShow = props.disablePressToShow;
		this.SWIPE_HEIGHT = props.swipeHeight || 60;
		this._panResponder = null;
		this.top = this.SWIPE_HEIGHT;
		this.height = this.SWIPE_HEIGHT;
		this.customStyle = {
			style: {
				bottom: 0,
				top: this.top,
				height: this.height,
			},
		};
		this.checkCollapsed = true;
		this.showFull = this.showFull.bind(this);
	}

	componentWillMount() {
		this._panResponder = PanResponder.create({
			onMoveShouldSetPanResponder: (event, gestureState) => true,
			onPanResponderMove: this._onPanResponderMove.bind(this),
			onPanResponderRelease: this._onPanResponderRelease.bind(this),
		});
	}

	componentDidMount() {
		this.props.hasRef && this.props.hasRef(this);
	}

	getPan = () => {
		return this._panResponder.panHandlers;
	};

	showFull() {
		const {onShowFull} = this.props;
		this.customStyle.style.top = 0;
		this.customStyle.style.height = DEVICE_HEIGHT;
		this.swipeIconRef && this.swipeIconRef.setState({icon: images.arrow_down, showIcon: true});
		this.updateNativeProps();
		this.state.collapsed && this.setState({collapsed: false});
		this.checkCollapsed = false;
		onShowFull && onShowFull();
	}

	showMini() {
		const {onShowMini, itemMini} = this.props;
		this.customStyle.style.top = itemMini ? DEVICE_HEIGHT - this.SWIPE_HEIGHT : DEVICE_HEIGHT;
		this.customStyle.style.height = itemMini ? this.SWIPE_HEIGHT : 0;
		this.swipeIconRef && this.swipeIconRef.setState({showIcon: false});
		this.updateNativeProps();
		!this.state.collapsed && this.setState({collapsed: true});
		this.checkCollapsed = true;
		onShowMini && onShowMini();
	}

	_onPanResponderRelease(event, gestureState) {
		if (gestureState.dy < -100 || gestureState.dy < 100) {
			this.showFull();
		} else {
			this.showMini();
		}
	}

	_onPanResponderMove(event, gestureState) {
		if (gestureState.dy > 0 && !this.checkCollapsed) {
			// SWIPE DOWN

			this.customStyle.style.top = this.top + gestureState.dy;
			this.customStyle.style.height = DEVICE_HEIGHT - gestureState.dy;
			this.swipeIconRef && this.swipeIconRef.setState({icon: images.minus});
			// !this.state.collapsed && this.setState({ collapsed: true });
			this.updateNativeProps();
		} else if (this.checkCollapsed && gestureState.dy < -60) {
			// SWIPE UP
			this.top = 0;
			this.customStyle.style.top = DEVICE_HEIGHT + gestureState.dy;
			this.customStyle.style.height = -gestureState.dy + this.SWIPE_HEIGHT;
			this.swipeIconRef && this.swipeIconRef.setState({icon: images.minus, showIcon: true});
			if (this.customStyle.style.top <= DEVICE_HEIGHT / 2) {
				this.swipeIconRef &&
					this.swipeIconRef.setState({
						icon: images.arrow_down,
						showIcon: true,
					});
			}
			this.updateNativeProps();
			this.state.collapsed && this.setState({collapsed: false});
		}
	}

	updateNativeProps() {
		switch (this.props.animation) {
			case 'linear':
				LayoutAnimation.linear();
				break;
			case 'spring':
				LayoutAnimation.spring();
				break;
			case 'easeInEaseOut':
				LayoutAnimation.easeInEaseOut();
				break;
			case 'none':
			default:
				break;
		}
		this.viewRef.setNativeProps(this.customStyle);
	}

	render() {
		// Log('SwipeUpDown', this.state, this.props);
		const {itemMini, itemFull, style, topDragHeight} = this.props;
		const {collapsed} = this.state;
		return (
			<View
				ref={ref => (this.viewRef = ref)}
				style={[
					styles.wrapSwipe,
					{
						height: this.SWIPE_HEIGHT,
						marginTop: MARGIN_TOP,
						backgroundColor: 'red',
					},
					!itemMini && collapsed && {marginBottom: -200},
					style,
				]}
			>
				<TouchableOpacity
					style={{height: topDragHeight}}
					{...this._panResponder.panHandlers}
					onPressOut={() => this.showMini()}
				/>
				<SwipeIcon onClose={() => this.showMini()} hasRef={ref => (this.swipeIconRef = ref)} />
				{collapsed ? (
					<TouchableOpacity
						activeOpacity={this.disablePressToShow ? 1 : 0.6}
						style={{height: this.SWIPE_HEIGHT}}
						onPress={() => !this.disablePressToShow && this.showFull()}
					>
						{itemMini && itemMini()}
					</TouchableOpacity>
				) : (
					itemFull(this._panResponder.panHandlers)
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	wrapSwipe: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		top: 0,
	},
});
