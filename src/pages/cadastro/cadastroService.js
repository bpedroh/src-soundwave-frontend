import bcrypt from 'bcryptjs';
import forge from 'node-forge';
import {
    getBackendPublicKey,
    generateAesKeyAndIv,
    encryptWithAes,
    encryptAesKeyWithRsa,
    encryptIvWithRsa,
    getCurrentAesKey, 
    getCurrentIv      
} from '../../utils/chipherUtils.js'

let backendPublicKeyInstance = null
let sessionAesKey = null
let sessionIv = null

export async function enviarCadastro(formData) {
  if (formData.senha !== formData.confirmar_senha) {
    return { success: false, message: 'As senhas não coincidem!' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const senhaForteRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()\-_=+])[A-Za-z\d@$!%*?&.#^()\-_=+]{8,}$/;

  if (!emailRegex.test(formData.email)) {
    return { success: false, message: 'E-mail inválido!' };
  }

  if (!senhaForteRegex.test(formData.senha)) {
    return {
      success: false,
      message:
        'A senha deve conter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e símbolos.'
    };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(formData.senha, salt);

  const payload = {
    name: formData.nome,
    username: formData.email,
    password: hashedPassword
  };

  try {
        
        if (!backendPublicKeyInstance) {
            backendPublicKeyInstance = await getBackendPublicKey();
        }

        const { aesKey, iv } = await generateAesKeyAndIv();
        sessionAesKey = aesKey; 
        sessionIv = iv;         

        const encryptedAesKeyBase64 = await encryptAesKeyWithRsa(sessionAesKey, backendPublicKeyInstance);
        const encryptedIvBase64 = await encryptIvWithRsa(sessionIv, backendPublicKeyInstance);

        const jsonPayload = JSON.stringify(payload);
        const encryptedPayloadBytes = encryptWithAes(jsonPayload, sessionAesKey, sessionIv);
        const encryptedPayloadBase64 = forge.util.encode64(encryptedPayloadBytes);
        console.log(encryptedAesKeyBase64)

        const finalPayloadForBackend = {
            encryptedAesKey: encryptedAesKeyBase64,
            encryptedIv: encryptedIvBase64,
            encryptedData: encryptedPayloadBase64,
        };

    const cadastroResponse = await fetch('http://localhost:8080/client/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalPayloadForBackend )
    });

    if (cadastroResponse.ok) {
      return { success: true };
    } else {
      const err = await cadastroResponse.json();
      return { success: false, message: err.message || 'Erro no cadastro' };
    }

  } catch (error) {
    console.error('Erro:', error);
    return { success: false, message: 'Erro ao conectar com o servidor.' };
  }
}