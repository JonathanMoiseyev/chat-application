package communicationApp.androidClient;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;

@Dao
public interface CurrentUserDao {
    @Query("SELECT * FROM CurrentUser")
    List<CurrentUser> index();

    @Query("SELECT * FROM CurrentUser WHERE id = :id")
    CurrentUser get(int id);

    @Insert
    void insert(CurrentUser... currentUsers);

    @Update
    void update(CurrentUser... currentUsers);

    @Delete
    void delete(CurrentUser... currentUsers);

}
