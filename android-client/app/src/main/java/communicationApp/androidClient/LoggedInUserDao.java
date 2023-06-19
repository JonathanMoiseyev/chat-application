package communicationApp.androidClient;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;

@Dao
public interface LoggedInUserDao {
    @Query("SELECT * FROM LoggedInUser")
    List<LoggedInUser> index();

    @Query("SELECT * FROM LoggedInUser WHERE id = :id")
    User get(int id);

    @Insert
    void insert(LoggedInUser... loggedInUsers);

    @Update
    void update(LoggedInUser... loggedInUsers);

    @Delete
    void delete(LoggedInUser... loggedInUsers);

}
