package communicationApp.androidClient.login;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import communicationApp.androidClient.data.model.LoggedInUser;
import communicationApp.androidClient.R;
import communicationApp.androidClient.loginAndRegister.ValidFieldChecker;

public class LoginViewModel extends ViewModel {

    MutableLiveData<LoginFormState> loginFormState = new MutableLiveData<>();
    private MutableLiveData<LoginResult> loginResult = new MutableLiveData<>();
    private LoginRepository loginRepository;

    LoginViewModel(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    MutableLiveData<LoginFormState> getLoginFormState() {
        return loginFormState;
    }

    LiveData<LoginResult> getLoginResult() {
        return loginResult;
    }

    public void login(String username, String password) {
        // can be launched in a separate asynchronous job
        Result<LoggedInUser> result = loginRepository.login(username, password);

        if (result instanceof Result.Success) {
            LoggedInUser data = ((Result.Success<LoggedInUser>) result).getData();
            loginResult.setValue(new LoginResult(data));
        } else {
            loginResult.setValue(new LoginResult(R.string.login_failed));
        }


    }

    public void loginDataChanged(String username, String password) {
        LoginFormState newLoginFormState = new LoginFormState();

        if (!ValidFieldChecker.isUsernameValid(username)) {
            newLoginFormState.setUsernameError(R.string.invalid_username);
        } else {
            newLoginFormState.setUsernameError(null);
        }

        newLoginFormState.setPasswordError(ValidFieldChecker.passwordValidationError(password));

        newLoginFormState.updateIsDataValid();

        loginFormState.setValue(newLoginFormState);
    }
}