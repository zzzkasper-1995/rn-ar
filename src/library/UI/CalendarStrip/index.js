import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	FlatList,
	Platform,
	Dimensions,
	StyleSheet,
	PanResponder,
	TouchableOpacity,
} from 'react-native';
import {
	addDays,
	subDays,
	eachDay,
	isFuture,
	isSameDay,
	endOfWeek,
	startOfWeek,
	differenceInDays,
} from 'date-fns';
import Weeks from './Weeks';
import DateItem from './DateItem';

import styles from './styles';

const {width} = Dimensions.get('window');
const ITEM_LENGTH = width / 7;
const _today = new Date();
const _year = _today.getFullYear();
const _month = _today.getMonth();
const _day = _today.getDate();
const TODAY = new Date(_year, _month, _day); // FORMAT: Wed May 16 2018 00:00:00 GMT+0800 (CST)

class CalendarStrip extends Component {
	constructor(props) {
		super(props);
		this.state = {
			datas: this.getInitialDates(),
			pageOfToday: 2, // page of today in calendar, start from 0
			currentPage: 2, // current page in calendar,  start from 0
		};
	}

	componentWillReceiveProps(nextProps) {
		if (
			nextProps.selectedDate &&
			this.props.selectedDate &&
			isSameDay(nextProps.selectedDate, this.props.selectedDate)
		)
			return;
		const nextSelectedDate = nextProps.selectedDate || TODAY;
		if (!this.currentPageDatesIncludes(nextSelectedDate)) {
			const sameDay = d => isSameDay(d, nextSelectedDate);
			if (this.state.datas.find(sameDay)) {
				let selectedIndex = this.state.datas.findIndex(sameDay);
				if (selectedIndex === -1) selectedIndex = this.state.pageOfToday; // in case not find
				const selectedPage = ~~(selectedIndex / 7);
				this.scrollToPage(selectedPage);
			} else {
				// not born, then spawn these dates, then scroll to it.
				// past: born [startOfThatWeek, last]
				// future: born [first, endOfThatWeek]
				// momentumEnd() handle pageOfToday and currentPage
				if (isFuture(nextSelectedDate)) {
					const head = this.state.datas[0];
					const tail = endOfWeek(nextSelectedDate);
					const days = eachDay(head, tail);
					this.setState(
						{
							datas: days,
							isTodayVisible: false,
						},
						() => {
							const page = ~~(days.length / 7 - 1);
							// to last page
							this.scrollToPage(page);
						},
					);
				} else {
					const head = startOfWeek(nextSelectedDate);
					const tail = this.state.datas[this.state.datas.length - 1];
					const days = eachDay(head, tail);
					this.setState(
						{
							datas: days,
							isTodayVisible: false,
						},
						() => {
							// to first page
							this.scrollToPage(0);
						},
					);
				}
			}
		}
	}

	scrollToPage = (page, animated = true) => {
		this._calendar.scrollToIndex({animated, index: 7 * page});
	};

	currentPageDatesIncludes = date => {
		const {currentPage} = this.state;
		const currentPageDates = this.state.datas.slice(7 * currentPage, 7 * (currentPage + 1));
		// dont use currentPageDates.includes(date); because can't compare Date in it
		return !!currentPageDates.find(d => isSameDay(d, date));
	};

	getInitialDates() {
		// const todayInWeek = getDay(TODAY);
		const last2WeekOfToday = subDays(TODAY, 7 * 2);
		const next2WeekOfToday = addDays(TODAY, 7 * 2);
		const startLast2Week = startOfWeek(last2WeekOfToday);
		const endNext2Week = endOfWeek(next2WeekOfToday);
		const eachDays = eachDay(startLast2Week, endNext2Week);
		return eachDays;
	}

	loadNextMonth(originalDates) {
		const originalFirstDate = originalDates[0];
		const originalLastDate = originalDates[originalDates.length - 1];
		const lastDayOfNext2Week = addDays(originalLastDate, 7 * 4);
		const eachDays = eachDay(originalFirstDate, lastDayOfNext2Week);
		this.setState({datas: eachDays});
	}

