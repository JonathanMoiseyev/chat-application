package communicationApp.androidClient.firebase;


import android.Manifest;
import android.app.NotificationChannel;
import android.app.NotificationManager;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;


import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import communicationApp.androidClient.R;
import communicationApp.androidClient.loginAndRegister.register.RegisterActivity;

public class FirebaseMsgService extends FirebaseMessagingService {
    public FirebaseMsgService() {
    }

    @Override
    public void onMessageReceived(@NonNull RemoteMessage message) {
        if (message.getNotification() != null) {

            createNotificationChannel();

            NotificationCompat.Builder builder = new NotificationCompat.Builder(this, "CHANNEL_ID")
                    .setSmallIcon(R.drawable.ic_launcher_foreground)
                    .setContentTitle(message.getNotification().getTitle())
                    .setContentText(message.getNotification().getBody())
                    .setPriority(NotificationCompat.PRIORITY_DEFAULT);

            NotificationManagerCompat notificationManager = NotificationManagerCompat.from(this);


            if (ActivityCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED) {
                notificationManager.notify(1, builder.build());
            }
        }
    }

    private void createNotificationChannel() {
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel("CHANNEL_ID", "name", importance);
            channel.setDescription("description");

            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }
}