import React, {PureComponent} from 'react';
import {ActivityIndicator, Animated, View} from 'react-native';
import styles from './styles';

export default class BlockIndicator extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			isShow: false,
		};

		this.scale = new Animated.Value(0);
		this.topOffset = new Animated.Value(0);
	}

	componentDidMount() {
		const {animating} = this.props;

		if (animating) {
			this.animateOffset(1);
			this.animateShow();
		}
	}

	componentWillUpdate(nextProps) {
		const {animating} = this.props;
		const nextAnimating = nextProps.animating;

		if (animating && !nextAnimating) {
			this.animateOffset(0);
			this.animateHide();
		}
		if (!animating && nextAnimating) {
			this.animateOffset(1);
			this.animateShow();
		}
	}

	componentWillUnmount() {
		// this.animateOffset(0);
		// this.animateHide();
	}

	animateShow = () => {
		this.setState({isShow: true});

		Animated.timing(this.scale, {
			toValue: 1,
			duration: 200,
			useNativeDriver: true,
		}).start();
	};

	animateHide = () => {
		Animated.timing(this.scale, {
			toValue: 0,
			duration: 200,
			useNativeDriver: true,
		}).start(() => this.setState({isShow: false}));
	};

	animateOffset = toValue => {
		Animated.timing(this.topOffset, {
			toValue,
			duration: 300,
		}).start();
    };
    
    rendIndicator = () => {
        const {indicators,color} =this.props;
       	if(indicators)
           return (indicators?indicators():null);
       
        return (<ActivityIndicator size='large' color={color||'black'}{...this.props} animating />)
    }
    

	render() {
		const {style, isTopAnimating = false, isAbsolut,color,} = this.props;
		const {isShow} = this.state;

		const scale = {
			transform: [
				{
					scale: this.scale.interpolate({
						inputRange: [0, 1],
						outputRange: [0, 1],
					}),
				},
			],
		};
		const opacity = {
			opacity: this.scale.interpolate({
				inputRange: [0, 1],
				outputRange: [0, 0.5],
			}),
		};

		const marginTop = isTopAnimating
			? this.topOffset.interpolate({
					inputRange: [0, 1],
					outputRange: [-56, 0],
			  })
			: 0;

			if (isShow) {
				return (
					<View style={styles.main}>
						<Animated.View style={[styles.background, opacity]} />
						<Animated.View style={[{marginTop, zIndex: -1}, style]}>
							<Animated.View style={[scale]}>
                            {this.rendIndicator()}
							</Animated.View>
						</Animated.View>
					</View>
				);
			}
			return null;
		
	
	}
}

