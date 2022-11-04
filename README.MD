
# Simple authentication method

This tiny project implements a simple way to 
authenticate users in any NodeJS application.



## What i used

- Node
- PrismaIO
- Postgres (in Docker)
- Express
- Express Async Errors
- DayJS
- BcryptJS
- JsonWebToken


## 🛠 Skills
Javascript and TypeScript


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`

Its necessary to use PrismaIO


## Acknowledgements

 - [Prisma](https://www.prisma.io/)
 - [Express](https://expressjs.com/)
 - [Typescript](https://www.typescriptlang.org/)


## Lessons Learned

I was struggling when trying  to implement a token and refresh token method of authentication and always endedup with a framework.

With this, i've learned how to consistent add a token with a short life and use a refresh token with a long life to generate a new token withou any user interaction.

Also when refresh token is expired, get a new one excluding the previous one.

No other frameworks were used but expressjs.


## Feedback

If you have any feedback, please reach out to us at gutodiasux@gmail.com
