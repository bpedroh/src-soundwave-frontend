
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
        const response = await fetch('http://localhost:8082/client/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
        });

        const data = await response.text();


        const mensagens = {
            400: data.message || 'E-mail ou senha incorretos.',
            500: 'Erro interno no servidor. Tente mais tarde.',
        };

        if (response.ok) {
            return { success: true };
        } else {
          const mensagem = mensagens[response.status] || data.message || 'Erro desconhecido.';  
          return { success: false, message: mensagem };
        }
    } catch (error) {
        console.error('Erro:', error);
        return { success: false, message: 'Não foi possível conectar ao servidor. Verifique sua conexão.' };
    }

}

export async function getClientObject(formData){
   const email = encodeURIComponent(formData.email)

    try {
        const response = await fetch(`http://localhost:8082/client/find-by-email?email=${email}`, {
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

