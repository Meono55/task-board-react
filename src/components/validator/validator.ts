
const Validator = (inputs) => {
    const errors = {
        title: null,
        subTitle: null,
        description: null
    };

    if(!inputs.title){
        errors.title = 'Input a Title';
    }
    if(!inputs.subTitle){
        errors.subTitle = "Input a SubTitle";
    }
    if(!inputs.description) {
        errors.description = "Enter a description for the task"
    }

    return errors;
}

export default Validator;