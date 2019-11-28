import React from 'react';
import {View, Text, Dimensions} from 'react-native';

const WIDTH_SCREEN = Dimensions.get('window').width;
const WEEK = {
	isChinese: ['日', '一', '二', '三', '四', '五', '六'],
	isRussian: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
	isEnglish: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

export default ({region}) => {
	const weekLocalized = WEEK[region] ? WEEK[region] : WEEK.isRussian;

	return (
		<View
			style={{
				width: WIDTH_SCREEN,
				height: 30,
				flexDirection: 'row',
			}}
		>
			{weekLocalized.map(day => (
				<View
					style={{
						flex: 1,
						height: '100%',
						alignItems: 'center',
						justifyContent: 'center',
					}}
					key={day}
				>
					<Text
						style={{
							color: 'rgb(34,34,34)',
							fontSize: 12,
							opacity: 0.25,
							fontWeight: '500',
						}}
					>
						{day.toUpperCase()}
					</Text>
				</View>
			))}
		</View>
	);
};
