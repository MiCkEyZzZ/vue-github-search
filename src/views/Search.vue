<template>
  <form class="card" @submit.prevent="handleSearchUsers">
    <h2>Тестовое задание. Поиск пользователей Github API</h2>
    <div class="form-control">
      <label for="query">Введите имя</label>
      <input
          type="text"
          id="query"
          autocomplete="off"
          v-model.trim="query"
      >
    </div>
    <button
        class="btn primary"
        :disabled="isDisabled"
    >Поиск</button>
  </form>

  <app-loader v-if="loading"></app-loader>

  <the-users-list
      :users="users"
      :user-count="userCount"
      :sorting-by-repos="sortingByRepos"
      :current-direction="currentDirection"
      @open-modal="handleMoreInfo"
      @scroll="handleLoadMoreUsers"
      @sorted-repo="handleSortByRepo('repo')"
  >
  </the-users-list>

  <teleport to="body">
    <app-modal
        v-if="modal"
        :login='modal.login'
        :repo="modal.repo"
        :follower="modal.follower"
        @close="modal = false"
    ></app-modal>
  </teleport>

</template>

<script>
import axios from 'axios'
import {PARAM_PAGE, PARAM_SEARCH, PATH_BASE, PATH_PER_PAGE, PATH_SEARCH, PATH_USERS, DEFAULT_PER_PAGE} from '../constants'
import {addDataInfoUser} from '../utils/common'
import TheUsersList from '../components/TheUsersList'
import AppLoader from '../components/AppLoader'
import AppModal from '../components/AppModal'

export default {
  data() {
    return {
      page: 1,
      query: '',
      users: [],
      loading: false,
      modal: false,
      userCount: 0,
      currentSort: 'repo',
      currentDirection: 'asc'
    }
  },
  methods: {
    async handleSearchUsers() {
      try {
        this.loading = true
        const {data} = await axios.get(`${PATH_BASE}${PATH_SEARCH}${PATH_USERS}?${PARAM_SEARCH}${this.query}&${PATH_PER_PAGE}${DEFAULT_PER_PAGE}&${PARAM_PAGE}${this.page}`)
        const {items, total_count} = data
        this.userCount = total_count

        this.users = items

        if (items) {
          await this.users.forEach(user => {
            const {login, followers_url} = user

            Promise.allSettled([
              axios.get(`${PATH_BASE}${PATH_USERS}/${login}/repos?${PATH_PER_PAGE}100`),
              axios.get(`${followers_url}?${PATH_PER_PAGE}100`)
            ])
                .then(results => {
                  const [repos, followers] = results

                  const status = 'fulfilled'

                  if (repos.status === status && followers.status === status) {
                    addDataInfoUser(user, {
                      repo: repos.value.data,
                      repo_count: repos.value.data.length,
                      follower: followers.value.data,
                      follower_count: followers.value.data.length
                    })
                  }
                })
                .catch(err => console.log(err))
          })
        }
      } catch (err) {
        console.log(err)
        this.loading = false
      }

      this.loading = false
    },
    async handleLoadMoreUsers() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight

        if (bottomOfWindow) {
          axios.get(`${PATH_BASE}${PATH_SEARCH}${PATH_USERS}?${PARAM_SEARCH}${this.query}&${PARAM_PAGE}${this.page++}`)
              .then(response => response.data.items && (this.users = [...this.users, ...response.data.items]))
        }
      }
    },
    handleMoreInfo(user) {
      this.modal = {
        login: user.login,
        repo: user.repo_count,
        follower: user.follower_count
      }
    },
    handleSortByRepo(key) {
      if (key === this.currentSort) {
        this.currentDirection = this.currentDirection === 'asc' ? 'desc' : 'asc'
      }

      this.currentSort = key
    }
  },
  computed: {
    sortingByRepos() {
      return this.users.slice().sort((a, b) => {
        let modifier = 1

        if (this.currentDirection === 'desc') modifier = -1
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
        return 0
      })
    },
    isDisabled() {
      return this.query.length === 0
    }
  },
  mounted() {
    this.handleLoadMoreUsers()
  },
  components: {TheUsersList, AppLoader, AppModal}
}
</script>

<style scoped>

</style>