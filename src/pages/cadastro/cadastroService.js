import bcrypt from 'bcryptjs';

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
    const response = await fetch('http://localhost:8080/client/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return { success: true };
    } else {
      const err = await response.json();
      return { success: false, message: err.message || 'Erro no cadastro' };
    }
  } catch (error) {
    return { success: false, message: 'Erro ao conectar com o servidor.' };
  }
}