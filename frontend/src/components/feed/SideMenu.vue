<template>
  <aside class="menu">
    <p class="menu-label">
      General
    </p>
    <ul class="menu-list">
      <li><router-link :to="`/@${$user.username}`">Profile</router-link></li>
      <li><a class="is-active">Feed</a></li>
    </ul>
    <p class="menu-label">
      Shortcuts
    </p>
    <ul class="menu-list">
      <li><a>Settings</a></li>
    </ul>
  </aside>
</template>

<script>
export default {
  //
}
</script>
