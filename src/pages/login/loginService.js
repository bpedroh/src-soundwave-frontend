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

export async function getClientObject(formData){
   const email = encodeURIComponent(formData.email)

    try {
        const response = await fetch(`http://localhost:8080/client/find-by-email?email=${email}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            const data = await response.json(); 
            return { success: true, data };
        } else {
            const err = await response.json();
        return { success: false, message: err.message || 'Erro ao buscar cliente' };
        }
    } catch (error) {
        return { success: false, message: 'Erro ao conectar com o servidor.' };
    }
}

