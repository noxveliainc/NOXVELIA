import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

export const googleAuthAvailable = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID);

export default function GoogleAuthButton({ text = 'continue_with', disabled = false, onCredential, onError }) {
  if (!googleAuthAvailable) return null;

  return (
    <div className={disabled ? 'auth-google-wrap disabled' : 'auth-google-wrap'}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse?.credential) {
            onCredential?.(credentialResponse.credential);
            return;
          }
          onError?.('Não foi possível receber a confirmação da Google.');
        }}
        onError={() => onError?.('Não foi possível continuar com Google. Tenta novamente.')}
        text={text}
        theme="outline"
        size="large"
        shape="rectangular"
        logo_alignment="left"
        locale="pt-PT"
        width="360"
      />
    </div>
  );
}