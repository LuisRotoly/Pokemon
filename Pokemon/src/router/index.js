import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomePokemon.vue"),
    },
    {
      path: "/pokemon/:id",
      name: "pokemon",
      component: () => import("../views/Pokemon.vue"),
    },
    {
      path: "/pokemon/stats/:name",
      name: "pokemonStats",
      component: () => import("../views/PokemonStats.vue"),
    },
  ],
});

export default router;
