<template>
  <div class="tree-container">
    <tree-table
    :disabled="disabled"
    :children="dataList"
    @on-checked-keys-change="handleCheckedKeysChange"
    ></tree-table>
  </div>
</template>
<script>
import TreeTable from "./treetable.component.vue";

export default {
  name: "TreeTableIndex",
  components: {
    TreeTable
  },
  props: {
    disabled: Boolean,
    dataList: Array
  },
  data() {
    return {
      menuSet: new Set(),
      roleMenuSet: new Set()
    }
  },
  methods: {
    // 处理数据
    updateDataList(dataList) {
      return dataList.map(item => {
        let o = {};
        o.id = item.id;
        o.name = item.name;
        o._actionList = [];
        o._pageList = [];
        o._checked = false;
        item.children.map(obj => {
          if (obj.type == "1") {
            o._actionList.push({
              id: obj.id,
              name: obj.name,
              _checked: false
            });
          }
          if (obj.type == "0") {
            o._pageList.push({
              id: obj.id,
              name: obj.name,
              _checked: false,
              children: obj.children
            });
          }
        });
        o._pageList = item.children.filter(o => o.type == "0");
        if (o._pageList && o._pageList.length > 0) {
          o._pageList = this.updateDataList(o._pageList);
        }
        return o;
      });
    },
    handleCheckedKeysChange(dataList) {
      this.menuSet.clear();
      this.roleMenuSet.clear();
      this.dataList = dataList
      this.resetDataList(this.dataList)
      this.$emit('on-checked-keys-change', this.dataList, this.menuSet)
    },
    // 重置dataList的 _checked, _indeterminate 属性
    resetDataList(list) {
      list.map(row => {
        this.setRowAttributes(row);
      });
    },
    setRowAttributes(row) {
      if (row._pageList && row._pageList.length) {
        row._pageList.map(p => {
          this.setRowAttributes(p);
        });
      }
      let children = row._pageList.concat(row._actionList);

      // 如果已选择的角色存在，则选中
      children.map(o => {
        if (this.roleMenuSet.has(o.id)) {
          o._checked = true;
        }
        return o;
      });
      // 遍历按钮 如果存在，则选中
      let checkedChildren = [];
      row._actionList.map(o => {
        if (this.roleMenuSet.has(o.id)) {
          checkedChildren.push(o.id);
        }
      });
      if (checkedChildren.length) {
        row._checkedChildren = checkedChildren;
      }

      let childrenCount = children.length;
      let hasChildrenChecked = _.some(children, { _checked: true });
      let hasChildrenUnChecked = _.some(children, { _checked: false });
      let hasChildrenIndeterminate = _.some(children, { _indeterminate: true });
      let hasChildrenUnIndeterminate = _.some(children, {
        _indeterminate: false
      });
      // 无子页面 和 无子按钮
      if (!childrenCount) {
        return;
      }
      // 子页面和子按钮 全选中
      if (
        hasChildrenChecked &&
        !hasChildrenUnChecked &&
        !hasChildrenIndeterminate
      ) {
        row._indeterminate = false;
        row._checked = true;
      } else if (!hasChildrenChecked) {
        // 子页面和字按钮 都未选中
        row._indeterminate = false;
        row._checked = false;
      } else {
        row._indeterminate = true;
        row._checked = true;
      }
      // 将所有选择的菜单ID添加到menuSet中
      if (row._checked) {
        _.filter(children, { _checked: true }).map(o => {
          this.menuSet.add(o.id);
        });
        this.menuSet.add(row.id);
      }
    },
  },
};
</script>
