package communicationApp.androidClient.loginAndRegister.login;

import androidx.lifecycle.Observer;

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.annotation.StringRes;
import androidx.appcompat.app.AppCompatActivity;

import android.text.Editable;
import android.text.TextWatcher;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import communicationApp.androidClient.MainActivity;
import communicationApp.androidClient.R;
import communicationApp.androidClient.Theme;
import communicationApp.androidClient.loginAndRegister.login.model.LoggedInUser;
import communicationApp.androidClient.databinding.ActivityLoginBinding;
import communicationApp.androidClient.entities.Settings;
import communicationApp.androidClient.settings.SettingsActivity;
import communicationApp.androidClient.entities.SettingsDao;

public class LoginActivity extends AppCompatActivity {

    private LoginViewModel loginViewModel;
    private ActivityLoginBinding binding;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        try {
            SettingsDao settingsDao = MainActivity.db.settingsDao();
            Settings settings = settingsDao.index().get(0);
            Theme theme = settings.getTheme();

            switch (theme.ordinal()) {
                case 1:
                    setTheme(R.style.Purple_Teal_Theme);
                    break;
                case 2:
                    setTheme(R.style.BrightTheme);
                    break;
                case 3:
                    setTheme(R.style.DarkTheme);
                    break;
                default:
                    setTheme(R.style.Base_Theme_AndroidClient);
                    break;
            }
        } catch (Exception e) {
            setTheme(R.style.Base_Theme_AndroidClient);
        }

        super.onCreate(savedInstanceState);


        // Check if user is already logged in
        if (MainActivity.db.currentUserDao().index().size() != 0) {
            setResult(MainActivity.RESULT_CODE_TO_OPEN_CONTACT_LIST);
            finish();
        }

        binding = ActivityLoginBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        ImageButton settingsButton = findViewById(R.id.settings_button_login);
        settingsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(LoginActivity.this, SettingsActivity.class);
                startActivity(intent);

                setResult(MainActivity.RESULT_CODE_TO_OPEN_LOGIN);
                finish();
            }
        });



        loginViewModel = new LoginViewModel(LoginRepository.getInstance(new LoginDataSource()));

        final EditText usernameEditText = binding.username;
        final EditText passwordEditText = binding.password;
        final Button loginButton = binding.login;
        final TextView registerLink = findViewById(R.id.signup_link);

        registerLink.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                setResult(MainActivity.RESULT_CODE_TO_OPEN_REGISTER);
                finish();
            }
        });


        loginViewModel.getLoginFormState().observe(this, new Observer<LoginFormState>() {
            @Override
            public void onChanged(@Nullable LoginFormState loginFormState) {
                if (loginFormState == null) {
                    return;
                }
                loginButton.setEnabled(loginFormState.isDataValid());
                if (loginFormState.getUsernameError() != null) {
                    usernameEditText.setError(getString(loginFormState.getUsernameError()));
                }
                if (loginFormState.getPasswordError() != null) {
                    passwordEditText.setError(getString(loginFormState.getPasswordError()));
                }
            }
        });

        loginViewModel.getLoginResult().observe(this, new Observer<LoginResult>() {
            @Override
            public void onChanged(@Nullable LoginResult loginResult) {
                if (loginResult == null) {
                    return;
                }

                if (loginResult.getError() != null) {
                    showLoginFailed(loginResult.getError());
                }
                else if (loginResult.getSuccess() != null) {
                    updateUiWithUser(loginResult.getSuccess());
                }
            }
        });

        TextWatcher afterTextChangedListener = new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
                // ignore
            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                // ignore
            }

            @Override
            public void afterTextChanged(Editable s) {
                loginViewModel.loginDataChanged(usernameEditText.getText().toString(),
                        passwordEditText.getText().toString());
            }
        };
        usernameEditText.addTextChangedListener(afterTextChangedListener);
        passwordEditText.addTextChangedListener(afterTextChangedListener);
        passwordEditText.setOnEditorActionListener(new TextView.OnEditorActionListener() {

            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                if (actionId == EditorInfo.IME_ACTION_DONE) {
                    loginViewModel.login(usernameEditText.getText().toString(),
                            passwordEditText.getText().toString());
                }
                return false;
            }
        });

        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                loginViewModel.login(usernameEditText.getText().toString(),
                        passwordEditText.getText().toString());
            }
        });
    }

    private void updateUiWithUser(LoggedInUser model) {
        String welcome = "welcome " + model.getDisplayName();

        // initiate successful logged in experience
        Toast.makeText(getApplicationContext(), welcome, Toast.LENGTH_LONG).show();
        setResult(MainActivity.RESULT_CODE_TO_OPEN_CONTACT_LIST);
        finish();
    }

    private void showLoginFailed(@StringRes Integer errorString) {

        Toast toast = Toast.makeText(this, errorString, Toast.LENGTH_SHORT);
        toast.show();
    }
}