import React from 'react';

function Button({ as = 'button', className = '', icon, label, ...rest }) {
	const Element = as;

	return (
		<Element className={`icon-button ${className}`} {...rest}>
			<img src={`icons/${icon}.svg`} alt={label} />
		</Element>
	);
}

export default Button;
