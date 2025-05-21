export async function sendChangePasswordEmail(formData) {
    
    const payload = {
        username: formData.email,
    };

    try {
        const response = await fetch('http://localhost:8080/client/change-password-email', {
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