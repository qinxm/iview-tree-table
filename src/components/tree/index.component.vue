<template>
  <div class="alignl" style="display: inline-block;">
    <Search
      prefix-cls="tree-search"
      :query="query"
      :searchLabel="searchLabel"
      @on-query-clear="handleQueryClear"
      @on-query-change="handleQueryChange"
      :placeholder="filterPlaceholder"
    ></Search>
    <Tree
      ref="tree"
      v-if="showTree"
      :data="dataList"
      :show-checkbox="showCheckbox"
      @on-check-change="onCheckChange"
    ></Tree>
  </div>
</template>
<script>
import Search from "../search/search.component.vue";
export default {
  props: {
    dataSource: {
      type: Array,
      default: []
    },
    targetIds: {
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
    },
    searchLabel: {
      type: String,
      default: ""
    },
    filterPlaceholder: {
      type: String,
      default: "请输入关键字进行过滤"
    }
  },
  components: {
    Search
  },
  data() {
    return {
      data: this.dataSource,
      showTree: true,
      dataList: [],
      selectIdSet: new Set(),
      filterData: "",
      query: ""
    };
  },
  mounted() {
    this.initTree();
  },
  methods: {
    // 初始化树
    initTree() {
      this.handleTree({
        dataList: _.cloneDeep(this.data),
        fold: true,
        targetIds:this.targetIds,
        clearAll: false
     })
    },
    clearAll() {
     this.handleTree({
        dataList: _.cloneDeep(this.data),
        fold: false,
        clearAll: true
     })
    },
    // 设置默认选项
    setCheckedNodes(targetIds = []) {
      this.handleTree({
        dataList: _.cloneDeep(this.dataList),
        targetIds
      });
    },
    handleTree(params={}) {
      this.showTree = false;
      let res = this.setTreeExpand(params);
      this.$set(this, "dataList", res.dataList);
      this.showTree = true;
    },
    // 选择框变化时，向selectIdSet中插入选中Id
    onCheckChange(selectArr, current) {
      this.selectIdSet.clear();
      let setId = new Set()
      selectArr.map(obj => {
        setId.add(obj.id);
      });
      this.$set(this, 'selectIdSet', setId)
    },
    // 搜索框清空，树全部收起
    handleQueryClear() {
      this.initTree();
    },
    // 查询条件变化
    handleQueryChange(val) {
      if (val) {
        this.handleTree({
          dataList: _.cloneDeep(this.dataList),
          filterStr: val,
          targetIds: [...this.selectIdSet]
        })
      } else {
         this.handleTree({
          dataList: _.cloneDeep(this.dataList),
          fold: true,
          targetIds: [...this.selectIdSet]
        })
        // this.initTree();
      }
    },

    /**
     * 遍历tree，选中目标Node,展开其所有父级node,
     * dataList: 传入的数组
     * targetIds: 目标Id数组
     * clearAll: 清空所有选中项
     * fold: 是否折叠
     */
    setTreeExpand({
      dataList = [],
      targetIds = [],
      fold = false,
      filterStr = "",
      clearAll = false
    }) {
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
            // 判断该节点标题是否匹配关键字
            let titleMatch = false;
            if (clearAll) {
              item.checked = false;
            }
            // 如果折叠所有节点
            if (fold) {
              item.expand = false;
            } else {
              // 判断当前node id 是否等于目标id
              if (
                !clearAll &&
                targetIds.length > 0 &&
                targetIds.findIndex(v => v == item.id) > -1
              ) {
                pidArr.push(item.id);
                if (pid) {
                  pidArr.push(pid);
                }
                item.checked = true;
              } else if (!item.checked) {
                // 如果原item.checked未选中，则设置item.checked为false
                item.checked = false;
              }
              item.hidden = true;
              if (filterStr) {
                titleMatch = item["title"].indexOf(filterStr) > -1;
                if (titleMatch) {
                  item.hidden = false;
                }
              }
            }

            if (item.children && Array.isArray(item.children)) {
              // 如果父节点title匹配，则跳出本次循环
              if (!item.hidden && filterStr) {
                item.expand = false;
                continue;
              }
              if (!fold) {
                item.expand = true
              }
              let newObj = _setTreeExpand({
                dataList: item.children,
                targetIds,
                pid: item.id,
                pidArr,
                fold,
                filterStr
              });
              // 设置 expand 属性
              if (filterStr) {
                // 过滤查询
                // 判断子节点是否有显示
                let hasChildrenShow = newObj.dataList.some(obj => !obj.hidden);
                if (hasChildrenShow) {
                  item.hidden = false;
                  item.expand = true;
                } else if (titleMatch) {
                  item.hidden = false;
                  item.expand = false;
                } else {
                  item.hidden = true;
                  item.expand = false;
                }
              } else {
                let pidIndex = newObj.pidArr.findIndex(v => v == item.id);
                if (pidIndex > -1 || !fold) {
                  pidArr.push(pid);
                  item.expand = true;
                } else {
                  item.expand = false;
                }
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
        pidArr: [],
        fold: false
      });
    },
    //获取选中及半选节点
    getCheckedAndIndeterminateNodes() {
      return this.$refs["tree"].getCheckedAndIndeterminateNodes();
    },
    // 获取被选中的节点
    getSelectedNodes() {
      return this.$refs["tree"].getSelectedNodes();
    },
    // 获取被勾选的节点
    getCheckedNodes() {
      return this.$refs["tree"].getCheckedNodes();
    },

    // clearAll() {
    //   this.setCheckedNodes();
    // },
  }
};
</script>
