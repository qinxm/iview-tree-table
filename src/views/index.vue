<template>
  <div class="tree-container">
    <tree-table
    :disabled="disabled"
    :dataList="dataList"
    @on-checked-keys-change="handleCheckedKeysChange"
    ></tree-table>
  </div>
</template>
<script>
import TreeTable from "@/components/treetable/index.component.vue";
import mockData from './mock.js'
export default {
  name: "Index",
  components: {
    TreeTable
  },
  data() {
    return {
      disabled: false,
      dataList: [],
      menuSet: new Set(),
      roleMenuSet: new Set()
    }
  },
  created() {
    this.dataList = mockData
  },
  methods: {
    handleCheckedKeysChange(dataList, menuSet) {
      console.log(menuSet)
    },
  },
};
</script>
