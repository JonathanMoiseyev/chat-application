package communicationApp.androidClient;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;

import communicationApp.androidClient.login.LoginActivity;
import communicationApp.androidClient.register.RegisterActivity;

public class MainActivity extends AppCompatActivity {
    private enum Activities {
        LOGIN,
        REGISTER,
        CHAT
    }



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        Intent intent = new Intent(this, LoginActivity.class);
        startActivityForResult(intent, Activities.LOGIN.ordinal());

    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        super.onActivityResult(requestCode, resultCode, intent);

        if (requestCode == Activities.LOGIN.ordinal()) {
            if (resultCode == RESULT_OK) {
                intent = new Intent(this, ContactListActivity.class);
                startActivityForResult(intent, Activities.CHAT.ordinal());
            } else {
                intent = new Intent(this, RegisterActivity.class);
                startActivityForResult(intent, Activities.REGISTER.ordinal());
            }
        }

        else if (requestCode == Activities.REGISTER.ordinal()) {
            intent = new Intent(this, LoginActivity.class);
            startActivityForResult(intent, Activities.LOGIN.ordinal());
        }

        else { //if (requestCode == Activities.CHAT.ordinal()) {
            intent = new Intent(this, LoginActivity.class);
            startActivityForResult(intent, Activities.LOGIN.ordinal());
        }

    }
}