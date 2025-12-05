import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DeleteModalProps {
    message: string;
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function DeleteModal({
    message,
    visible,
    onCancel,
    onConfirm
}: DeleteModalProps) {

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    
                    <Text style={styles.title}>Confirmar Ação</Text>
                    <Text style={styles.message}>{message}</Text>

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                            <Text style={styles.confirmText}>Excluir</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        width: "80%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 14,
        elevation: 10,
        gap: 14
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#2E2E2E",
        textAlign: "center"
    },
    message: {
        fontSize: 15,
        color: "#555",
        textAlign: "center"
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        gap: 10
    },
    cancelButton: {
        flex: 1,
        backgroundColor: "#E0E0E0",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center"
    },
    cancelText: {
        color: "#333",
        fontWeight: "600"
    },
    confirmButton: {
        flex: 1,
        backgroundColor: "#E53935",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center"
    },
    confirmText: {
        color: "#fff",
        fontWeight: "700"
    }
});