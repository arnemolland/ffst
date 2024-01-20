"use client";

import { logout } from "@/lib/actions/logout";

interface LogoutButtonProps {
	children?: React.ReactNode;
}

export function LogoutButton({ children }: LogoutButtonProps) {
	return (
		<span onClick={logout} onKeyDown={logout} className="cursor-pointer">
			{children}
		</span>
	);
}
