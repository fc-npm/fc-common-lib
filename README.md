# Query-composer  
为不同格式的数据生成外部链接的 url 参数提供功能性函数。  

## 提示
本库只处理生成 query 参数的工作，不处理前缀 ?，请开发者自行添加。

## Usage  
**fromObject**  

```javascript
import * as QueryComposer from 'query-composer';
QueryComposer.fromObject({});
```