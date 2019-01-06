<template>
  <div>
    <Table
      :show-header="showHeader"
      :columns="columns"
      :data="dataList"
      @on-expand="toExpand"
    ></Table>
  </div>
</template>
<script>
import Treetable from "./treetable.component.vue";
import OptionsNode from "./options.component.vue";
import CheckboxCell from "./checkboxCell.component.vue";
export default {
  name: "Treetable",
  components: {
    Treetable,
    OptionsNode,
    CheckboxCell
  },
  props: {
    children: Array,
    showHeader: Boolean,
    readonly: Boolean
  },
  watch: {
    children() {
      this.dataList = this.children;
    }
  },
  data() {
    return {
      dataList: this.children,
      columns: [
        {
          title: "selection",
          width: 60,
          render: (h, { row, column, index }) => {
            return h(CheckboxCell, {
              props: {
                indeterminate: row._indeterminate,
                checked: row._checked,
                readonly: this.readonly
              },
              on: {
                "on-change": val => {
                  this.toCheckedChange(row, val);
                }
              }
            });
          }
        },
        {
          type: "expand",
          width: 50,
          render: (h, { row, column, index }) => {
            if (row._pageList && row._pageList.length) {
              return h(Treetable, {
                props: {
                  children: row._pageList,
                  showHeader: false,
                  readonly: this.readonly
                },
                on: {
                  "on-checked-keys-change": data => {
                    let currentRow = this.dataList[index];
                    currentRow._pageList = data;
                    this.toEmit();
                  }
                }
              });
            }
          }
        },
        {
          title: "Name",
          key: "name",
          width: 200
        },
        {
          title: "Options",
          key: "name",
          render: (h, { row, column, index }) => {
            if (row._actionList && row._actionList.length) {
              return h(OptionsNode, {
                props: {
                  actionList: row._actionList,
                  readonly: this.readonly
                },
                on: {
                  "on-select-change": (actionList = []) => {
                    console.log(actionList)
                    this.dataList[index]['_actionList'] = actionList
                    this.toEmit();
                  }
                }
              });
            }
          }
        }
      ]
    };
  },

  methods: {
    // 展开扩展列
    toExpand(row, status, rowIndex) {
      row._expanded = status;
      this.setDataList(row, rowIndex);
    },
    // 设置子页面
    setChildrenSelect(data, checked) {
      data._checked = checked;
      this.setSelectActions(data, checked);
      data._pageList &&
        data._pageList.map(item => {
          this.setChildrenSelect(item, checked);
          return item;
        });
    },
    // 设置按钮
    setSelectActions(data, checked) {
      if (data._actionList && data._actionList.length) {
        data._actionList.map(item => {
          item._checked = checked;
        });
      }
    },
    // 选择 checkbox 改变
    toCheckedChange(row, val) {
      this.setChildrenSelect(row, val);
      row._indeterminate = false;
      this.setDataList(row);
    },
    toEmit() {
      this.$emit("on-checked-keys-change", this.dataList);
    },
    // 设置menuList的值
    setDataList(row) {
      let rowIndex = _.findIndex(this.dataList, o => o.id == row.id);
      this.$set(this.dataList, rowIndex, row);
      this.toEmit();
    }
  }
};
</script>

