package communicationApp.androidClient.loginAndRegister.login;


import org.json.JSONObject;

import communicationApp.androidClient.entities.CurrentUser;
import communicationApp.androidClient.entities.CurrentUserDao;
import communicationApp.androidClient.MainActivity;
import communicationApp.androidClient.loginAndRegister.login.model.LoggedInUser;

import java.io.DataInputStream;
import java.io.DataOutputStream;

import java.net.HttpURLConnection;
import java.net.URL;



/**
 * Class that handles authentication w/ login credentials and retrieves user information.
 */
public class LoginDataSource {

    private static class LoginNetworkRunnable implements Runnable {
        private Result<LoggedInUser> result;
        private String username;
        private String password;
        private boolean isDisconnect;

        LoginNetworkRunnable(String username, String password, boolean isDisconnect) {
            this.result = null;
            this.username = username;
            this.password = password;
            this.isDisconnect = isDisconnect;
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

                String apiURL = MainActivity.db.settingsDao().index().get(0).getServerUrl() + "api";
                URL url = new URL(apiURL + "/Tokens");
                clientForToken = (HttpURLConnection) url.openConnection();
                clientForToken.setRequestMethod("POST");

                clientForToken.setRequestProperty("accept", "*/*");
                clientForToken.setRequestProperty("Content-Type", "application/json");
                System.out.println(MainActivity.fireBaseToken);

                if (!isDisconnect) {
                    clientForToken.setRequestProperty("androidtoken", MainActivity.fireBaseToken);
                }

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

                if (isDisconnect) {
                    return;
                }



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
                    CurrentUserDao currentUserDao = MainActivity.db.currentUserDao();

                    if (currentUserDao.index().size() > 0) {
                        currentUserDao.delete(currentUserDao.index().get(0));
                    }

                    CurrentUser currentUser = new CurrentUser(0, token, username, displayName, profilePic, password);
                    currentUserDao.insert(currentUser);

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
        return loginRequest(username, password, false);
    }

    private static Result<LoggedInUser> loginRequest(String username, String password, boolean isDisconnect) {
        LoginNetworkRunnable runnable = new LoginNetworkRunnable(username, password, isDisconnect);
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

    public static void logout() {
        if (MainActivity.db.currentUserDao().index().size() > 0) {
            CurrentUser user = MainActivity.db.currentUserDao().index().get(0);
            loginRequest(user.getUserName(), user.getPassword(), true);
        }
    }
}