	loadPreviousTwoWeek(originalDates) {
		const originalFirstDate = originalDates[0];
		const originalLastDate = originalDates[originalDates.length - 1];
		const firstDayOfPrevious2Week = subDays(originalFirstDate, 7 * 2);
		const eachDays = eachDay(firstDayOfPrevious2Week, originalLastDate);
		this.setState(
			prevState => ({
				datas: eachDays,
				currentPage: prevState.currentPage + 2,
				pageOfToday: prevState.pageOfToday + 2,
			}),
			() => {
				this.scrollToPage(2, false);
			},
		);
	}

	_stringToDate = dateString => {
		// '2018-01-01' => Date
		const dateArr = dateString.split('-');
		const [y, m, d] = dateArr.map(ds => parseInt(ds, 10));
		// CAVEAT: Jan is 0
		return new Date(y, m - 1, d);
	};

	render() {
		// console.log(this);
		const {region, markedDate, onPressDate, selectedDate, isDisableOldDate} = this.props;
		const marked = markedDate.map(ds => this._stringToDate(ds));

		return (
			<View style={styles.container}>
				<Weeks region={region} width={width} />
				<FlatList
					ref={ref => (this._calendar = ref)}
					bounces={false}
					horizontal
					pagingEnabled
					initialScrollIndex={14}
					showsHorizontalScrollIndicator={false}
					onMomentumScrollEnd={this.momentumEnd}
					scrollEventThrottle={width || ITEM_LENGTH * 7}
					getItemLayout={(data, index) => ({
						length: ITEM_LENGTH,
						offset: ITEM_LENGTH * index,
						index,
					})}
					onEndReached={() => {
						this.onEndReached();
					}}
					onEndReachedThreshold={0.01}
					data={this.state.datas}
					extraData={this.state}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({item}) => (
						<DateItem
							isDisableOldDate={isDisableOldDate}
							item={item}
							onItemPress={() => {
								onPressDate && onPressDate(item);
							}}
							highlight={selectedDate && isSameDay(selectedDate, item)}
							marked={marked.find(d => isSameDay(d, item))}
						/>
					)}
				/>
			</View>
		);
	}

	momentumEnd = event => {
		/**
      {
        contentInset: { bottom: 0, top: 0, left: 0, right: 0 },
        zoomScale: 1,
        contentOffset: { y: 0, x: 1875 },
        layoutMeasurement: { height: 50, width: 375 },
        contentSize: { height: 50, width: 2625 }
      }
    */
		const firstDayInCalendar = this.state.datas ? this.state.datas[0] : new Date();
		const daysBeforeToday = differenceInDays(firstDayInCalendar, new Date());
		const pageOfToday = ~~Math.abs(daysBeforeToday / 7);
		const screenWidth = event.nativeEvent.layoutMeasurement.width;
		const currentPage = event.nativeEvent.contentOffset.x / screenWidth;
		this.setState({
			pageOfToday,
			currentPage,
			isTodayVisible: currentPage === pageOfToday,
		});

		// swipe to head ~ load 2 weeks
		if (event.nativeEvent.contentOffset.x < width) {
			this.loadPreviousTwoWeek(this.state.datas);
		}
	};

	onEndReached() {
		this.loadNextMonth(this.state.datas);
	}
}

CalendarStrip.propTypes = {
	selectedDate: PropTypes.any,
	onPressDate: PropTypes.func,
	onPressGoToday: PropTypes.func,
	markedDate: PropTypes.array,
	onSwipeDown: PropTypes.func,
	region: PropTypes.bool,
	showWeekNumber: PropTypes.bool,
	showChineseLunar: PropTypes.bool,
	width: PropTypes.number,
};

CalendarStrip.defaultProps = {
	region: false,
	showWeekNumber: false,
	showChineseLunar: false,
	markedDate: [],
	width: undefined,
};

export {CalendarStrip};
