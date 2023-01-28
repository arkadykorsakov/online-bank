<template>
  <h4 v-if="!requests.length" class="center">Заявок нет</h4>
  <table class="table" v-else>
    <thead>
      <tr>
        <th>#</th>
        <th>ФИО</th>
        <th>Телефон</th>
        <th>Сумма</th>
        <th>Статус</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(r, idx) in requests" :key="r.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ r.fio }}</td>
        <td>{{ r.phone }}</td>
        <td>{{ currency(r.amount) }}</td>
        <td>
          <app-status :type="r.status" />
        </td>
        <td>
          <router-link custom :to="`/requests/${r.id}`" v-slot="{ navigate }">
            <button class="btn primary" @click="navigate">Открыть</button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import AppStatus from '@/components/ui/AppStatus'
import currency from '@/utils/currency'
export default {
  props: ['requests'],
  setup() {
    return {
      currency
    }
  },
  components: {
    AppStatus
  }
}
</script>

<style></style>
