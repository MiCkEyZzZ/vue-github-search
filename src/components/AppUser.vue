<template>
  <li class="item">
    <img class="item-img" :src="avatar" :alt="login">
    <h3 class="item-login">{{ login }}</h3>
    <ul class="item-short-info">
      <li class="item-short-info__item">репозиториев <span class="item-short-info__item-circle">{{ repo }}</span></li>
      <li class="item-short-info__item">подписчиков <span class="item-short-info__item-circle">{{ follower }}</span></li>
    </ul>
    <button
        class="btn"
        @click="$emit('open')"
    >Подробнее</button>
    <teleport to="body">
      <app-modal
          v-if="showModal"
          :login='login'
          :repo="repo"
          :follower="follower"
      ></app-modal>
    </teleport>
  </li>
</template>

<script>
import AppModal from './AppModal'

export default {
  props: {
    login: {
      type: String,
      required: true
    },
    avatar: {
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
    },
    showModal: {
      type: Boolean
    }
  },
  components: {AppModal}
}
</script>

<style scoped>
.item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 5px 0;
  padding: 16px;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
}

.item-login {
  font-size: 26px;
  line-height: 1.25;
}

.item:last-child {
  margin: 0;
}

.item-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.item-short-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: auto;
  list-style: none;
  margin: 0;
  padding: 0;
}

.item-short-info__item {
  margin: 0 10px 0 0;
  padding: 0;
}

.item-short-info__item:last-child {
  margin: 0;
}

.item-short-info__item-circle {
  display: inline-block;
  min-width: 20px;
  padding: 0 6px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  text-align: center;
  color: #000000;
  background: rgba(209, 213, 2018, 0.5);
  border: 1px solid rgba(209, 213, 2018, 0.5);
  border-radius: 2em;
  box-sizing: border-box;
}
</style>