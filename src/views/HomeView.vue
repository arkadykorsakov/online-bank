<template>
  <app-loader v-if="loading" />
  <app-page title="Список заявок" v-else>
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <request-filter v-model="filter" />
    <request-table :requests="requests" />
    <teleport to="body">
      <app-modal v-if="modal" @close="modal = false" title="Создать заявку">
        <request-modal @created="modal = false" />
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import AppPage from '@/components/ui/AppPage.vue'
import AppModal from '@/components/ui/AppModal.vue'
import RequestTable from '@/components/request/RequestTable.vue'
import RequestModal from '@/components/request/RequestModal.vue'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import AppLoader from '@/components/ui/AppLoader.vue'
import RequestFilter from '@/components/request/RequestFilter.vue'
export default {
  components: {
    AppPage,
    RequestTable,
    AppModal,
    RequestModal,
    AppLoader,
    RequestFilter
  },
  setup() {
    const store = useStore()
    const modal = ref(false)
    const filter = ref({})
    const loading = ref(false)

    onMounted(async () => {
      loading.value = true
      await store.dispatch('request/load')
      loading.value = false
    })

    const requests = computed(() =>
      store.getters['request/requests']
        .filter((request) => {
          if (filter.value.name) {
            return request.fio.includes(filter.value.name)
          }
          return request
        })
        .filter((request) => {
          if (filter.value.status) {
            return request.status === filter.value.status
          }
          return request
        })
    )
    return {
      modal,
      requests,
      loading,
      filter
    }
  }
}
</script>

<style></style>
