import React from 'react';
import Styles from './styles';
import {Text, View, BindComponent, Button, Spacer, I, Icon, Log, Image} from '../../../library';

let theme = '';

export default class Screen extends React.PureComponent {
	constructor(props) {
		super(props);

		BindComponent(this, {
			styles: Styles,
			statusBar: 'hide',
		});
	}

	componentDidMount() {
		const {setPropsWix} = this;
		setPropsWix({appInit: 'one'});
	}

	render() {
		const {styles, props, propsWix} = this;
		const {onOpenOnboarding, onOpenPlayground, onOpenIndicators, onOpenAR} = props;

		return (
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Image name='WAIT_CONFIRM' style={styles.imageGif} resizeMode='cover' />
				<Icon vector name='star' size={30} color={styles.colorIcon} />
				<Image
					isFast
					// name='BANNER'
					uri={{
						uri:
							'https://avatars.mds.yandex.net/get-pdb/224945/f358b199-97c2-45f4-a565-433a62935ec6/s375',
					}}
				/>
				<Text i18n>Hello, I am initScreen</Text>
				<Spacer h={5} />
				<Button full onAction={onOpenAR} text='Open AR' color={styles.colorBtn} />
				<Spacer h={5} />
				<Button full onAction={onOpenOnboarding} text='Open Onboarding' color={styles.colorBtn} />
				<Spacer h={5} />
				<Button full onAction={onOpenPlayground} text='Open Playground' color={styles.colorBtn} />
				<Spacer h={5} />
				<Button
					full
					onAction={() => {
						if (theme === '') {
							theme = 'black';
						} else {
							theme = '';
						}
						this.updateTheme(theme);
					}}
					text='Update Theme'
				/>
				<Spacer h={5} />
				<Button
					full
					onAction={() => {
						I.printNotFound();
					}}
					text='PrintNotFountI18n'
					color={styles.colorBtn}
				/>
				<Spacer h={5} />
				<Button full onAction={onOpenIndicators} text='Indicators' color={styles.colorBtn} />
				<Spacer h={5} />
				<Button full onAction={() => Log(propsWix)} text='PropsWix' color={styles.colorBtn} />
			</View>
		);
	}
}
