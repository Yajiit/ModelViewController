// signup.js
document.addEventListener('DOMContentLoaded', () => {
    const newUserFormContainer = document.querySelector('#signupFormContainer');
  
    const formFields = [
      { label: 'Email:', type: 'email', name: 'email', required: true },
      { label: 'Username:', type: 'text', name: 'username', required: true },
      { label: 'Password:', type: 'password', name: 'password', required: true },
    ];
  
    const createInputElement = (field) => {
      const inputElement = field.type === 'textarea'
        ? document.createElement('textarea')
        : document.createElement('input');
  
      inputElement.setAttribute('type', field.type);
      inputElement.setAttribute('name', field.name);
      inputElement.setAttribute('required', field.required || false);
  
      if (field.rows) {
        inputElement.setAttribute('rows', field.rows);
      }
  
      const labelElement = document.createElement('label');
      labelElement.textContent = field.label;
  
      const divElement = document.createElement('div');
      divElement.appendChild(labelElement);
      divElement.appendChild(inputElement);
  
      return divElement;
    };
  
    const createForm = () => {
      const formElement = document.createElement('form');
      formElement.setAttribute('action', '/api/users/create');
      formElement.setAttribute('method', 'POST');
  
      formFields.forEach((field) => {
        const inputElement = createInputElement(field);
        formElement.appendChild(inputElement);
      });
  
      const submitButton = document.createElement('button');
      submitButton.setAttribute('type', 'submit');
      submitButton.textContent = 'Create User';
      formElement.appendChild(submitButton);
  
      return formElement;
    };
  
    const handleFormSubmission = async (event) => {
      event.preventDefault();
  
      const formData = new FormData(newUserForm);
      const formObject = {};
  
      formData.forEach((value, key) => {
        formObject[key] = value;
      });
  
      try {
        const response = await fetch('/api/users/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formObject),
        });
  
        if (response.ok) {
        // Display success message
        newUserFormContainer.innerHTML = '<p>User created successfully. Redirecting to home page...</p>';
  
        // Redirect to home page after 7 seconds
        setTimeout(() => {
          window.location.href = '/'; // Redirect to home page
        }, 7000);
        } else {
          // Handle error response
          console.error('Error creating user');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    const newUserForm = createForm();
    newUserFormContainer.appendChild(newUserForm);
  
    newUserForm.addEventListener('submit', handleFormSubmission);
  });
  