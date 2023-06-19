package communicationApp.androidClient.login;


import androidx.room.Room;

import org.json.JSONObject;

import communicationApp.androidClient.AppDB;
import communicationApp.androidClient.CurrentUser;
import communicationApp.androidClient.CurrentUserDao;
import communicationApp.androidClient.data.model.LoggedInUser;

import java.io.DataInputStream;
import java.io.DataOutputStream;

import java.net.HttpURLConnection;
import java.net.URL;



/**
 * Class that handles authentication w/ login credentials and retrieves user information.
 */
public class LoginDataSource {
    static private String apiURL;

    static public AppDB db;

    LoginDataSource(String apiURL, AppDB db) {
        LoginDataSource.apiURL = apiURL;
        this.db = db;
    }

    private static class LoginNetworkRunnable implements Runnable {
        private Result<LoggedInUser> result;
        private String username;
        private String password;

        LoginNetworkRunnable(String username, String password) {
            this.result = null;
            this.username = username;
            this.password = password;
        }

        public Result<LoggedInUser> getResult() {
            return result;
        }

        @Override
        public void run() {
            HttpURLConnection clientForToken = null;
            HttpURLConnection clientForUserDetails = null;
            try {
                // handle loggedInUser authentication:


                URL url = new URL(apiURL + "/Tokens");
                clientForToken = (HttpURLConnection) url.openConnection();
                clientForToken.setRequestMethod("POST");

                clientForToken.setRequestProperty("accept", "*/*");
                clientForToken.setRequestProperty("Content-Type", "application/json");

                clientForToken.setDoOutput(true);

                JSONObject obj = new JSONObject();
                obj.put("username", username);
                obj.put("password", password);

                DataOutputStream outputPostToken = new DataOutputStream(clientForToken.getOutputStream());
                outputPostToken.writeBytes(obj.toString());
                outputPostToken.flush();
                outputPostToken.close();

                if (clientForToken.getResponseCode() != HttpURLConnection.HTTP_OK) {
                    throw new Exception("invalid username or password");
                }

                DataInputStream tokenInputStream = new DataInputStream(clientForToken.getInputStream());
                String token = tokenInputStream.readLine();




                url = new URL(apiURL + "/Users/" + username);
                clientForUserDetails = (HttpURLConnection) url.openConnection();
                clientForUserDetails.setRequestMethod("GET");
                clientForUserDetails.setRequestProperty("accept", "text/plain");
                clientForUserDetails.setRequestProperty("Authorization", "bearer " + token);

                if (clientForUserDetails.getResponseCode() == HttpURLConnection.HTTP_OK) {
                    DataInputStream userDetailsInputStream = new DataInputStream(clientForUserDetails.getInputStream());
                    String userDetailsJsonString = userDetailsInputStream.readLine();
                    JSONObject UserDetailsJson = new JSONObject(userDetailsJsonString);
                    String displayName = UserDetailsJson.getString("displayName");
                    String profilePic = UserDetailsJson.getString("profilePic");


                    LoggedInUser user = new LoggedInUser(username, displayName, profilePic, token);
                    result = new Result.Success<LoggedInUser>(user);

                    // Save the logged in user to the local database
                    CurrentUserDao currentUserDao = db.currentUserDao();

                    if (currentUserDao.index().size() == 0) {
                        CurrentUser currentUser = new CurrentUser(0, token, username, displayName, profilePic);
                        currentUserDao.insert(currentUser);
                    }

                    Object s = currentUserDao.index();
                    System.out.println(s);

                } else {
                    throw new Exception() {
                        public String getMessage() {
                            return "invalid username or password";
                        }
                    };
                }



            } catch(Exception exception) {
                    result = new Result.Error(exception);


            } finally {
                // closing the token connection if it is not null
                if (clientForToken != null) {
                    clientForToken.disconnect();
                }

                // closing the user details connection if it is not null
                if (clientForToken != null) {
                    clientForToken.disconnect();
                }

            }
        }


    }



    public Result<LoggedInUser> login(String username, String password) {
        LoginNetworkRunnable runnable = new LoginNetworkRunnable(username, password);
        Thread networkThread = new Thread(runnable);

        Result<LoggedInUser> result = null;

        try {
            networkThread.start();
            networkThread.join();
            result = runnable.getResult();

        } catch (InterruptedException e) {
            e.printStackTrace();
        }


        // returning the result
        return result;
    }

    public void logout() {
        // TODO: revoke authentication
    }
}