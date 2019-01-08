<template>
  <div>
    <Tree ref="tree" v-if="showTree" :data="dataList" :show-checkbox="showCheckbox"></Tree>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    },
    selectIds: {
      type: Array,
      default: []
    },
    titleKey: {
      type: String,
      default: "name"
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showTree: true,
      dataList: []
    };
  },
  created() {
    if (this.selectIds.length) {
      this.setCheckedNodes(this.selectIds)
    }
    
  },
  methods: {
    //获取选中及半选节点
    getCheckedAndIndeterminateNodes() {
      return this.$refs['tree'].getCheckedAndIndeterminateNodes()
    },
    // 获取被选中的节点
    getSelectedNodes() {
      return this.$refs['tree'].getSelectedNodes()
    },
    // 获取被勾选的节点
    getCheckedNodes() {
      return this.$refs['tree'].getCheckedNodes()
    },
    setCheckedNodes(targetIds=[]) {
      this.showTree = false;
      let res = this.setTreeExpand({
        dataList: _.cloneDeep(this.data),
        targetIds
      });
      this.$set(this, "dataList", res.dataList);
      this.showTree = true;
    },
    clearAll() {
      this.setCheckedNodes()
    },
    /**
     * 遍历tree，选中目标Node,展开其所有父级node,
     * dataList: 传入的数组
     * targetIds: 目标Id数组
     */
    setTreeExpand({ dataList = [], targetIds = [] }) {
      let vm = this;
      var _setTreeExpand = function({
        dataList = [],
        targetIds = [],
        pid = "",
        pidArr = []
      }) {
        if (pidArr && Array.isArray(pidArr)) {
          for (let i = 0; i < dataList.length; i++) {
            let item = dataList[i];
            if (!item.hasOwnProperty("title")) {
              item["title"] = item[vm.titleKey];
            }

            // 判断当前node id 是否等于目标id
            if (targetIds.findIndex(v => v == item.id) > -1) {
              pidArr.push(item.id);
              if (pid) {
                pidArr.push(pid);
              }
              item.checked = true;
            } else {
              item.checked = false;
            }
            if (item.children && Array.isArray(item.children)) {
              let newObj = _setTreeExpand({
                dataList: item.children,
                targetIds,
                pid: item.id,
                pidArr
              });
              let pidIndex = newObj.pidArr.findIndex(v => v == item.id);
              if (pidIndex > -1) {
                pidArr.push(pid);
                item.expand = true;
              } else {
                item.expand = false;
              }
            }
          }
          // 将处理后的数据返回
          return {
            dataList,
            pidArr
          };
        } else {
          console.log("pidArr 参数错误");
        }
      };
      return _setTreeExpand({
        dataList,
        targetIds,
        pid: "",
        pidArr: []
      });
    }
  }
};
</script>
