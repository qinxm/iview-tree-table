 /* eslint-disable */
<template>
  <div class="pd10">
    <div class="pd10 alignl">
      <Form ref="formInline" inline :label-width="100">
        <FormItem label="是否全选">
          <i-switch size="large" v-model="selectAll" @on-change="refresh">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>
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
          <InputNumber :max="3" :min="0" v-model="expandLevel" @on-change="changLevel"></InputNumber>
        </FormItem>
      </Form>
    </div>
    <div>
      选择的id: {{selectMenuSet}}
    </div>
    <iview-tree-table
      v-if="show"
      :selectAll="selectAll"
      :readonly="readonly"
      :children="dataList"
      :selectedList="selectMenuSet"
      :expandAll="expandAll"
      :expandLevel="expandLevel"
      @on-checked-keys-change="handleCheckedKeysChange"
    ></iview-tree-table>
    
  </div>
</template>
<script>
import IviewTreeTable from "@/components/treetable/index.component.vue";
import mockData from "./mock.js";
export default {
  name: "Index",
  components: {
    IviewTreeTable
  },
  data() {
    return {
      selectAll: false,
      show: true,
      readonly: false,
      expandAll: false,
      expandLevel: 0,
      dataList: [],
      // 初始化选中的菜单和按钮id
      initSelected: [20000],

      selectMenuSet: [20000],
    };
  },
  created() {
    this.dataList = mockData;
  },
  methods: {
    refresh() {
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    changLevel(val) {
      console.log(val);
      this.expandAll = false;
      this.refresh();
    },
    changeInit(val) {
      console.log(val)
    },
    /**
     * 按钮选中后触发该事件
     * dataList: 绑定的数据源
     * menuSet: 包含所有选中的菜单和按钮id
     */
    handleCheckedKeysChange(dataList, menuSet) {
      console.log(dataList);
      console.log(menuSet);
      this.selectMenuSet = [...menuSet]
    }
  }
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

