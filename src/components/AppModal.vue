<template functional>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal">
      <h3>{{ login }}</h3>
      <ul class="modal-list">
        <li>Репозитории: <span>{{ repo }}</span></li>
        <li>Подписчики: <span>{{ follower }}</span></li>
      </ul>
      <button
          class="btn"
          @click="$emit('close')"
      >Закрыть</button>
    </div>
  </div>
</template>

<script>
export default {
  $emits: ['close'],
  props: {
    login: {
      type: String,
      required: true
    },
    repo: {
      type: Number,
      required: true
    },
    follower: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.modal-list {
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0 0 15px 0;
  padding: 0;
}
</style>