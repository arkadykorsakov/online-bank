<template>
  <app-page title="Помощь" back>
    <question-item
      :question="question"
      v-for="question in questions"
      :key="question.title"
    />
  </app-page>
</template>

<script>
import AppPage from '@/components/ui/AppPage.vue'
import QuestionItem from '@/components/question/QuestionItem.vue'
export default {
  components: { AppPage, QuestionItem },
  setup() {
    const questions = [
      {
        title: 'Что есть в данной системе?',
        text: 'Тут есть все, для того, чтобы смотреть, какие заявки человек добавлял'
      },
      {
        title: 'Как тут работает авторизация?',
        text: 'Все реализовано через Firebase'
      }
    ]

    return {
      questions
    }
  }
}
</script>

<style></style>
