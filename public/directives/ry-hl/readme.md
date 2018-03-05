### ry-hl

* 高亮表单form-group

#### config配置

| 属性         | 类型   | 描述                         |
| ------------ | ------ | ---------------------------- |
| config       | object |                              |
| -> isHl      | bool   | 是否高亮                     |
| -> mouseover | fn     | 鼠标移上去事件，例如清除高亮 |
|              |        |                              |

#### code

```html
<ry-hl config="vm.ryHlConfig">
    <div class="form-group">
      <label for=""></label>
      <input type="text" class="form-control" id="" placeholder="">
      <p class="help-block">Help text here.</p>
    </div>
</ry-hl>
```

```javascript
vm.ryHlConfig = {
    isHl: true,
    mouseover: function() {
        vm.ryHlConfig.isHl = false;
    }
}
```
