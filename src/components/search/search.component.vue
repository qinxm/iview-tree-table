<template>
  <div :class="prefixCls">
    <div style="display: flex; padding-bottom: 10px;line-height:32px;">
      <label v-if="searchLabel" class="ivu-form-item-label" style="width: 85px;">{{searchLabel}}</label>
			
      <Input
        v-model="currentQuery"
        :icon="icon"
        :placeholder="placeholder"
        
        @on-click="handleClick"
      ></Input>
    </div>
  </div>
</template>
<script>
export default {
  name: "Search",
  props: {
    prefixCls: String,
    placeholder: String,
    query: String,
    searchLabel: String
  },
  data() {
    return {
      currentQuery: this.query
    };
  },
  watch: {
    query(val) {
      this.currentQuery = val;
    },
    currentQuery(val) {
      this.$emit("on-query-change", val);
    }
  },
  computed: {
    icon() {
      return this.query === "" ? "ios-search" : "ios-close-circle";
    }
  },
  methods: {
    handleClick() {
      if (this.currentQuery === "") return;
      this.currentQuery = "";
      this.$emit("on-query-clear");
    }
  }
};
</script>
