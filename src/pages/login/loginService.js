import bcrypt from 'bcryptjs';


export async function enviarLogin(formData){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(formData.email)) {
        return { success: false, message: 'E-mail inválido!' };
    }


    const payload = {
        username: formData.email,
        password: formData.senha
  };

    try {
        const response = await fetch('http://localhost:8080/client/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
        });

        if (response.ok) {
            return { success: true };
        } else {
            const err = await response.json();
        return { success: false, message: err.message || 'Erro no login' };
        }
    } catch (error) {
        return { success: false, message: 'Erro ao conectar com o servidor.' };
    }

}

