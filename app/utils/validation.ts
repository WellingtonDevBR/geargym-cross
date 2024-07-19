export const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
export const validatePassword = (password: string): boolean => {
    return password.length >= 6; // Example validation rule
};
  
export const validateForm = (
    username: string,
    email: string,
    password: string,
    repeatPassword: string,
    isChecked: boolean
  ): boolean => {
    return (
      username.trim().length > 0 &&
      validateEmail(email) &&
      validatePassword(password) &&
      password === repeatPassword &&
      isChecked
    );
};
  