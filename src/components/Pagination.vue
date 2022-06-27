<template>
  <div>
    <div v-if="pageSetting.list.length" class="page-list" id = "pageList">
      <!-- <chevrons-left-icon
        class="left-icon"
        v-if="pageSetting.first !== null"
        color="#dfdfdf"
        @click="pageSetting.first !== null ? sendPage(pageSetting.first) : ''"
      /> -->
      <ul >
        <li
          :class="{ active: page === pageSetting.currentPage }"
          v-for="page in pageSetting.list"
          :key="page"
          @click="sendPage(page)"
        >
          {{ page }}
        </li>
      </ul>
      <!-- <chevrons-right-icon
        class="right-icon"
        v-if="pageSetting.end !== null"
        color="#dfdfdf"
        @click="pageSetting.end !== null ? sendPage(pageSetting.end) : ''"
      /> -->
    </div>
  </div>
</template>
 
<script>

  export default {
    props: ["pageSetting"],
 

    methods: {
      sendPage(page) {
        console.log("page " + page);
        this.$emit("paging", page);
      }
    }
  }
</script>
<style scoped>
li {
    display: inline;
    margin: 10px;
    font-size: 16pt;
}
#pageList {
   text-align: center;
}
 li.active {
  color: #42b983;
}



</style>