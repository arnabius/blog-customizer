import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [pageState, setPageState] = useState<ArticleStateType>(() => ({
		...defaultArticleState,
	}));

	const handleFormFinish = (formState: ArticleStateType): void => {
		setPageState({
			...formState,
		});
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageState.fontFamilyOption.value,
					'--font-size': pageState.fontSizeOption.value,
					'--font-color': pageState.fontColor.value,
					'--bg-color': pageState.backgroundColor.value,
					'--container-width': pageState.contentWidth.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onFinish={handleFormFinish} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
