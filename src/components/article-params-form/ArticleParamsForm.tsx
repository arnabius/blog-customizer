import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState } from 'react';

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

export type ArticleParamsFormProps = {
	onFinish?: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onFinish }: ArticleParamsFormProps) => {
	const [isOpen, setOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(() => ({
		...defaultArticleState,
	}));

	const toggle = () => {
		isOpen ? setOpen(false) : setOpen(true);
	};

	const asideStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen,
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
			<ArrowButton onClick={toggle} isOpen={isOpen} />
			{isOpen && (
				<aside className={asideStyle}>
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
			)}
		</>
	);
};
