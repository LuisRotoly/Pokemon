<script setup></script>

<template>
  <header>
    <div class="title">
      <a href="/">
        <img
          src="./assets/logo.png"
          width="384"
          height="140"
          alt="Pokemon Logo"
        />
      </a>
    </div>
  </header>
  <RouterView />
</template>

<style>
.title {
  text-align: center;
  margin-top: 2rem;
}
</style>
