const defaultUserData = (name, email, photoURL) => {
    const user = {
        address: null,
        name,
        email,
        photoURL,
        gender: null,
        phone: null,
        role: "student"
    }
    return user;
}

export default defaultUserData;

