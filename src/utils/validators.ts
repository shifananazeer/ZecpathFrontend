export const validateEmail = (
    email: string
): string => {
    if (!email) return 'Email is required';

    const emailRegex =
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }

    const validDomains = [
        'gmail.com',
        'yahoo.com',
        'outlook.com',
        'hotmail.com',
        'icloud.com',
        'protonmail.com',
        'aol.com',
        'mail.com',
        'zoho.com',
        'yandex.com',
        'gmx.com',
        'live.com',
        'msn.com',
        'rediffmail.com',
        'inbox.com',
    ];

    const domain =
        email.split('@')[1]?.toLowerCase();

    if (!validDomains.includes(domain)) {
        return 'Please use a valid email provider';
    }

    return '';
};

export const validatePassword = (
    password: string
): string => {
    if (!password) {
        return 'Password is required';
    }

    if (password.length < 6) {
        return 'Password must be at least 6 characters';
    }

    return '';
};

export const validateFirstName = (
    firstName: string
): string => {
    if (!firstName) {
        return 'First Name is required';
    }

    if (firstName.trim().length < 2) {
        return 'First Name must be at least 2 characters';
    }

    // No spaces
    if (/\s/.test(firstName)) {
        return 'Spaces are not allowed in first name';
    }

    // First letter capital
    if (!/^[A-Z]/.test(firstName)) {
        return 'First Name must start with a capital letter';
    }

    // Only alphabets
    if (!/^[A-Za-z]+$/.test(firstName)) {
        return 'Only alphabets are allowed';
    }

    return '';
};

export const validateLastName = (
    lastName: string
): string => {
    if (!lastName) {
        return 'Last Name is required';
    }

    if (lastName.trim().length < 1) {
        return 'Last Name is required';
    }

    // First letter capital
    if (!/^[A-Z]/.test(lastName)) {
        return 'Last Name must start with a capital letter';
    }

      // letters + spaces
  if (!/^[A-Za-z\s]+$/.test(lastName.trim())) {
    return 'Last name can only contain letters and spaces';
  }

    return '';
};

export const validateCompanyName = (
    companyName: string
): string => {
    if (!companyName) {
        return 'Company Name is required';
    }

    if (companyName.trim().length < 2) {
        return 'Company Name must be at least 2 characters';
    }

    return '';
};

export const validateConfirmPassword = (
    password: string,
    confirmPassword: string
): string => {
    if (!confirmPassword) {
        return 'Please confirm your password';
    }

    if (password !== confirmPassword) {
        return 'Passwords do not match';
    }

    return '';
};

export const validatePhone = (phone: string) => {
    if (!phone) return 'Phone number is required';
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) return 'Phone number must be exactly 10 digits';
    return '';
};

export const validateLocation = (location: string) => {
    if (!location) return 'Location is required';
    if (location.trim().length < 2) return 'Location must be at least 2 characters';
    return '';
};