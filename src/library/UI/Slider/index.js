/* eslint-disable class-methods-use-this */
import React from 'react';
import {Animated} from 'react-native';
import Styles from './styles';
import {View} from '../View';
import {BindSimple} from '../../Component';
import Circle from './Circle';

class Slider extends React.PureComponent {
	constructor(props) {
		super(props);

		BindSimple(this, {
			styles: Styles,
		});

		this.animatedValue = new Animated.Value(0);
	}

	render() {
		// console.log('Slider', this.props);
		const {styles, props} = this;
		const {data = [], Screen = null, TabBar, keyExtractor, style = {}} = props;

		return (
			<View style={style}>
				<Animated.ScrollView
					ref={ref => (this.scroll = ref)}
					data={data}
					horizontal
					bounces={false}
					snapToInterval={styles.size.width}
					snapToAlignment='start'
					decelerationRate='fast'
					onScroll={Animated.event([{nativeEvent: {contentOffset: {x: this.animatedValue}}}], {
						useNativeDriver: true,
					})}
					showsHorizontalScrollIndicator={false}
				>
					{(data || []).map((item, index) => (
						<View style={styles.item} key={keyExtractor ? keyExtractor(item, index) : item.id}>
							{Screen && Screen(item)}
						</View>
					))}
				</Animated.ScrollView>
				{(TabBar && TabBar(data)) ||
					(data.length > 1 && (
						<View
							style={{
								position: 'absolute',
								bottom: 60,
								left: 0,
								right: 0,
								alignItems: 'center',
								justifyContent: 'center',
								flexDirection: 'row',
							}}
						>
							{data.map((item, index) => (
								<Circle
									index={index}
									animatedValue={this.animatedValue}
									width={styles.size.width}
									key={index}
								/>
							))}
						</View>
					))}
			</View>
		);
	}
}

export {Slider};
