package communicationApp.androidClient;

import androidx.room.Database;
import androidx.room.RoomDatabase;

@Database(entities = {User.class, Chat.class}, version = 1)
public abstract class AppDB extends RoomDatabase {
    public abstract ChatDao chatDao();
}
