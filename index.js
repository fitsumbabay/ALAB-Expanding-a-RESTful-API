// const express = require("express");
// const app = express();
// const port = 3000;



// // We import the body-parser package.
// // This package contains middleware that can handle
// // the parsing of many different kinds of data,
// // making it easier to work with data in routes that
// // accept data from the client (POST, PATCH).
// const bodyParser = require("body-parser");

// // Importing the data from our fake database files.
// const users = require("./data/users");
// const posts = require("./data/posts");


// // Creating a GET route for the entire users database.
// // This would be impractical in larger data sets.
// app.get("/api/users", (req, res) => {
//   res.json(users);
// });

// // Creating a simple GET route for individual users,
// // using a route parameter for the unique id.
// app.get("/api/users/:id", (req, res) => {
//   const user = users.find((u) => u.id == req.params.id);
//   if (user) res.json(user);
// });

// // Creating a GET route for the entire posts database.
// // This would be impractical in larger data sets.
// app.get("/api/posts", (req, res) => {
//   res.json(posts);
// });

// // Creating a simple GET route for individual posts,
// // using a route parameter for the unique id.
// app.get("/api/posts/:id", (req, res) => {
//   const post = posts.find((p) => p.id == req.params.id);
//   if (post) res.json(post);
// });


// // Custom 404 (not found) middleware.
// // Since we place this last, it will only process
// // if no other routes have already sent a response!
// // We also don't need next(), since this is the
// // last stop along the request-response cycle.
// app.use((req, res) => {
//   res.status(404);
//   res.json({ error: "Resource Not Found" });
// });


// app.get("/", (req, res) => {
//   res.send("Work in progress!");
// });

// app.listen(port, () => {
//   console.log(`Server listening on port: ${port}.`);
// });


///////////////////////////////////////////////



// const express = require("express");
// const bodyParser = require("body-parser");

// const users = require("./data/users");
// const posts = require("./data/posts");

// const app = express();
// const port = 3000;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({ extended: true }));

// // New logging middleware to help us keep track of
// // requests during testing!
// app.use((req, res, next) => {
//   const time = new Date();

//   console.log(
//     `-----
// ${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
//   );
//   if (Object.keys(req.body).length > 0) {
//     console.log("Containing the data:");
//     console.log(`${JSON.stringify(req.body)}`);
//   }
//   next();
// });

// app
//   .route("/users")
//   .get((req, res) => {
//     res.json(users);
//   })
//   .post((req, res) => {
//     if (req.body.name && req.body.username && req.body.email) {
//       if (users.find((u) => u.username == req.body.username)) {
//         res.json({ error: "Username Already Taken" });
//         return;
//       }

//       const user = {
//         id: users[users.length - 1].id + 1,
//         name: req.body.name,
//         username: req.body.username,
//         email: req.body.email,
//       };

//       users.push(user);
//       res.json(users[users.length - 1]);
//     } else res.json({ error: "Insufficient Data" });
//   });

// app
//   .route("/api/users/:id")
//   .get((req, res, next) => {
//     const user = users.find((u) => u.id == req.params.id);
//     if (user) res.json(user);
//     else next();
//   })
//   .patch((req, res, next) => {
//     const user = users.find((u, i) => {
//       if (u.id == req.params.id) {
//         for (const key in req.body) {
//           users[i][key] = req.body[key];
//         }
//         return true;
//       }
//     });

//     if (user) res.json(user);
//     else next();
//   })
//   .delete((req, res, next) => {
//     const user = users.find((u, i) => {
//       if (u.id == req.params.id) {
//         users.splice(i, 1);
//         return true;
//       }
//     });

//     if (user) res.json(user);
//     else next();
//   });

// app
//   .route("/api/posts")
//   .get((req, res) => {
//     res.json(posts);
//   })
//   .post((req, res) => {
//     if (req.body.userId && req.body.title && req.body.content) {
//       const post = {
//         id: posts[posts.length - 1].id + 1,
//         userId: req.body.userId,
//         title: req.body.title,
//         content: req.body.content,
//       };

//       posts.push(post);
//       res.json(posts[posts.length - 1]);
//     } else res.json({ error: "Insufficient Data" });
//   });

// app
//   .route("/api/posts/:id")
//   .get((req, res, next) => {
//     const post = posts.find((p) => p.id == req.params.id);
//     if (post) res.json(post);
//     else next();
//   })
//   .patch((req, res, next) => {
//     const post = posts.find((p, i) => {
//       if (p.id == req.params.id) {
//         for (const key in req.body) {
//           posts[i][key] = req.body[key];
//         }
//         return true;
//       }
//     });

//     if (post) res.json(post);
//     else next();
//   })
//   .delete((req, res, next) => {
//     const post = posts.find((p, i) => {
//       if (p.id == req.params.id) {
//         posts.splice(i, 1);
//         return true;
//       }
//     });

//     if (post) res.json(post);
//     else next();
//   });

// app.get("/", (req, res) => {
//   res.send("Work in progress!");
// });

// app.use((req, res) => {
//   res.status(404);
//   res.json({ error: "Resource Not Found" });
// });

// app.listen(port, () => {
//   console.log(`Server listening on port: ${port}.`);
// });

///////////////////////////////////////


const express = require("express");
const bodyParser = require("body-parser");
const users = require("./router/users");
const posts = require("./router/posts");
const error = require("./utilities/error");
const commentsRouter = require('./router/comments'); // New comments router
const app = express();
const port = 3000;




// Parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Logging Middlewaare
app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

// Valid API Keys.
apiKeys = ["perscholas", "ps-example", "hJAsknw-L198sAJD-l3kasx"];

// New middleware to check for API keys!
// Note that if the key is not verified,
// we do not call next(); this is the end.
// This is why we attached the /api/ prefix
// to our routing at the beginning!
app.use("/api", function (req, res, next) {
  var key = req.query["api-key"];

  // Check for the absence of a key.
  if (!key) next(error(400, "API Key Required"));

  // Check for key validity.
  if (apiKeys.indexOf(key) === -1) next(error(401, "Invalid API Key"));

  // Valid key! Store it in req.key for route access.
  req.key = key;
  next();
});

// Use our Routes
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/comments", commentsRouter);

// Adding some HATEOAS links.
app.get("/", (req, res) => {
  res.json({
    links: [
      {
        href: "/api",
        rel: "api",
        type: "GET",
      },
    ],
  });
});

// Adding some HATEOAS links.
app.get("/api", (req, res) => {
  res.json({
    links: [
      {
        href: "api/users",
        rel: "users",
        type: "GET",
      },
      {
        href: "api/users",
        rel: "users",
        type: "POST",
      },
      {
        href: "api/posts",
        rel: "posts",
        type: "GET",
      },
      {
        href: "api/posts",
        rel: "posts",
        type: "POST",
      },
    ],
  });
});

// 404 Middleware
app.use((req, res, next) => {
  next(error(404, "Resource Not Found"));
});

// Error-handling middleware.
// Any call to next() that includes an
// Error() will skip regular middleware and
// only be processed by error-handling middleware.
// This changes our error handling throughout the application,
// but allows us to change the processing of ALL errors
// at once in a single location, which is important for
// scalability and maintainability.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});


app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
