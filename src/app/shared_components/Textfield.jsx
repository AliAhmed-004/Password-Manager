import React from 'react';

export default function Textfield({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  className = '',
  inputClassName = '',
  autoComplete,
  ...props
}) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <span className="text-sm font-medium text-white">{label}</span>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`text-black px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-300 ${inputClassName}`}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...props}
      />
    </label>
  );
}
