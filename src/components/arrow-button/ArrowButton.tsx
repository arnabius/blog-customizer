import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { ReactElement } from 'react';
import clsx from 'clsx';

// Функция для обработки открытия/закрытия формы
export type OnClick = () => void;

export type TClick = {
	isOpen?: boolean;
	onClick?: () => void;
	className?: string;
};

export const ArrowButton = (props: TClick): ReactElement => {
	const buttonStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: props.isOpen,
	});

	const imgStyle = clsx({
		[styles.arrow]: true,
		[styles.arrow_open]: props.isOpen,
	});

	return (
		// Не забываем указывать role и aria-label атрибуты для интерактивных элементов
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={buttonStyle}
			onClick={props.onClick}>
			<img src={arrow} alt='иконка стрелочки' className={imgStyle} />
		</div>
	);
};
