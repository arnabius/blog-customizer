import { Text } from 'components/text';

import styles from './Button.module.scss';

export type TButtonType = {
	title?: string;
	onClick?: () => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
};

export const Button = ({ title, onClick, type }: TButtonType) => {
	return (
		<button className={styles.button} type={type} onClick={onClick}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
