# DevTinder API's

## authRouter:
- POST /signup
- POST /login
- POST /logout

## profileRouter:
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter:
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/send/:status/:userId - This 
  Oe API is enough for both interested and ignored Api


- POST /request/review/accepted/:requestId
- POST /request/review/regected/:requestId
- POST /request/review/:status/:requestId   This One API is enough for both accepted and regected Api


## userRouter:
- GET /requests/recieved
- GET /connections
- GET /feed - Gets you the profiles of other users on platform



Status: ignore, interested, accepted, rejected