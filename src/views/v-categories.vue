<template>
  <div>
    <div class='page-title'>
      <h3>Категории</h3>
    </div>
    <section>
      <v-loader v-if='loading'/>
      <div class='row' v-else>
        <v-category-create @created='addNewCategory'/>
        <v-category-edit v-if='categories.length' :categories='categories' :key='categories.length + updateCount' @update='updateCategories'/>
        <p v-else class="center"> Категорий пока нет! </p>
      </div>
    </section>
  </div>
</template>

<script>
import vCategoryCreate from '../components/v-category-create'
import vCategoryEdit from '../components/v-category-edit'
export default {
  name: 'v-categories',
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  metaInfo () {
    return {
      title: this.$title('Menu_Categories')
    }
  },
  components: {
    vCategoryCreate, vCategoryEdit
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  methods: {
    addNewCategory (category) {
      this.categories.push(category)
    },
    updateCategories (category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  }
}
</script>

<style scoped>

</style>
