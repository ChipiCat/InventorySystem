import { useState } from 'react';

interface ValidationRules {
  required?: boolean;
  email?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

interface FieldConfig {
  [key: string]: ValidationRules;
}

export function useFormValidation<T extends Record<string, string>>(
  initialValues: T,
  validationRules: FieldConfig
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string): string => {
    const rules = validationRules[name];
    if (!rules) return '';

    if (rules.required && !value.trim()) {
      return `${name} es requerido`;
    }

    if (rules.email && value && !/\S+@\S+\.\S+/.test(value)) {
      return 'El email no es válido';
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `Debe tener al menos ${rules.minLength} caracteres`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `No debe exceder ${rules.maxLength} caracteres`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return 'Formato no válido';
    }

    return '';
  };

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    Object.keys(validationRules).forEach(field => {
      const error = validateField(field, values[field as keyof T]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateField = (name: keyof T, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as string]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    updateField,
    validateAll,
    reset,
    setError: (field: string, error: string) => {
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };
}
