# iview-tree-table

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
npm install iview-tree-table -S

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
  

数据源： 

```
