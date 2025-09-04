import React, { useState } from 'react';
import { userService } from '../services/userService';

export const EmailTester: React.FC = () => {
  const [email, setEmail] = useState('gabriela.garcia.villalobos.dev@gmail.com');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const sendTestEmail = async () => {
    if (!email) {
      setStatus('error');
      setMessage('Por favor ingresa un email');
      return;
    }

    setStatus('loading');
    setMessage('Enviando correo...');
    
    try {
      await userService.resetPassword(email);
      setStatus('success');
      setMessage(`✅ Correo enviado a ${email}! Revisa tu bandeja de entrada y carpeta de spam.`);
    } catch (error: any) {
      setStatus('error');
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800">🧪 Probar Email de Reset</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email para probar:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="tu@email.com"
          />
        </div>
        
        <button
          onClick={sendTestEmail}
          disabled={status === 'loading'}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-2 px-4 rounded-md font-medium transition-colors"
        >
          {status === 'loading' ? 'Enviando...' : 'Enviar Email de Reset'}
        </button>
        
        {message && (
          <div className={`p-3 rounded-md text-sm ${
            status === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 
            status === 'error' ? 'bg-red-100 text-red-800 border border-red-200' : 
            'bg-blue-100 text-blue-800 border border-blue-200'
          }`}>
            {message}
          </div>
        )}
      </div>
      
      <div className="mt-6 p-3 bg-gray-50 rounded-md">
        <h3 className="font-semibold text-gray-800 mb-2">💡 Instrucciones:</h3>
        <ol className="text-sm text-gray-600 space-y-1">
          <li>1. Asegúrate de configurar los templates en Firebase Console</li>
          <li>2. Revisa la carpeta de spam si no llega el correo</li>
          <li>3. El enlace expira en 1 hora</li>
          <li>4. Haz clic en el enlace y serás redirigido a /reset-password</li>
        </ol>
      </div>
    </div>
  );
};
