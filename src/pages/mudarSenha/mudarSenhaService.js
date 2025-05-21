

export async function changePassword(formData, id) {
    
      if (formData.senha !== formData.confirmar_senha) {
        return { success: false, message: 'As senhas não coincidem!' };
    }

    const senhaForteRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()\-_=+])[A-Za-z\d@$!%*?&.#^()\-_=+]{8,}$/;

        if (!senhaForteRegex.test(formData.novaSenha)) {
            return {
            success: false,
            message:
                'A senha deve conter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e símbolos.'
        };
    }

    const payload = {
        newPassword: formData.novaSenha
    };


    try {
        const response = await fetch(`http://localhost:8080/client/change-password/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
        });

        if (response.ok) {
            return { success: true };
        } else {
            const err = await response.json();
            return { success: false, message: err.message || 'Erro no envio de email' };
        }
    } catch (error) {
        return { success: false, message: 'Erro ao conectar com o servidor.' };
    }
}