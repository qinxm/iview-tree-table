<template>
  <div class="pd10">
    <div class="pd10 alignl">
      <Form ref="formInline" inline :label-width="100">
        <FormItem label="是否只读">
          <i-switch size="large" v-model="readonly" @on-change="refresh">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>
        <FormItem label="是否展开全部">
          <i-switch size="large" v-model="expandAll" @on-change="refresh">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>
        <FormItem label="展开层级">
          <InputNumber :max="3" :min="1" v-model="expandLevel" @on-change="changLevel"></InputNumber>
        </FormItem>
      </Form>
    </div>
    <tree-table
    v-if="isRefresh"
    :readonly="readonly"
    :children="dataList"
    :selectedList="initSelected"
    :expandAll="expandAll"
    :expandLevel="expandLevel"
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
      isRefresh: true,
      readonly: false,
      expandAll: false,
      expandLevel: 1,
      dataList: [],
      menuSet: new Set(),
      initSelected: [ 1077, 749, 10000]
    }
  },
  created() {
    this.dataList = mockData
  },
  methods: {
    refresh() {
      this.isRefresh= false;
      this.$nextTick(() => {
        this.isRefresh = true
      })
    },
    changLevel(val) {
      this.expandAll = false
      this.refresh();
    },
    handleCheckedKeysChange(dataList, menuSet) {
      console.log(dataList)
    }
  },
};
</script>
<style>
  .alignl {
    text-align: left;
  }
  .pd10 {
    padding: 10px;
  }
</style>

