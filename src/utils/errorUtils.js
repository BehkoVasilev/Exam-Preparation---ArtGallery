exports.getFirstMongooseError= (err) => {
    // const errors = Object.keys(err.errors).map(key => err.errors[key].message);
    const firstError = Object.values(err.errors)[0].message;
    // return errors[0]
    return firstError
}

exports.getErrorMessage = (err) => {
    switch (err.name) {
        case 'Error':
            return err.message;
        case 'ValidationError':
            return this.getFirstMongooseError(err);
        default:
            return err.message;
    }
}