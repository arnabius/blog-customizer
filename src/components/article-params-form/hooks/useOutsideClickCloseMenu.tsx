import { useEffect } from 'react';

export type UseOutsideClickCloseMenu = {
	isMenuOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideClickCloseMenu = ({
	isMenuOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideClickCloseMenu) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				onChange?.(false);
				if (isMenuOpen) {
					onClose?.();
				}
			}
		};

		window.addEventListener('click', handleClick);

		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, [onClose, onChange, isMenuOpen]);
};
