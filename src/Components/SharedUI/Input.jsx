import React from 'react';

const Input = React.forwardRef(({ placeholder, type = 'text', Icon, className, name, ...rest }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  
  const ToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    if (rest.onFocus) rest.onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (rest.onBlur) rest.onBlur(e);
  };

  return (
    <div 
      className={`shared-input d-flex align-items-center rounded ps-3 bg-light w-100 position-relative transition-all ${className}`}
      style={{
        minHeight: '56px',
        border: isFocused ? '2px solid #4AA35A' : '2px solid transparent',
        boxShadow: isFocused ? '0 0 0 3px rgba(74, 163, 90, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease'
      }}
    >
      {Icon && (
        <i 
          className={`${Icon} text-secondary`} 
          style={{ 
            color: isFocused ? '#4AA35A' : '#8391A1',
            transition: 'color 0.3s ease'
          }} 
        />
      )}
      <div 
        className="border-start mx-3" 
        style={{ 
          height: '24px',
          borderColor: isFocused ? '#4AA35A' : '#dee2e6',
          transition: 'border-color 0.3s ease'
        }}
      ></div>
      <input
        ref={ref}
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        className="w-100 py-2 flex-grow-1 bg-transparent border-0"
        placeholder={placeholder}
        name={name}
        style={{
          fontSize: '18px',
          color: '#495057'
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
      {type === 'password' && (
        <i
          className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} text-secondary`}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            right: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: isFocused ? '#4AA35A' : '#8391A1',
            transition: 'color 0.3s ease',
            padding: '8px'
          }}
          onClick={ToggleShowPassword}
          title={showPassword ? 'Hide password' : 'Show password'}
        />
      )}
    </div>
  );
});

export default Input;
