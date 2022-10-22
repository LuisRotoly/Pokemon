<script>
export default {
  name: "PokemonStats",
  data() {
    return {
      pokemons: [],
    };
  },
  methods: {
    getImage: function (url) {
      return url;
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
    const pokemonName = window.location.href.split("stats/").pop();
    this.fetchPokemon(pokemonName);
  },
};
</script>

<template>
  <main>
    <div v-for="pokemon in pokemons">
      <h1>{{ pokemon.name }}</h1>
      <div>
        <img
          class="image"
          :src="getImage(pokemon.sprites.front_default)"
          width="200"
          height="200"
          :alt="pokemon.name"
        />
        <div class="stats">
          <span class="text">Estatísticas Básicas:</span>
          <div v-for="stats in pokemon.stats">
            <span>{{ stats.stat.name }} =>{{ stats.base_stat }}</span>
          </div>
          <br />
          <span class="text">Tipo: </span>
          <div v-for="typing in pokemon.types">
            <span>{{ typing.type.name }}</span>
          </div>
          <br />
          <span class="text">Peso: </span>
          <span>{{ pokemon.weight }}</span>
          <span class="text2">g</span>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.greater {
  padding: 60px 0;
}

span {
  text-transform: capitalize;
}

.stats {
  position: absolute;
  top: 270px;
  right: 600px;
}

.image {
  position: absolute;
  top: 270px;
  right: 800px;
}

.text2 {
  font-size: 16px;
}

.text {
  font-size: 20px;
  color: blue;
}

.listPokemons {
  display: inline-block;
}

h1 {
  font-size: 35px;
  color: blue;
  text-decoration: none;
  text-transform: capitalize;
  text-align: center;
}
</style>
