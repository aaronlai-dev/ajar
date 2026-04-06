import type { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type AuthenticatedState = {
	isAuthenticated: true;
	user: User;
	session: Session;
	userId: string;
	isLoading: boolean;
	signOut: () => Promise<void>;
};

type UnauthenticatedState = {
	isAuthenticated: false;
	user: null;
	session: null;
	userId: null;
	isLoading: boolean;
	signOut: () => Promise<void>;
};

type AuthState = AuthenticatedState | UnauthenticatedState;

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<Session | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setUser(session?.user ?? null);
			setIsLoading(false);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setUser(session?.user ?? null);
			setIsLoading(false);
		});

		return () => subscription.unsubscribe();
	}, []);

	const signOut = async () => {
		await supabase.auth.signOut();
	};

	const value: AuthState =
		session && user
			? {
					isAuthenticated: true as const,
					user,
					session,
					userId: user.id,
					isLoading,
					signOut,
				}
			: {
					isAuthenticated: false as const,
					user: null,
					session: null,
					userId: null,
					isLoading,
					signOut,
				};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export const useAuthenticatedUser = (): AuthenticatedState => {
	const context = useAuth();

	if (!context.isAuthenticated) {
		throw new Error(
			"useAuthenticatedUser must only be called in authenticated screens",
		);
	}

	return context;
};
