package communicationApp.androidClient.adapters;

import android.view.LayoutInflater;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.RecyclerView;

import org.w3c.dom.Text;

import java.util.List;

import communicationApp.androidClient.MainActivity;
import communicationApp.androidClient.R;
import communicationApp.androidClient.entities.Chat;
import communicationApp.androidClient.entities.CurrentUserDao;
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

            String timestamp = current.getTimestamp().toString();
            try {
                String trimmedTimeStamp = current.getTimestamp().toString();
                trimmedTimeStamp = trimmedTimeStamp.substring(0, ordinalIndexOf(timestamp, ":", 2));
                timestamp = trimmedTimeStamp.substring(ordinalIndexOf(timestamp, " ", 3) + 1);
            } finally {
                holder.timestamp.setText(timestamp);
            }

            ConstraintLayout constraintLayout = holder.itemView.findViewById(R.id.messageLayout);
            RelativeLayout.LayoutParams params = (RelativeLayout.LayoutParams) constraintLayout.getLayoutParams();

            TextView messageContent = holder.itemView.findViewById(R.id.messageContent);


                if (current.isSentByMe()) {
                params.removeRule(RelativeLayout.ALIGN_PARENT_LEFT);
                params.addRule(RelativeLayout.ALIGN_PARENT_RIGHT);

                messageContent.setBackground(holder.itemView.getResources().getDrawable(R.drawable.rounded_button));
            } else {
                params.removeRule(RelativeLayout.ALIGN_PARENT_RIGHT);
                params.addRule(RelativeLayout.ALIGN_PARENT_LEFT);
                messageContent.setBackground(holder.itemView.getResources().getDrawable(R.drawable.rounded_button_secondary_color));
            }

            constraintLayout.setLayoutParams(params);

        } else {
            // Covers the case of data not being ready yet.
            holder.messageContent.setText("No messages");
        }
    }

    private int ordinalIndexOf(String str, String substr, int n) {
        int pos = str.indexOf(substr);
        while (--n > 0 && pos != -1)
            pos = str.indexOf(substr, pos + 1);
        return pos;
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
