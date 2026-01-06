import setLogin from "@/src/api/login";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { createContext, ReactNode, use, useEffect, useState } from "react";
import api from "../api/axios";

interface AuthState {
	token: string | null;
	authenticated: boolean;
	email: string;
	id: string;
	tipo: string;
}

interface AuthContextType {
	authState: AuthState;
	logIn: (email: string, password: string) => Promise<boolean>;
	logOut: () => Promise<void>;
	loading: boolean;
}

const TOKEN_KEY = "eduPost";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
	const value = use(AuthContext);
	if (!value) {
		throw new Error("useSession must be wrapped in a <SessionProvider />");
	}

	return value;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [loading, setLoading] = useState(false);
	const [authState, setAuthState] = useState<AuthState>({
		token: null,
		authenticated: false,
		email: "",
		id: "",
		tipo: "",
	});

	useEffect(() => {
		const loadAuthState = async () => {
			try {
				const storeToken = await getItemAsync(TOKEN_KEY);
				if (storeToken) {
					const jsonToken: AuthState = JSON.parse(storeToken);

					setAuthState(jsonToken);
					api.defaults.headers.common[
						"Authorization"
					] = `Bearer ${jsonToken.token}`;
				}
			} catch (err) {
				const msg =
					(err as any)?.response?.data?.msg ??
					(err as any)?.message ??
					"Unknown error";
				console.error("loadAuthState error:", msg, err);
				return { error: true, msg };
			} finally {
				setLoading(false);
			}
		};
		loadAuthState();
	}, []);

	const logIn = async (email: string, password: string) => {
		const response = await setLogin(email, password);

		if (response) {
			const authenticatedData = {
				token: response.token,
				authenticated: true,
				email: response.usuario.email,
				id: response.usuario.id,
				tipo: response.usuario.tipo,
			};
			await setItemAsync(TOKEN_KEY, JSON.stringify(authenticatedData));
			setAuthState(authenticatedData);

			api.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;

			return true;
		}

		return false;
	};

	const logOut = async () => {
		await deleteItemAsync(TOKEN_KEY);
		setAuthState({
			token: null,
			authenticated: false,
			email: "",
			id: "",
			tipo: "",
		});
		api.defaults.headers.common["Authorization"] = "";
	};

	return (
		<AuthContext.Provider value={{ authState, logIn, logOut, loading }}>
			{children}
		</AuthContext.Provider>
	);
};
