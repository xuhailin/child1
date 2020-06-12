
ng build --prod 会走angular.json configurations/production

1. ng build 打包出来的是 *-es2015.XXXhashXXX.js  *-es5.XXXXXhashXXX.js

```
// angular.json  configurations/production
outputHashing: none
// 如果开启了buildOptimizer，记得开启aot
buildOptimizer: true,
aot: true
```

2. ng build 打包出来的是 *-es2015.js  *-es5.js

```
tsconfig.json 
   - target: es5
```

3. 此时打包出来的有 main.js runtime.js polyfills-es5.js polyfills.js style.css

```
// 处理 style.css, 会弄成styles.js

// angular.json  configurations/production
 "extractCss": false,

// 处理polyfills-es5.js

// 在 polyfills.js文件中增加如下代码
// 我的core-js比较新，一般是core-js/es6 这里是 core-js/es

 /****************************
 * BROWSER POLYFILLS
 */

import 'core-js/es/symbol';
import 'core-js/es/object';
import 'core-js/es/function';
import 'core-js/es/parse-int';
import 'core-js/es/parse-float';
import 'core-js/es/number';
import 'core-js/es/math';
import 'core-js/es/string';
import 'core-js/es/date';
import 'core-js/es/array';
import 'core-js/es/regexp';
import 'core-js/es/map';
import 'core-js/es/weak-map';
import 'core-js/es/set';


```

4. 打包文件正常，其实还应该有个scripts.js 但是我的angular.json没有input吧，所以没有这个文件



5. package
我先用了gulp， 试过之后，发现打包出来的文件体积很小，不对劲，现在还是错的。
于是采用推荐的做法 注意修改一下自己的文件夹和文件名称，以及导出的文件

```

// For Windows:
"package": "jscat ./dist/angular-custom-elements/runtime.js ./dist/angular-custom-elements/polyfills.js ./dist/angular-custom-elements/scripts.js ./dist/angular-custom-elements/main.js > custom-button-element.js",

// For Mac or Linux:
"package": "cat ./dist/angular-custom-elements/runtime.js ./dist/angular-custom-elements/polyfills.js ./dist/angular-custom-elements/scripts.js ./dist/angular-custom-elements/main.js > custom-button-element.js",

```

6. 本地测试 http-serve
我也没去细看http-serve 到底怎么用，就是正常先install一个全局的吧，然后在根目录下建立一个index.html,引用我们打包出来的 elements.js

```

// npm
npm install -g http-serve


// 构建
npm run build

// 本项目的打包
npm run pak2

// 运行
http-serve

然后出错了。。
```

7. 出错原因 app-root 什么的， 因为我的内部html里面写了app-root，并且创建了appComponent，没有必要可以去除掉，去除之后记得重新上面的操作
**如果继续报错，app-root的，那就是js缓存的问题，清除一下**

8. 接下来会继续报错  Failed to construct 'HTMLElement': Please use the 'new' operator ，大概就是这个，是tslint config配置成ts5就会有的问题，在angular上有对应的解决方案 https://github.com/angular/angular/issues/24556
以下是我自己采用的方案

```
npm install --save @webcomponents/webcomponentsjs

// polyfills.ts文件添加如下代码

/***************************************************************************************************
 * APPLICATION IMPORTS
 */
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'; 

```

9. 经过以上，基本就没问题了，也可能还出现一个问题，大概就是shadow dom什么的，因为提前遇到过这个问题，我已经直接写了。 ViewEncapsulation.Native 导致的

```
/**
*
*    encapsulation: ViewEncapsulation.ShadowDom
*    Native一定会有问题的，或者使用一个element.attachShadow({ mode: 'open'}) 看上去也能行的样子，但是我没尝试成功。 angular 6.0.0上还没有ViewEncapsulation.ShadowDom, 6.1.0上有的，所以建议直接6.1.0以上
*/
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PatientListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

```

10. 引用到另一个文件中踩的坑，在container项目readme中说明

参考链接
  https://martinfowler.com/articles/micro-frontends.html#Run-timeIntegrationViaJavascript
  https://medium.com/@patrick1729/how-to-create-angular-6-custom-elements-web-components-c88814dc6e0a
  https://www.techiediaries.com/angular/angular-9-web-components-custom-elements-shadow-dom/
  gulp： https://www.jonhuu.com/sample-post/1099.html

继续：
  - 路由调研