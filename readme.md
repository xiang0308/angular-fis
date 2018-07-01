# angular开发文档

### 1.项目准备及介绍

##### 	1.1拉取代码

​		代码仓库：http://git.internal.rongyi.com/

##### 	1.2安装环境

​		建议安装`node7.0.0`以下版本https://nodejs.org/en/blog/release/v6.2.0/

​		`npm i -g fis`

​		`npm i -g fis-angular`

##### 	1.3项目介绍

​		整个代码是通过angular开发，路由里面通过`mod.js`加载依赖文件，页面加载顺序是

```
index.html-->public/main/app-->business/项目名/router-->各子模块router
```

### 2.项目结构
```tree
├─.bowerrc                            	// bower的文件代理
├─.gitignore                          	//git设置忽略的文件
├─.bower.json	                		// bower的配置文件
├─.eslintrc                     		// eslint的配置文件
├─.gitignore                          	// git忽略上传的文件
├─build.sh                           	// shell脚本
├─fis-conf.js                           // fis的配置文件
├─server.conf							// 服务配置文件
├─test									//测试文件夹
├─public                         		// 公用文件
|	├─bower_components					// 公用组件
|	├─directives						// 公用指令
|  	|	└─directives.js					// 引入公用指令
|  	├─lib								// 库文件
|	├─services							// 公用服务
|  	|	└─services.js					// 引入公用服务
|	├─styles							// 公用样式
|	├─main
|  	|	└─app.js						// 程序入口
├─business               				// 页面业务逻辑文件夹                  
|  	├─index.html						// 页面业务逻辑主文件 
|  	├─action							// redux的action的配置 
|  	├─constants                       	// 状态机的常量
|  	├─directives                        // 业务逻辑指令
|  	|	└─directives.js					// 引入公用指令
|  	├─filters                           // 业务逻辑过滤器
|  	├─main                            	
|  	|   └─main.js                    	// 业务逻辑主文件
|  	├─reducer                         	// redux的reduce的配置
|  	├─router                            // 业务逻辑的路由
|  	|   └─router.js
|  	├─ry_ops							// 业务逻辑页面文件夹
|  	|   └─ry_ops.js						// 业务逻辑页面配置
|  	├─services                          // 业务逻辑服务文件夹
|  	|   └─services.js					// 业务逻辑服务配置
```

### 3.项目运行

#### 				3.1全局安装`fis-angular`

​		`npm i -g fis-angular`

#### 				3.2项目发布到远程

​		`fisa release -cwd remote`（大运营）

​		`fisa release -cwd rd`（商家后台）

​		remote，rd在`fis-conf.js`中查看配置

#### 			3.3项目发布到本地

​		`fisa release -cwL`

​		（1）文件夹`nginx-cms-windows`配置`nginx`	

​		（2）新增host```127.0.0.1 fe3.rongyi.com ```

​	 	（3）修改`conf/nginx.conf` 文件	

​			替换
​    			```root   "D:\\Users\\weijie\\AppData\\Local\\.fis-angular-tmp\\www\\"```
​			为你对应的目录，自己的目录打开命令 ```fisa server open```

​		（4）启动 start.bat

​		（5）关闭 stop.bat

### 5.项目部署

#### 	4.1代码通过git推送到远程

### 6.其他

#### 	6.1公共组件说明

|         公共组件名称         |        公共组件描述         |
| :--------------------: | :-------------------: |
|   convert-to-number    | 下拉框默认是string，自动转换成int |
|         crumb          |          面包屑          |
|         dialog         |          弹出框          |
|       max-length       |        控制输入框长度        |
|    ng_indeterminate    |        单选框半选状态        |
|      ry-mall-list      |        关联商场列表         |
|     ry_mall_search     |        关联商场搜索         |
|        ry-page         |         分页指令          |
| ry-trading-area-search |       省市区商圈级联指令       |
|      ry-checkbox       |       简单封装的复选框        |
|        ry-close        |        弹窗的关闭组件        |
|        ry-dash         |         一个虚线框         |
|     ry-datepicker      |      日期选择控件（old）      |
|        ry-error        |        表单错误提示         |
|         ry-hl          |    高亮表单form-group     |
|        ry-label        |  简单封装bootstrap-label  |
|      ry-lay-date       |    lay-date 日期选择控件    |
|       ry-min-max       |       给数字输入框限制        |
|     ry-observe-src     |        监控src变化        |
|        ry-pager        |         分页组件          |
|        ry-radio        |       简单封装的复选框        |
|       ry-select2       |  封装 jq select2 下拉选插件  |
|        ry-star         |       表单提交显示必填项       |
|        ry-tabs         |         页面选项卡         |
|       ry-upload        |         上传组件          |
|     ry-upload-btn      |        上传按钮组件         |
|   ry-upload-preview    |        上传图片预览         |
|        sidebar         |        侧边栏菜单指令        |