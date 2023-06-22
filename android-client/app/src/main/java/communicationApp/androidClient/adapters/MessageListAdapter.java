package communicationApp.androidClient.adapters;

import android.view.LayoutInflater;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

import communicationApp.androidClient.R;
import communicationApp.androidClient.entities.Chat;
import communicationApp.androidClient.entities.Message;

public class MessageListAdapter extends RecyclerView.Adapter<MessageListAdapter.ViewHolder> {
    public static class ViewHolder extends RecyclerView.ViewHolder {
        private final TextView messageContent;
        private final TextView timestamp;

        public ViewHolder(android.view.View view) {
            super(view);
            messageContent = (TextView) view.findViewById(R.id.messageContent);
            timestamp = (TextView) view.findViewById(R.id.timestamp);
        }
    }

    private final LayoutInflater mInflater;
    private List<Message> mMessages; // Cached copy of messages

    public MessageListAdapter(android.content.Context context) {
        mInflater = LayoutInflater.from(context);
    }

    @Override
    @NonNull
    public ViewHolder onCreateViewHolder(@NonNull android.view.ViewGroup parent, int viewType) {
        android.view.View view = mInflater.inflate(communicationApp.androidClient.R.layout.message_list_item, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        if (mMessages != null) {
            Message current = mMessages.get(position);
            holder.messageContent.setText(current.getContent());
            holder.timestamp.setText(current.getTimestamp().toString());
        } else {
            // Covers the case of data not being ready yet.
            holder.messageContent.setText("No messages");
        }
    }

    @Override
    public int getItemCount() {
        if (mMessages != null)
            return mMessages.size();
        else return 0;
    }

    public void setMessages(@Nullable List<Message> messages) {
        mMessages = messages;
        notifyDataSetChanged();
    }

    public List<Message> getMessages() {
        return mMessages;
    }
}
