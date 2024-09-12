import type { Meta, StoryObj } from '@storybook/react';
//import { TClick } from '../ArrowButton';

import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStory: Story = {
	args: {
		//onClick: () => {};
	},

	render: () => {
		return (
			<>
				<ArrowButton />
			</>
		);
	},
};
