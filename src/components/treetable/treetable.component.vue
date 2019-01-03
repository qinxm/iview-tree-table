<template>
  <div>
    <Table :show-header="showHeader" :row-class-name="rowClassName" :columns="columns" :data="dataList" 
     
      @on-expand="toExpand"
      >
    </Table>
  </div>
</template>
<script>
import Treetable from './treetable.component.vue'
import OptionsNode from './options.component.vue'
import CheckboxCell from './checkboxCell.component.vue'
export default {
  name: 'Treetable',
  components: {
    Treetable,
    OptionsNode,
    CheckboxCell
  },
  props: {
    children: Array,
    showHeader: Boolean,
    disabled: Boolean
  },
  watch: {
    children () {
      this.dataList = this.children
    },
  },
  data() {
    return {
      dataList: this.children,
      columns: [
      {
        title: 'selection',
        width: 60,
        render: (h, {row, column, index}) => {
          return h(CheckboxCell, {
            props: {
              indeterminate: row._indeterminate,
              checked: row._checked,
              disabled: this.disabled
            },
            on: {
              'on-change': (val) =>{
                this.toCheckedChange(row, val)
              }
            }
          })
        }
      },
      {
        type: "expand",
        width: 50,
        render: (h, { row, column, index }) => {
          return h(Treetable, {
            props: {
              children: row._pageList,
              showHeader: false,
              disabled: this.disabled
            },
            on: {
              'on-checked-keys-change': (data) => {
                let currentRow = this.dataList[index]
                currentRow._pageList = data
                this.toEmit()
              }
            }
          });
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
        render: (h, { row, column, index}) => {
          return h(OptionsNode, {
            props: {
              actionList: row._actionList,
              checkedChildren: row._checkedChildren,
              disabled: this.disabled
            },
            on: {
              'on-select-change': (data = []) => {
                let currentRow = this.dataList[index]
                this.setRowActionChecked(currentRow, data)
                this.toEmit()
              }
            }
          })
        }
      },
      ]
    }
  },
 
  methods: {
    // 设置按钮的_checked 属性
    setRowActionChecked (currentRow, data = []) {
      currentRow._checkedChildren = data
     
      // 设置按钮的_checked属性
      currentRow._actionList.map((o) => {
        if(_.indexOf(data, o.id) > -1) {
          o._checked = true
        } else {
          o._checked = false
        }
      })
    },
    getActions(row) {
      let childrenPages = []
      if (row && row.children) {
        if (Array.isArray(row.children)) {
          childrenPages = row.children.filter( o => o.type == '1')
        }
      }
      return childrenPages
    },
    rowClassName (row, index) {
      if (row._pageList.length == 0) {
        return 'role-expand-hide';
      } 
      return '';
    },
    toExpand(row, status) {
      row._expanded = status
      this.setDataList(row)
    },
    // 设置子页面
    setChildrenSelect(data, checked) {
      data._checked = checked
      this.setSelectActions(data, checked)
      data._pageList && data._pageList.map((item) => {
        this.setChildrenSelect(item, checked)
        return item
      })
    },
    // 设置按钮
    setSelectActions(data, checked) {
      if(data._actionList && data._actionList.length) {
        let checkedChildren = []
        data._actionList.map((item) => {
          item._checked = checked
          if (checked) {
            checkedChildren.push(item.id)
          }
        })
        data._checkedChildren = checkedChildren
      }
    },
    // 选择 checkbox 改变
    toCheckedChange(row, val) {
      this.setChildrenSelect(row, val)
      row._indeterminate = false
      this.setDataList(row);
    },
    toEmit() {
      this.$emit('on-checked-keys-change', this.dataList)
    },
    // 设置menuList的值
    setDataList(row) {
      let rowIndex = _.findIndex(this.dataList, o=> o.id == row.id);
      this.$set(this.dataList, rowIndex, row)
      this.toEmit()
    }
  }
}
</script>

