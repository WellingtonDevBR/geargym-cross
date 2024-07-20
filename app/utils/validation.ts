export const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  export const validatePassword = (password: string): boolean => {
    // Password must be at least 8 characters long and include at least one number and one special character
    const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    return re.test(password);
  };
  
  export const validateForm = (name: string, email: string, password: string, repeatPassword: string, isChecked: boolean): boolean => {
    return (
      name.trim().length > 0 &&
      validateEmail(email) &&
      validatePassword(password) &&
      password === repeatPassword &&
      isChecked
    );
  };
  