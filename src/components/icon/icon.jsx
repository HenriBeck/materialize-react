import React, {
  PropTypes,
} from 'react';

export default function Icon({
  icon,
  className,
  disabled,
  style,
  ...props
}, { theme }) {
  return (
    <i
      className={`mdi mdi-24px mdi-${icon} ${className}`}
      style={{
        color: disabled ? theme.icon.disabledColor : theme.icon.color,
        lineHeight: 1,
        ...style,
      }}
      {...props}
    />
  );
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

Icon.defaultProps = {
  className: '',
  disabled: false,
  style: {},
};

Icon.contextTypes = { theme: PropTypes.object };
