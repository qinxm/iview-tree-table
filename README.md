# iview-tree-table 
浏览地址：http://180.76.157.124:8081/iviewtreetable/index.html
```
1. 基于iview 组件库的table实现的树级table, 可用于权限控制页面的菜单和按钮选择。
2. 扩展iview tree 组件，增加设置默认节点选中功能，和清空选项功能。

```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Use
```
<tree-table
    :readonly="readonly"
    :children="dataList"
    :selectedList="initSelected"
    :expandAll="expandAll"
    :expandLevel="expandLevel"
    @on-checked-keys-change="handleCheckedKeysChange"

data() {
    return {
        readonly: false,
        expandAll: false,
        expandLevel: 1,
        // treetable的数据源 层级
        dataList: [{
            id: 10000,
            name: '菜单',
            type: '0',
            children: [{
                id: 10001,
                name: '按钮',
                type: '1'
            }]
        }]
        // 初始化选中的菜单和按钮id
        initSelected: [ 1077, 749, 10000]
    }
},
methods: {
    /**
     * 按钮选中后触发该事件
     * dataList: 绑定的数据源
     * menuSet: 包含所有选中的菜单和按钮id
     */
    handleCheckedKeysChange(dataList, menuSet) {
      console.log(dataList)
      console.log(menuSet)
    }
}
   
2. QTree 扩展iview tree
  <q-tree ref="Qtree" :data="dataList" showCheckbox titleKey="name" :selectIds="selectIds"></q-tree>

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
```
