module.exports = user =>{
    const serialized ={
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        student: user.student
    };
    return serialized;
};