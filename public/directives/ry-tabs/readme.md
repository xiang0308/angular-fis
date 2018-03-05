### ry-tabs

* 页面选项卡

#### config配置

| 属性             | 类型          | 描述         |
| ---------------- | ------------- | ------------ |
| config           | object        |              |
| -> data          | array         |              |
| -> -> 0          |               |              |
| -> -> -> id      | string or int |              |
| -> -> -> text    | string or int |              |
| -> selectedIndex | int           | 选中索引     |
| -> change        | function      | 改变索引调用 |
|                  |               |              |



#### code 多个复选框
```html
<ry-tabs config="vm.tabsConfig" class="tabs"></ry-tabs>
```

```javascript
vm.tabsConfig = {
    data: [
        {
            id: 'declare',
            text: '申报记录'
        },
        {
            id: 'setting',
            text: '设置'
        }
    ],
    selectedIndex: 0,
    change: tabsChange
}

/**
 * [tabsChange tabs改变调用]
 * @param  {[type]} index [索引]
 * @param  {[type]} tab   [tab-Item]
 * @return {[type]}       [description]
 */
function tabsChange(index, tab) {
    // 默认数据双绑
    // vm.tabsChange.selectedIndex = index;
}
```
