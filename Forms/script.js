const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

const checkRequired = (inputArr) => {
    inputArr.forEach(input => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input)
        }
    })
}

const checkLength = (input, min, max) => {
    const length = input.value.length;
    if (length < min) {
        showError(input, `${getFieldName(input)} must have at least ${min} characters`)
    } else if (length > max) {
        showError(input, `${getFieldName(input)} can have maximum ${max} characters`)
    } else {
        showSuccess(input)
    }
}

const checkEmail = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value)) {
        showSuccess(input)
    } else {
        showError(input, `${getFieldName(input)} is not valid`)
    }
}

const checkPasswordsMatch = (input1, input2) => {
    console.log(input1.value)
    console.log(input2.value)
    if (input1.value !== input2.value) {
        showError(input2, `Passwords do not match`)
    }
}

//HELPERS
const getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}


//EVENT LISTENERS

form.addEventListener('submit', e => {
    e.preventDefault();

    checkRequired([username, email, password, confirmPassword])
    checkLength(username, 3, 15)
    checkLength(password, 6, 25)
    checkEmail(email)
    checkPasswordsMatch(password, confirmPassword)
});



// const emailValid = (email) => {
//     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }


// form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     if (username.value === '') {
//         showError(username, 'Username is required');
//     } else {
//         showSuccess(username)
//     }

//     if (email.value === '') {
//         showError(email, 'Email is required');
//     } else if (!emailValid(email.value)) {
//         showError(email, 'Email is not valid');
//     } else {
//         showSuccess(email)
//     }


//     if (password.value === '') {
//         showError(password, 'Password is required');
//     } else {
//         showSuccess(password)
//     }

//     if (confirmPassword.value === '') {
//         showError(confirmPassword, 'PasswordConfirme is required');
//     } else {
//         showSuccess(confirmPassword)
//     }

// });