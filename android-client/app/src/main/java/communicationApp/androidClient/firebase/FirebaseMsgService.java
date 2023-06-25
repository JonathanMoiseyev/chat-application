package communicationApp.androidClient.firebase;


import android.Manifest;
import android.app.NotificationChannel;
import android.app.NotificationManager;

import android.content.pm.PackageManager;
import android.os.Build;


import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import org.json.JSONObject;

import java.util.Date;
import java.util.Map;

import communicationApp.androidClient.MainActivity;
import communicationApp.androidClient.R;
import communicationApp.androidClient.entities.Chat;
import communicationApp.androidClient.entities.Message;
import communicationApp.androidClient.entities.User;

public class FirebaseMsgService extends FirebaseMessagingService {
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

            Map<String, String> data = message.getData();
            if (data.containsKey("type") && data.containsKey("sender") && data.containsKey("chatId")) {

                String contactJsonString = data.get("sender");
                JSONObject contactJson;
                String contactUsername;
                String contactDisplayName;
                String profilePicture;

                try {
                    contactJson = new JSONObject(contactJsonString);
                    contactUsername = contactJson.getString("username");
                    contactDisplayName = contactJson.getString("displayName");
                    profilePicture = contactJson.getString("profilePic");
                } catch (Exception e) {
                    return; //TODO: handle this exception
                }

                String chatId = data.get("chatId");

                String type = data.get("type");
                if (type != null) {
                    if (type.equals("new message")) {
                        // adding the message to the chat
                        MainActivity.db.messageDao().insert(new Message(chatId, message.getNotification().getBody(),
                                new Date().toString(), contactUsername, false));
                    }
                    else if (type.equals("new chat")) {
                        //making sure we don't have this chat yet
                        if (MainActivity.db.chatDao().get(chatId) == null) {
                            //adding the chat to the database
                            User newContact = new User(contactUsername, contactDisplayName, profilePicture);
                            MainActivity.db.chatDao().insert(new Chat(chatId, newContact, ""));
                        }
                    }

                    // refreshing the activity
                    try {
                        MainActivity.refresher.postValue(!MainActivity.refresher.getValue().booleanValue());
                    } catch (Exception e) {
                        MainActivity.refresher.postValue(true);
                    }
                }
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