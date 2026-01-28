import React, { forwardRef } from 'react';
import {
    ScrollView as RNScrollView,
    type ScrollViewProps as RNScrollViewProps,
} from 'react-native';

export interface ScrollViewProps extends RNScrollViewProps {
    className?: string;
}

export const ScrollView = forwardRef<RNScrollView, ScrollViewProps>(
    ({ className, style, ...props }, ref) => {
        return <RNScrollView ref={ref} className={className} style={style} {...props} />;
    }
);

ScrollView.displayName = 'ScrollView';
