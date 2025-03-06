// 为了解决/deep/问题，需要在postcss.config.mjs中添加如下代码
import postcss from 'postcss'
import postcssSelectorParser from 'postcss-selector-parser'

export default {
    plugins:[
        postcss.plugin('replace-deep',()=>{
            return (root)=>{
                root.walkRules((rule)=>{
                    rule.selector=postcssSelectorParser((selectors)=>{
                        selectors.walk((selector)=>{
                            if(selector.type==='combinator'&&selector.value==='/deep/'){
                                selector.value='::v-deep ';
                            }
                        })
                    }).processSync(rule.selector);
                });
            }
        })
    ]
}// 此方法是 为了解决/deep/问题，