/**
 * Settings Feature Types
 */

export interface SettingsSection {
    id: string;
    title: string;
    items: SettingsItem[];
}

export interface SettingsItem {
    id: string;
    type: 'link' | 'toggle' | 'select' | 'action';
    title: string;
    subtitle?: string;
    icon?: string;
    value?: string | boolean;
    onPress?: () => void;
}
