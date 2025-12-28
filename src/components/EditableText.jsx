import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const EditableText = ({
    value,
    onChange,
    multiline = false,
    className = '',
    style = {},
    placeholder = 'Edit...'
}) => {
    const { adminMode } = useAuth();
    const [localValue, setLocalValue] = useState(value);

    // Sync local state if external value changes (e.g. initial load)
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    if (!adminMode) {
        // Render as normal text, preserving newlines if multiline
        if (multiline && typeof value === 'string') {
            return (
                <div className={className} style={style}>
                    {value.split('\n').map((line, i) => (
                        <div key={i}>{line}</div>
                    ))}
                </div>
            );
        }
        return <span className={className} style={{ ...style, display: multiline ? 'block' : 'inline' }}>{value}</span>;
    }

    // ADMIN MODE: Render Input or Textarea
    const inputStyle = {
        ...style,
        background: 'rgba(50, 50, 50, 0.4)',
        border: '1px dashed #666',
        color: 'white',
        borderRadius: '4px',
        padding: '2px 4px',
        width: '100%',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontWeight: 'inherit',
        outline: 'none',
        minHeight: multiline ? '100px' : 'auto'
    };

    const handleChange = (e) => {
        const newVal = e.target.value;
        setLocalValue(newVal);
        if (onChange) onChange(newVal);
    };

    if (multiline) {
        return (
            <textarea
                className={className}
                style={inputStyle}
                value={localValue}
                onChange={handleChange}
                placeholder={placeholder}
            />
        );
    }

    return (
        <input
            className={className}
            style={inputStyle}
            value={localValue}
            onChange={handleChange}
            placeholder={placeholder}
        />
    );
};

export default EditableText;
