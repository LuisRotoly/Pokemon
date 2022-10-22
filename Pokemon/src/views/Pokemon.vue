<script>
export default {
  name: "Pokemon",
  data() {
    return {
      pokemons: [],
      evolutions: [],
    };
  },
  methods: {
    getImage: function (url) {
      return url;
    },
    fetchEvolution: function (evolutionUrl) {
      fetch(
        "https://pokeapi.co/api/v2/pokemon-species/" +
          evolutionUrl.split("pokemon/").pop()
      )
        .then((res) => res.json())
        .then((data) => {
          fetch(
            "https://pokeapi.co/api/v2/evolution-chain/" +
              data.evolution_chain.url.split("evolution-chain/").pop()
          )
            .then((res) => res.json())
            .then((data) => {
              let evolution = data.chain;
              this.evolutions.push(evolution);
              while (evolution.evolves_to.length > 0) {
                evolution = evolution.evolves_to[0];
                this.evolutions.push(evolution);
              }
              this.evolutions.forEach((evolution) => {
                this.fetchPokemon(evolution.species.name);
              });
            });
        });
    },
    fetchPokemon: function (pokemonName) {
      fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
        .then((res) => res.json())
        .then((data) => {
          this.pokemons.push(data);
        });
    },
  },

  mounted() {
    const idPokemon = window.location.href.split("pokemon/").pop();
    this.fetchEvolution(idPokemon);
  },
};
</script>

<template>
  <main>
    <p class="text">Clique no nome do Pokémon para ver suas características:</p>
    <div class="listPokemons" v-for="(pokemon, index) in pokemons">
      <p>
        <RouterLink
          :to="`/pokemon/stats/${pokemon.name}`"
          class="namePokemon"
          >{{ pokemon.name }}</RouterLink
        >
      </p>
      <img
        :src="getImage(pokemon.sprites.front_default)"
        width="170"
        height="170"
        :alt="pokemon.name"
      />
      <img
        v-if="index < pokemons.length - 1"
        class="greater"
        src="../assets/greater.png"
        width="51"
        height="51"
        alt="Imagem que indica a próxima evolução"
      />
    </div>
  </main>
</template>

<style>
body {
  text-align: center;
}

.greater {
  padding: 60px 0;
}

.text {
  margin-top: 2rem;
  font-size: 20px;
  color: blue;
}

.listPokemons {
  display: inline-block;
}

.namePokemon {
  font-size: 25px;
  color: blue;
  text-decoration: none;
  text-transform: capitalize;
}
</style>
