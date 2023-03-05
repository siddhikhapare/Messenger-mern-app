# Messenger-mern-app
- Demo
![demopic](https://github.com/siddhikhapare/Mern-messenger-app/blob/main/screenshot/modal.PNG)

Features
- Real time chatting with one-on-one and group
- Search users to chat
- Notifications
- Add or remove users from group
- Rename group
- View others users and own profile
- View group members

Add proxy while running app locally at client side in package.json file.
``` json
{
  "name": "client",
  "version": "0.1.0",
  "proxy": "http://localhost:5000",
```
Add below endpoint in SingleChat component at client side when running on locally and
Change it after deployment as per your url.

``` javascript
const ENDPOINT = "http://localhost:5000";
//After deployment
// "https://react-mern-messengerapp.herokuapp.com";

```

In .env file at server side -
Mention port number while running locally otherwise at deployment remove it to be dynamic port 
```.env
PORT=5000
DATABASE=' '
SECRET=' '
NODE_ENV=production

```


