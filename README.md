# Advanced Programming 2 - work 1b

This repository provides an online chat application client built on React. 

## Getting Started

### Installation

Clone the repository: 
```bash
git clone https://github.com/JonathanMoiseyev/ap2-a2
```

Download the necessary dependencies:
```bash
npm i
```

### Executing The Program

To run the app in the development mode, run
```bash
npm start
```
then open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage Example

Currently, the application only supports the wanted functionality if all users use the same device, and the same browser tabs, logging in, chatting, and logging out one at a time.

However, we have provided some exaple users to test the application with. For example:

| Username | Password |
|----------|----------|
| hemi    | 123   |
| yuval    | 1234   |
| jonathanM    | 12344   |
| jonathanK    | 12345   |

**Note:** these user's passwords are simply for testing purposes. If a new user will try to register with one of these passwords, the registration will fail (that is because these passwords don't meet the criteria). 

## Adittional Notes

There are no indicators as to how many unread messages there are since in this version, we are not working against a proper database.

In the following versions, we will add a database, and the ability to see how many unread messages there are, as well as communicating with other users in real time.

## Authors
[Jonathan Kelsi](https://github.com/JonathanKelsi)  
[Jonathan Moiseyev](https://github.com/JonathanMoiseyev)  
[Yuval Grofman](https://github.com/yuvalgrofman)