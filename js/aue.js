/*!
 * Aue.js v1.0.4
 * (c) 2021 Lxc
 * Released under the Apache-2.0 License.
 */
document.write("<script src='https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js'><\/script>");const aue={};const aueMethod={};const monitorTable=[];const modelTable=[];class Aue{constructor(global){try{this.el=global.el;this.data=global.data;this.methods=global.methods;Aue.init(this.data,this.methods);Aue.loadEl(this.el);}catch(err){Aue.error(err.message);}}
welcome(){let welcomeHtml;const p=document.createElement('p');p.style.width='100%';p.style.textAlign='center';p.style.fontSize='50px';p.style.height='40px';p.innerText='Aue.js';welcomeHtml=p.outerHTML;p.style.fontSize='25px';p.innerText='Welcome to Aue.js!';welcomeHtml+=p.outerHTML;$(this.el).html(welcomeHtml);}
static init(data,methods){for(var key in data){Aue.setMonitor(key);aue[key]=data[key];}
for(var key in methods){aueMethod[key]=methods[key];}}
static loadEl(el){function loadDiv(el){var child=el.firstChild;while(child!=null&&child!=el.lastChild){if(child.nodeType==1){if(child.innerText.match(/{{(.+)}}/g)!==null)
Aue.setInnerText(child,child.innerText,true);if(child.hasAttribute('a-value'))
Aue.setValue(child,child.getAttribute("a-value"),true);if(child.hasAttribute('a-model'))
Aue.setModel(child,true);if(child.hasAttribute('a-checked'))
Aue.setChecked(child,child.getAttribute("a-checked"),true);if(child.hasAttribute('a-show'))
Aue.setShow(child,child.getAttribute("a-show"),true);if(child.hasAttribute('a-class'))
Aue.setClass(child,child.getAttribute("a-class"),true);if(child.hasAttribute('a-click'))
Aue.setClick(child);if(child.hasAttribute('a-for'))
Aue.setFor(child,child.getAttribute("a-for"));if(child.tagName==='DIV'||child.tagName==='UL'||child.tagName==='OL')
loadDiv(child);}
child=child.nextSibling;}}
loadDiv($(el).get(0));}
static setInnerText(child,initialValue,monitor){const variableName=initialValue.substring(initialValue.indexOf("{{")+2,initialValue.lastIndexOf("}}"));if(aue[$.trim(variableName)]===undefined)return;const variableValue=aue[$.trim(variableName)]===undefined?initialValue:aue[$.trim(variableName)];let newInnerText=initialValue.replace(new RegExp(variableName,"g"),variableValue);newInnerText=newInnerText.replace(new RegExp('{{',"g"),'');newInnerText=newInnerText.replace(new RegExp('}}',"g"),'');child.innerText=newInnerText;if(monitor&&!child.hasAttribute('a-once'))
Aue.addMonitor(child,'innerText',{'initialValue':initialValue},$.trim(variableName));}
static setValue(child,initialValue,monitor){const variableName=initialValue.substring(initialValue.indexOf("{{")+2,initialValue.lastIndexOf("}}"));if(aue[$.trim(variableName)]===undefined){child.value=initialValue;return;}
const variableValue=aue[$.trim(variableName)]===undefined?initialValue:aue[$.trim(variableName)];let newValue=initialValue.replace(new RegExp(variableName,"g"),variableValue);newValue=newValue.replace(new RegExp('{{',"g"),'');newValue=newValue.replace(new RegExp('}}',"g"),'');child.value=newValue;if(monitor&&!child.hasAttribute('a-once'))
Aue.addMonitor(child,'value',{'initialValue':initialValue},$.trim(variableName));}
static setModel(child,model){const variableName=child.getAttribute("a-model");if(aue[$.trim(variableName)]===undefined){return;}
const variableValue=aue[$.trim(variableName)]===undefined?variableName:aue[$.trim(variableName)];let newValue=variableName.replace(new RegExp(variableName,"g"),variableValue);switch(child.type){case'checkbox':case'radio':child.checked=newValue==='true'?true:false;if(model){$(child).bind("change",function(event){aue[$.trim(variableName)]=$(this).is(':checked');});}
break;default:child.value=newValue;if(model){$(child).bind("input propertychange",function(event){aue[$.trim(variableName)]=$(child).val();});}
break;}
if(model)
Aue.addModel(child,'model',$.trim(variableName));}
static setChecked(child,initialValue,monitor){if(aue[$.trim(initialValue)]===undefined){return;}
const variableValue=aue[$.trim(initialValue)]===undefined?initialValue:aue[$.trim(initialValue)];child.checked=variableValue;if(monitor&&!child.hasAttribute('a-once'))
Aue.addMonitor(child,'checked',{'initialValue':initialValue},$.trim(initialValue));}
static setShow(child,initialValue,monitor){if(aue[$.trim(initialValue)]===undefined){return;}
const variableValue=aue[$.trim(initialValue)]===undefined?initialValue:aue[$.trim(initialValue)];child.style.display=variableValue?'block':'none';if(monitor&&!child.hasAttribute('a-once'))
Aue.addMonitor(child,'show',{'initialValue':initialValue},$.trim(initialValue));}
static setClass(child,initialValue,monitor){var childClass=eval('('+initialValue+')');for(var className in childClass){const variableValue=aue[$.trim(childClass[className])]
if(variableValue===undefined){continue;}
if(variableValue){$(child).addClass(className);}else{$(child).removeClass(className);}
if(monitor&&!child.hasAttribute('a-once'))
Aue.addMonitor(child,'class',{'initialValue':initialValue},$.trim($.trim(childClass[className])));}}
static setClick(child){const funName=child.getAttribute("a-click");child.addEventListener('click',function(){try{eval('aueMethod.'+funName+'(child)');}catch(err){Aue.error(funName+' is not a function');}});}
static setFor(child,initialValue){let objName=initialValue.substring(initialValue.lastIndexOf("in")+2,initialValue.length).trim();let keyName=initialValue.substring(0,initialValue.lastIndexOf("in")).trim();if(aue[$.trim(objName)]===undefined){return;}
child.removeAttribute("a-for");let rootHtml=$(child).prop("outerHTML");let childInnerText=child.innerText;for(let index=aue[objName].length-1;index>=0;index--){const variableName=childInnerText.substring(childInnerText.indexOf("{{")+2,childInnerText.lastIndexOf("}}"));let newValue=rootHtml;if($.trim(variableName)===keyName){newValue=childInnerText.replace(new RegExp(variableName,"g"),aue[objName][index]);newValue=newValue.replace(new RegExp('{{',"g"),'');newValue=newValue.replace(new RegExp('}}',"g"),'');newValue=rootHtml.replace(new RegExp(childInnerText,"g"),newValue);}
$(child).after(newValue);}
child.remove();}
static setMonitor(key){const v=key;Object.defineProperty(aue,key,{get:function(){return key;},set:function(value){key=value;for(const el of modelTable){let attribute=el['attribute'];if(el['key']===v)
switch(attribute){case'model':Aue.setModel(el['child'],false);break;}}
for(const el of monitorTable){let attribute=el['attribute'];let parameter=el['parameter'];if(el['key']===v)
switch(attribute){case'innerText':Aue.setInnerText(el['child'],parameter['initialValue'],false);break;case'value':Aue.setValue(el['child'],parameter['initialValue'],false);break;case'checked':Aue.setChecked(el['child'],parameter['initialValue'],false);break;case'show':Aue.setShow(el['child'],parameter['initialValue'],false);break;case'class':Aue.setClass(el['child'],parameter['initialValue'],false);break;}}}});}
static addModel(child,attribute,key){let temp={};temp['key']=key;temp['child']=child;temp['attribute']=attribute;modelTable.push(temp);}
static addMonitor(child,attribute,parameter,key){let temp={};temp['key']=key;temp['child']=child;temp['attribute']=attribute;temp['parameter']=parameter;monitorTable.push(temp);}
static error(err){console.error('[Aue] '+err);}};