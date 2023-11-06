const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const bookRoutes = require("./book.routes");

const defaultRoutes = [
  {
    path: "/auth",
    routes: authRoutes,
  },
  {
    path: "/book",
    routes: bookRoutes
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.routes);
});

module.exports = router;
