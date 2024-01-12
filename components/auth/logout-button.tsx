"use client";

import { logout } from "@/lib/actions/logout";

interface LogoutButtonProps {
	children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
	const onClick = () => {
		logout();
	};

	return (
		<span onClick={onClick} onKeyDown={onClick} className="cursor-pointer">
			{children}
		</span>
	);
};
