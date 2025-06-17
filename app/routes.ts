import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("common/pages/home-page.tsx"),
  // ...prefix("products", [
  //   index("common/pages/products-page.tsx"),
  //   route("leaderboards", "common/pages/leaderboards-page.tsx"),
  //   route("categories", "common/pages/categories-page.tsx"),
  //   route("search", "common/pages/search-page.tsx"),
  //   route("submit", "common/pages/submit-page.tsx"),
  //   route("promote", "common/pages/promote-page.tsx"),
  // ]),
] satisfies RouteConfig;
