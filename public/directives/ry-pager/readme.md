### ry-pager

* 分页组件

#### config配置

| 属性           | 类型     | 描述     |
| -------------- | -------- | -------- |
| config         | object   |          |
| -> data        | object   |          |
| -> -> page     | number   | 页码     |
| -> -> pageSize | number   | 每页个数 |
| -> change      | function | 页码修改 |
|                |          |          |



#### code

```html
<ry-pager config="vm.machineListPagerConfig"></ry-pager>
```

```javascript
vm.machineListPagerConfig = {
   data: {
        page: 1,
        pageSize: 10
   },
   change: pageChange
};

function pageChange(pageIndex) {
    vm.machineListPagerConfig.data.page = pageIndex;
}
```
