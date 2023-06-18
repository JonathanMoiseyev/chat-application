package communicationApp.androidClient;

import androidx.room.Database;
import androidx.room.RoomDatabase;

@Database(entities = {LoggedInUser.class, Chat.class}, version = 1)
public abstract class AppDB extends RoomDatabase {
    public abstract ChatDao chatDao();
    public abstract LoggedInUserDao loggedInUserDao();
}
