from .sign_in_form import SignInForm
from .sign_up_form import SignUpForm
from .edit_profile_form import EditProfileForm

def validation_errors_formatter(form, validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {
        form[field].label.text: error
        for field in validation_errors
        for error in validation_errors[field]
    }
    return errorMessages
