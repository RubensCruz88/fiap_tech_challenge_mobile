import { ErrorToast, SuccessToast } from "react-native-toast-message";

export const toastConfig = {
	success: (props: any) => (
		<SuccessToast
		{...props}
		contentContainerStyle={{
			paddingHorizontal: 16,
			paddingVertical: 12,
		}}
		text1Style={{
			fontSize: 15,
			fontWeight: "bold"
		}}
		text2Style={{
			fontSize: 13,
			color: "#444",
			flexWrap: "wrap"
		}}
		/>
	),
	error: (props: any) => (
		<ErrorToast
		{...props}
		contentContainerStyle={{
			paddingHorizontal: 16,
			paddingVertical: 12,
		}}
		text1Style={{
			fontSize: 15,
			fontWeight: "bold"
		}}
		text2Style={{
			fontSize: 13,
			color: "#444",
			flexWrap: "wrap"
		}}
		/>
	)
};