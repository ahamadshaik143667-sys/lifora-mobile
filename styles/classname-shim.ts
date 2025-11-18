import React from 'react';
import { StyleProp } from 'react-native';

import { tw } from './tw';

export function cn(...args: any[]) {
  return tw(args);
}


type AnyStyle = StyleProp<any>;

function mergeStyles(classStyles: AnyStyle, style?: AnyStyle): AnyStyle {
	const result: any[] = [];
	const push = (value: AnyStyle) => {
		if (!value) {
			return;
		}
		if (Array.isArray(value)) {
			value.forEach(push);
		} else {
			result.push(value);
		}
	};
	push(classStyles);
	push(style);
	if (result.length === 0) {
		return undefined;
	}
	if (result.length === 1) {
		return result[0];
	}
	return result;
}

const reactAny = React as unknown as { __CLASSNAME_SHIM__?: boolean } & typeof React;

if (!reactAny.__CLASSNAME_SHIM__) {
	const originalCreateElement = React.createElement;
	reactAny.__CLASSNAME_SHIM__ = true;
	React.createElement = function createElementWithClassNamePatch(
		type: any,
		props: any,
		...children: any[]
	) {
		if (props && typeof props === 'object' && 'className' in props) {
			const { className, style, ...rest } = props;
			const classStyles = className ? tw(className) : undefined;
			const mergedStyle = mergeStyles(classStyles, style);
			return originalCreateElement(type, { ...rest, style: mergedStyle }, ...children);
		}
		return originalCreateElement(type, props, ...children);
	};
}

