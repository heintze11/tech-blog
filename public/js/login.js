const loginFormHandler = async (event) => {
    event.preventDefault();

    const userName = document.querySelector('#user-name-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (userName && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ userName, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Unsuccessful login. Please try again');
        }
    }
};

    document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
