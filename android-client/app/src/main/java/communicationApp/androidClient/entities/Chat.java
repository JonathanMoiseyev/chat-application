package communicationApp.androidClient.entities;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;
import androidx.room.TypeConverters;

import communicationApp.androidClient.entities.User;
import communicationApp.androidClient.entities.UserConverter;

@Entity
public class Chat {
   @PrimaryKey
   @NonNull
   private String id;
   @TypeConverters(UserConverter.class)
   private User contact;
   private String lastMessage;

    public Chat(String id, User contact, String lastMessage) {
        this.id = id;
        this.contact = contact;
        this.lastMessage = lastMessage;
    }

    public String getId() {
        return id;
    }

    public User getContact() {
        return contact;
    }

    public String getLastMessage() {
        return lastMessage;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setContact(User contact) {
        this.contact = contact;
    }

    public void setLastMessage(String lastMessage) {
       this.lastMessage = lastMessage;
    }

    @Override
    public String toString() {
        return this.contact.displayName;
    }
}
