import { Modal as RNModal, View, Pressable, type ModalProps as RNModalProps } from 'react-native';
import type { ReactNode } from 'react';

export interface ModalProps extends Omit<RNModalProps, 'children'> {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export function Modal({
    className = '',
    isOpen,
    onClose,
    children,
    ...props
}: ModalProps) {
    return (
        <RNModal
            visible={isOpen}
            transparent
            animationType="fade"
            onRequestClose={onClose}
            statusBarTranslucent
            {...props}
        >
            <Pressable
                className="flex-1 bg-black/50 justify-center items-center"
                onPress={onClose}
            >
                <Pressable
                    className={`bg-white rounded-2xl m-4 max-w-sm w-full ${className}`}
                    onPress={(e) => e.stopPropagation()}
                >
                    {children}
                </Pressable>
            </Pressable>
        </RNModal>
    );
}
