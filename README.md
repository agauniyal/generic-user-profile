## Routes

```
POST localhost:8080/user/register
Content-Type: application/json

{
	"email": "hello@GMAIL.COM",
	"password": "hello",
	"fullname": "myfullname"
}

{
	"username": "q3xH6T7wCuzMakkvAOhjX"
}
```

```
POST localhost:8080/user/log
Content-Type: application/json

{
	"email": "hello@GMAIL.COM",
	"password": "hello"
}

{
	"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

```
PUT localhost:8080/user/profile
Content-Type: application/json

{
	"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
	"fullname": "newFull Name"
}
```
