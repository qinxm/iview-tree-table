 /* eslint-disable */ 

<template>
  <div class="tree-container">
    <Search
      prefix-cls="tree-search"
      :query="query"
      :searchLabel="searchLabel"
      @on-query-clear="handleQueryClear"
      @on-query-change="handleQueryChange"
      :placeholder="filterPlaceholder"
    ></Search>
    <tree-table
      v-if="showTree"
      :readonly="readonly"
      :children="dataList"
      @on-checked-keys-change="handleCheckedKeysChange"
    ></tree-table>
  </div>
</template>
<script>
import TreeTable from "./treetable.component.vue";
import Search from "../search/search.component.vue";
export default {
  name: "TreeTableIndex",
  components: {
    TreeTable,
    Search
  },
  props: {
    selectAll: {
      type: Boolean,
      default: false
    },
    // 是否只读
    readonly: {
      type: Boolean,
      default: false
    },
    // 数据
    children: Array,
    // 默认选择id列表
    selectedList: Array,
    // 展开所有节点
    expandAll: {
      type: Boolean,
      default: true
    },
    expandLevel: {
      type: Number,
      default: 0
    },
    // 搜索框label
    searchLabel: {
      type: String,
      default: ""
    },
    // 搜索框关键字
    filterPlaceholder: {
      type: String,
      default: "请输入关键字进行过滤"
    }
  },
  data() {
    return {
      dataList: [],
      showTree: true,
      menuSet: new Set(),
      selectedSet: new Set(),
      query: ''
    };
  },
  created() {
    this.handleTree()
  },
  methods: {
    handleTree() {
      if (this.children) {
        // 将传入的数组转为Set类型
        if (this.selectedList && this.selectedList.length) {
          this.selectedSet = new Set(this.selectedList);
        }
        // 初始化数据
        this.$set(
          this,
          "dataList",
          this.resetDataList(this.formateData(this.children))
        );
        this.$emit("on-checked-keys-change", this.dataList, this.menuSet);
      }
    },
    // 检验_checked是否选中
    isChecked(id) {
      return (this.selectedSet && this.selectedSet.has(id)) || this.selectAll;
    },
    // 判断该节点是否需要展开
    isMatchFilter(title) {
      if (title && this.query && title.indexOf(this.query) > -1) {
        return true
      } else {
        return false
      }
    },
    // 处理数据
    formateData(dataList = [], level = 1) {
      return dataList.map(item => {
        let o = {};
        o.id = item.id;
        o.name = item.name;
        o._actionList = [];
        o._pageList = [];
        o._checked = this.isChecked(item.id);
        o.level = level;
        o._matched = this.isMatchFilter(o.name)
        Array.isArray(item.children) &&
          item.children.map(obj => {
            debugger
            let a = {
              id: obj.id,
              name: obj.name,
              _checked: this.isChecked(obj.id),
              _matched: this.isMatchFilter(obj.name)
            };
            if (obj.type == "1") {
              o._actionList.push({
                ...a
              });
            }
            if (obj.type == "0") {
              o._pageList.push({
                ...a,
                children: obj.children
              });
            }
          });
        // 如果存在子页面, 则进行子页面遍历
        if (o._pageList.length) {
          o._expanded = this.expandAll;
          // 展开层级
          if (!this.expandAll && this.expandLevel && level <= this.expandLevel) {
            o._expanded = true
          } 
          let hasActionMatched = o._actionList.some(obj => obj._matched);
          let hasPageMatched = o._pageList.some(obj => obj._matched);
          
          if (o.name =='四级菜单1111') {
            debugger
          }
          o._matched = o._matched || hasActionMatched || hasPageMatched;
          
          

          let pages = item.children.filter(o => o.type == "0");
          o._pageList = this.formateData(pages, level + 1);

         

        } else {
          // 如果不存在子页面，则禁用当前行展开功能
          o._disableExpand = true;
        }

        if (!o._expanded) {
          o._matched  = o._matched || o._actionList.some(obj => obj._matched ) ||  o._pageList.some(obj => obj._matched )
          if (o._pageList.length) {
            o._expanded = o._matched
          }
        } 
        return o;
      });
    },
    // 选择项发生改变
    handleCheckedKeysChange(dataList) {
      this.menuSet.clear();
      this.$set(this, "dataList", this.resetDataList(dataList));
      this.$emit("on-checked-keys-change", this.dataList, this.menuSet);
      this.selectedSet = this.menuSet
      
    },
    // 重置dataList的 _checked, _indeterminate
    resetDataList(list) {
      return list.map(row => {
        this.setRowAttributes(row);
        return row;
      });
    },
    setRowAttributes(row) {
      if (row._pageList && row._pageList.length) {
        row._pageList.map(p => {
          this.setRowAttributes(p);
        });
      }
      // 将子页面和子按钮放在一个数组中
      let children = row._pageList.concat(row._actionList);
      

      // 无子页面 和 无子按钮
      if (!children.length) {
        if (row._checked) {
          this.menuSet.add(row.id);
        }
        return
      };

      let hasChildrenChecked = children.some((obj) =>  obj._checked);
      let hasChildrenUnChecked = children.some((obj) =>  !obj._checked);
      let hasChildrenIndeterminate = children.some((obj) =>  obj._indeterminate);

      // 子页面和子按钮 全选中
      if (
        hasChildrenChecked &&
        !hasChildrenUnChecked &&
        !hasChildrenIndeterminate
      ) {
        row._indeterminate = false;
        row._checked = true;
      } else if (!hasChildrenChecked) {
        // 子页面和子按钮 都未选中
        row._indeterminate = false;
        row._checked = false;
      } else {
        // 子页面或者子按钮 有选中情况
        row._indeterminate = true;
        row._checked = true;
      }
      // 将所选择的菜单id和按钮id添加到menuSet中
      if (row._checked) {
        children.forEach(item => {
          if (item._checked) {
            this.menuSet.add(item.id);
          }
        });
        this.menuSet.add(row.id);
      }
    },
    handleQueryClear() {

    },
    handleQueryChange(val) {
      this.showTree = false
      this.query = val;
      this.handleTree()
      this.showTree = true
    }
  }
};
</script>
