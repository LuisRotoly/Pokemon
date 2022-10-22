<script>
export default {
  name: "HomeView",
  data() {
    return {
      pokemons: [],
      value: "",
    };
  },
  methods: {
    searchPokemon: function (event) {
      this.pokemons = [];
      if (event.target.value != "") {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0")
          .then((res) => res.json())
          .then((data) => {
            for (const key in data.results) {
              if (data.results[key].name.startsWith(event.target.value)) {
                this.pokemons.push(data.results[key]);
              }
            }
          });
      }
    },
    splitUrl(row) {
      const number = row.split("pokemon/").pop();
      return number.slice(0, -1);
    },
    getImage(url) {
      return (
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
        url +
        ".png"
      );
    },
  },
};
</script>

<template>
  <main>
    <div class="input">
      <p class="title">Escolha o seu Pókemon:</p>
      <input
        class="inputPokemon"
        type="text"
        placeholder="Digite aqui"
        @change="searchPokemon"
      />
    </div>
    <div class="listPokemons" v-for="pokemon in pokemons">
      <p>
        <RouterLink
          :to="`/pokemon/${splitUrl(pokemon.url)}`"
          class="namePokemon"
          >{{ pokemon.name }}</RouterLink
        >
      </p>
      <img :src="getImage(splitUrl(pokemon.url))" width="170" height="170" :alt="pokemon.name"/>
    </div>
  </main>
</template>

<style>
.input {
  margin-top: 2rem;
}

.title {
  font-size: 18px;
  color: blue;
}

.namePokemon {
  font-size: 25px;
  color: blue;
  text-decoration: none;
  text-transform: capitalize;
}

.inputPokemon {
  text-align: center;
  width: 250px;
  height: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  box-shadow: inset 0 2px 2px hsla(0, 0%, 0%, 0.35),
    0 2px 0 hsla(0, 0%, 100%, 0.15);
  font-size: 15px;
}

body {
  text-align: center;
}

.listPokemons {
  margin-top: 2rem;
  display: inline-block;
}
</style>
