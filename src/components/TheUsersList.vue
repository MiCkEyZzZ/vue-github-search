<template functional>
  <div v-if="users.length">
    <div class="card">
      <div class="card-top">
        <p class="card-user-count">найдено пользователей: <b>{{ userCount }}</b></p>
        <div class="sort" v-if="users.length > 1">
          <ul class="sort-list">
            <li class="sort-list-item">сортировать по:</li>
            <li class="sort-list-item">
              <button
                  class="btn"
                  :class="[currentDirection ==='asc' ? '' : 'primary']"
                  @click="$emit('sortedRepo')"
              >репозиторию</button>
            </li>
          </ul>
        </div>
      </div>
      <ul class="inline">
        <li class="item"
            :key="user.id + '-login'"
            v-for="user in sortingByRepos"
        >
          <img class="item-img" :src="user.avatar_url" :alt="user.login">
          <h3 class="item-login">{{ user.login }}</h3>
          <ul class="item-short-info">
            <li class="item-short-info__item">репозиториев <span class="item-short-info__item-circle">{{ user.repo_count }}</span></li>
            <li class="item-short-info__item">подписчиков <span class="item-short-info__item-circle">{{ user.follower_count }}</span></li>
          </ul>
          <button
              class="btn"
              :class="[modal ? 'primary' : '']"
              @click="$emit('openModal', user)"
          >Подробнее</button>
        </li>
      </ul>
    </div>
  </div>
  <div class="card center" v-else>
    <h4>Пользователей ещё нет</h4>
  </div>
</template>

<script>
export default {
  $emits: ['sortedRepo', 'openModal'],
  props: {
    users: {
      type: Array,
      required: true
    },
    userCount: {
      type: Number,
      required: true
    },
    sortingByRepos: {
      type: Array,
      required: true
    },
    currentDirection: {
      type: String,
      required: true
    },
    modal: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style scoped>
.inline {
  list-style: none;
  margin: 0;
  padding: 0;
}

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

.sort {
  position: relative;
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  margin: 0;
  padding: 0;
  color: #2c3e50;
}

.sort-list {
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 0;
}

.sort-list-item {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 5px;
}

.sort-list-item:last-child {
  padding: 5px 0 5px 5px;
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

.card-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 15px 0;
  padding: 0;
}

.card-user-count {
  width: 100%;
  font-size: 14px;
  margin: 0;
  padding: 0;
}
</style>