<template>
  <div>
    <div class="buttons">
      <Button type="primary" @click="setCheckedNodes">自定义选中</Button>
      <Button type="primary" @click="getCheckedAndIndeterminateNodes">获取全选和半选</Button>
      <Button type="primary" @click="getCheckedNodes">获取全选节点</Button>
      <Button type="primary" @click="getSelectedNodes">获取选择节点</Button>
      <Button type="primary" @click="clearAll">清空</Button>
    </div>
    <Tag color="error">打开控制台查看输出</Tag>
    <div class="mgt10 alignc">
      <q-tree ref="Qtree" :dataSource="dataList" showCheckbox titleKey="name" :targetIds="selectIds"></q-tree>
    </div>
  </div>
</template>
<script>
import QTree from "@/components/tree/index.component.vue";
import mockData from "./mock.js";
export default {
  components: {
    QTree
  },
  data() {
    return {
      dataList: [],
      selectIds: ["1064", "1065"]
    };
  },
  created() {
    this.dataList = mockData;
  },
  methods: {
    setCheckedNodes() {
      this.$refs["Qtree"].setCheckedNodes(this.selectIds);
    },
    getSelectedNodes() {
      console.log(this.$refs["Qtree"].getSelectedNodes());
    },
    getCheckedNodes() {
      console.log(this.$refs["Qtree"].getCheckedNodes());
    },
    getCheckedAndIndeterminateNodes() {
      console.log(this.$refs["Qtree"].getCheckedAndIndeterminateNodes());
    },
    clearAll() {
      this.$refs["Qtree"].clearAll();
    }
  }
};
</script>

<style lang="scss" scoped>
.buttons {
  button {
    margin: 5px;
  }
}
</style>
