import forge from 'node-forge'; 

let backendPublicKey = null;
let currentAesKey = null;
let currentIv = null;


export async function getBackendPublicKey() {
    try {
        const response = await fetch('http://localhost:8080/criptografia/public-key');
        if (!response.ok) {
            throw new Error(`Erro ao obter chave pública: ${response.statusText}`);
        }
        const publicKeyBase64 = await response.text();
        backendPublicKey = forge.pki.publicKeyFromPem(publicKeyBase64);
        console.log('Chave pública do backend obtida com sucesso.');
        console.log(backendPublicKey.toString())
        return backendPublicKey;
    } catch (error) {
        console.error('Erro ao buscar chave pública do backend:', error);
        throw error;
    }
}


export async function generateAesKeyAndIv() {
    const aesKey = forge.random.getBytesSync(32); 
    const iv = forge.random.getBytesSync(16);   
    console.log('Chave AES e IV gerados.');
    currentAesKey = aesKey;
    currentIv = iv;
    return { aesKey, iv }; 
}

export function encryptWithAes(plaintext, key, iv) {
    const cipher = forge.cipher.createCipher('AES-CBC', key);
    cipher.start({ iv: iv });
    cipher.update(forge.util.createBuffer(plaintext, 'utf8'));
    cipher.finish();
    return cipher.output.getBytes();
}


export async function encryptAesKeyWithRsa(aesKeyBytes, publicKey) {
    const encryptedAesKey = publicKey.encrypt(aesKeyBytes, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
        mgf1: { 
            md: forge.md.sha256.create()
        }
    });
    
    return forge.util.encode64(encryptedAesKey);
}

export async function encryptIvWithRsa(ivBytes, publicKey) {
    const encryptedIv = publicKey.encrypt(ivBytes, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
        mgf1: { 
            md: forge.md.sha256.create()
        }
    });
    return forge.util.encode64(encryptedIv);
}

export function getCurrentAesKey() {
    return currentAesKey;
}

export function getCurrentIv() {
    return currentIv;
}