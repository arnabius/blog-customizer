import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef, SyntheticEvent } from 'react';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Select } from '../select';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useOutsideClickCloseMenu } from './hooks/useOutsideClickCloseMenu';

export type ArticleParamsFormProps = {
	onFinish?: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onFinish }: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(() => ({
		...defaultArticleState,
	}));
	const rootRef = useRef<HTMLDivElement>(null);

	const onClickArrowBtn = (
		event: SyntheticEvent<HTMLDivElement, MouseEvent>
	) => {
		event.preventDefault();
		event.stopPropagation();
		setIsMenuOpen(!isMenuOpen);
	};

	const onClose = () => {
		setIsMenuOpen(false);
	};

	const onChange = (value: boolean) => {
		setIsMenuOpen(value);
	};

	useOutsideClickCloseMenu({
		isMenuOpen,
		rootRef,
		onClose,
		onChange,
	});

	const asideStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: isMenuOpen,
	});

	const changeFormValue = (
		name: keyof ArticleStateType,
		option: OptionType
	) => {
		setFormState((prev) => ({
			...prev,
			[name]: option,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (onFinish) {
			onFinish(formState);
		}
	};

	const handleReset = () => {
		const newFormState = {
			...defaultArticleState,
		};
		setFormState(newFormState);
		if (onFinish) {
			onFinish(newFormState);
		}
	};

	const getChanger = (name: keyof ArticleStateType) => {
		return (option: OptionType) => {
			changeFormValue(name, option);
		};
	};

	return (
		<>
			<ArrowButton onClick={onClickArrowBtn} isMenuOpen={isMenuOpen} />
			<aside className={asideStyle} ref={rootRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={getChanger('fontFamilyOption')}
					/>

					<RadioGroup
						title='Размер шрифта'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						name='fontSize'
						onChange={getChanger('fontSizeOption')}
					/>

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={getChanger('fontColor')}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={getChanger('backgroundColor')}
					/>

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={getChanger('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
