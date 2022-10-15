const signupFormHandler = async (event) => {
    event.preventDefault();

    const userName = document.querySelector('#user-name-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (userName && password) {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({ userName, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Unsuccessful signup. Please try again');
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);