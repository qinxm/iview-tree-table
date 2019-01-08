<template>
  <div id="app">
     <Menu mode="horizontal" active-name="1">
        <MenuItem name="1" to="tree" >
            <Icon type="ios-paper" />
            Tree扩展树
        </MenuItem>
        <MenuItem name="2" to="treetable">
            <Icon type="ios-paper" />
            TreeTable树表格
        </MenuItem>
      </Menu>
    <div style="margin-top: 10px;">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Index from './views/tree/index.vue'

export default {
  name: 'app',
  components: {
    Index
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.mgt10 {
  margin-top: 10px;
}
</style>
