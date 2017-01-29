# swimmy server

First draft of an implementation of an OSDI compliant server for swimmy.

To run it, make sure you have a PostGresql database running on `postgresql://localhost`,
and that you're cd'ed into this directory.

Then run

```
npm install
```

to install dependencies,

```
npm start
```

to start the server,

```
node maintenance/create.js
```

to populate the database with some sample people, and

```
npm test
```

to run the tests.

An easier dev process to come soon. The meat is all in `osdi-express`
