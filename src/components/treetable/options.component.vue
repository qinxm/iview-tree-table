<template>
  <div class="role-options">
    <div class="role-options-options">
      <CheckboxGroup v-model="copyCheckedChildren" @on-change="changeOptionsChecked()">
        <Checkbox
          v-for="item in copyActionList"
          :key="item.id"
          class="role-checkbox"
          :label="item.id"
          :style="{pointerEvents: pointEvent}"
        >
          <span>{{item.name}}</span>
        </Checkbox>
      </CheckboxGroup>
      
    </div>
  </div>
</template>
<script>
export default {
  name: "OptionsNode",
  props: {
    actionList: Array,
    checkedChildren: Array,
    disabled: false
  },
  data() {
    return {
      pointEvent: this.disabled ? 'none' : 'inherit',
      _checkAll: false,
      indeterminate: false,
      copyCheckedChildren: this.checkedChildren,
      copyActionList: this.actionList,

    };
  },
  methods: {
    updateDataList() {
      this.dataList = _.cloneDeep(this.children)
    },
    changeOptionsChecked() {
      this.onSelectChange()
    },
    onSelectChange() {
      this.$emit('on-select-change', this.copyCheckedChildren)
    }
  }
};
</script>
