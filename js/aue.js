/*!
 * MIT License
 * Copyright (c) 2021 Lxc
 */
document.write("<script src='https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js'><\/script>");

const aue = {};
const aueMethod = {};
const monitorTable = [];
const modelTable = [];

class Aue {
	constructor(global) {
		try {
			this.el = global.el;
			this.data = global.data;
			this.methods = global.methods;
			Aue.init(this.data, this.methods);
			Aue.load(this.el);
		} catch (err) {
			Aue.error(err.message);
		}
	}

	welcome() {
		let welcomeHtml;

		const p = document.createElement('p');
		p.style.width = '100%';
		p.style.textAlign = 'center';
		p.style.fontSize = '50px';
		p.style.height = '40px';
		p.innerText = 'Aue.js';
		welcomeHtml = p.outerHTML;

		p.style.fontSize = '25px';
		p.innerText = 'Welcome to Aue.js!';
		welcomeHtml += p.outerHTML;

		$(this.el).html(welcomeHtml);
	}

	static init(data, methods) {
		for (var key in data) {
			Aue.setMonitor(key);
			aue[key] = data[key];
		}
		for (var key in methods) {
			aueMethod[key] = methods[key];
		}
	}

	static loadEl(el) {
		var child = el.firstChild;
		while (child != null && child != el.lastChild) {
			if (child.nodeType == 1) {
				if (child.hasAttribute('a-for')) {
					const initialValue = child.getAttribute("a-for");
					child.removeAttribute('a-for');
					Aue.setFor($(child).prop("outerHTML"), child.parentElement, initialValue, true, child
						.hasAttribute('a-once'));
				} else {
					if (child.innerText.match(/{{(.+)}}/g) !== null)
						Aue.setInnerText(child, child.innerText, true);

					if (child.hasAttribute('a-value'))
						Aue.setValue(child, child.getAttribute("a-value"), true);

					if (child.hasAttribute('a-model'))
						Aue.setModel(child, child.getAttribute("a-model"), true);

					if (child.hasAttribute('a-checked'))
						Aue.setChecked(child, child.getAttribute("a-checked"), true);

					if (child.hasAttribute('a-show'))
						Aue.setShow(child, child.getAttribute("a-show"), true);

					if (child.hasAttribute('a-class'))
						Aue.setClass(child, child.getAttribute("a-class"), true);

					if (child.hasAttribute('a-click'))
						Aue.setClick(child);

					child.removeAttribute('a-click');
					child.removeAttribute('a-show');
					child.removeAttribute('a-class');
					child.removeAttribute('a-checked');
					child.removeAttribute('a-value');
					child.removeAttribute('a-model');

					Aue.loadEl(child);
				}
			}
			child = child.nextSibling;
		}
	}

	static load(el) {
		Aue.loadEl($(el).get(0));
	}

	static setInnerText(child, initialValue, monitor) {
		const variableName = initialValue.substring(initialValue.indexOf("{{") + 2, initialValue
			.lastIndexOf("}}"));
		if (aue[$.trim(variableName)] === undefined) return;
		const variableValue = aue[$.trim(variableName)] === undefined ? initialValue : aue[$.trim(
			variableName)];
		let newInnerText = initialValue.replace(new RegExp(variableName, "g"), variableValue);
		newInnerText = newInnerText.replace(new RegExp('{{', "g"), '');
		newInnerText = newInnerText.replace(new RegExp('}}', "g"), '');
		child.innerText = newInnerText;

		if (monitor && !child.hasAttribute('a-once'))
			Aue.addMonitor(child, 'innerText', {
				'initialValue': initialValue
			}, $.trim(variableName));
	}

	static setValue(child, initialValue, monitor) {
		const variableName = initialValue.substring(initialValue.indexOf("{{") + 2, initialValue
			.lastIndexOf("}}"));
		if (aue[$.trim(variableName)] === undefined) {
			child.value = initialValue;
			return;
		}
		const variableValue = aue[$.trim(variableName)] === undefined ? initialValue : aue[$.trim(
			variableName)];
		let newValue = initialValue.replace(new RegExp(variableName, "g"), variableValue);
		newValue = newValue.replace(new RegExp('{{', "g"), '');
		newValue = newValue.replace(new RegExp('}}', "g"), '');
		child.value = newValue;

		if (monitor && !child.hasAttribute('a-once'))
			Aue.addMonitor(child, 'value', {
				'initialValue': initialValue
			}, $.trim(variableName));
	}

	static setModel(child, variableName, model) {
		if (aue[$.trim(variableName)] === undefined) {
			return;
		}
		const variableValue = aue[$.trim(variableName)] === undefined ? variableName : aue[$.trim(
			variableName)];
		let newValue = variableName.replace(new RegExp(variableName, "g"), variableValue);
		switch (child.type) {
			case 'checkbox':
			case 'radio':
				child.checked = newValue === 'true' ? true : false;
				if (model) {
					$(child).bind("change", function(event) {
						aue[$.trim(variableName)] = $(this).is(':checked');
					});
				}
				break;
			default:
				child.value = newValue;
				if (model) {
					$(child).bind("input propertychange", function(event) {
						aue[$.trim(variableName)] = $(child).val();
					});
				}
				break;
		}

		if (model)
			Aue.addModel(child, 'model', {
				'variableName': variableName
			}, $.trim(variableName));
	}

	static setChecked(child, initialValue, monitor) {
		if (aue[$.trim(initialValue)] === undefined) {
			return;
		}
		const variableValue = aue[$.trim(initialValue)] === undefined ? initialValue : aue[$.trim(
			initialValue)];
		child.checked = variableValue;

		if (monitor && !child.hasAttribute('a-once'))
			Aue.addMonitor(child, 'checked', {
				'initialValue': initialValue
			}, $.trim(initialValue));
	}

	static setShow(child, initialValue, monitor) {
		if (aue[$.trim(initialValue)] === undefined) {
			return;
		}
		const variableValue = aue[$.trim(initialValue)] === undefined ? initialValue : aue[$.trim(
			initialValue)];
		child.style.display = variableValue ? 'block' : 'none';

		if (monitor && !child.hasAttribute('a-once'))
			Aue.addMonitor(child, 'show', {
				'initialValue': initialValue
			}, $.trim(initialValue));
	}

	static setClass(child, initialValue, monitor) {
		var childClass = eval('(' + initialValue + ')');
		for (var className in childClass) {
			const variableValue = aue[$.trim(childClass[className])]
			if (variableValue === undefined) {
				continue;
			}
			if (variableValue) {
				$(child).addClass(className);
			} else {
				$(child).removeClass(className);
			}
			if (monitor && !child.hasAttribute('a-once'))
				Aue.addMonitor(child, 'class', {
					'initialValue': initialValue
				}, $.trim($.trim(childClass[className])));
		}
	}

	static setClick(child) {
		const funName = child.getAttribute("a-click");
		child.addEventListener('click', function() {
			try {
				eval('aueMethod.' + (funName.indexOf("(") != -1 ? funName : funName + '(child)'));
			} catch (err) {
				Aue.error(funName + ' is not a function');
			}
		});
	}

	static setFor(rootHtml, parent, initialValue, monitor, aOnec) {
		let objName = initialValue.substring(initialValue.lastIndexOf("in") + 2, initialValue.length).trim();
		let keyName = initialValue.substring(0, initialValue.lastIndexOf("in")).trim();

		if (aue[$.trim(objName)] === undefined) {
			return;
		}

		let tempRootHtml = rootHtml;
		parent.innerHTML = "";
		for (let index in aue[objName]) {
			let newValue = tempRootHtml.replace(new RegExp('\{\{\\s+index\\s+\}\}', "g"), index);
			newValue = newValue.replace(new RegExp('\{\{\\s+' + keyName + '\\s+\}\}', "g"), aue[objName][index]);
			parent.innerHTML += newValue;
		}

		parent.innerHTML += ' ';
		Aue.loadEl(parent);

		if (monitor && !aOnec)
			Aue.addMonitor('', 'for', {
				'rootHtml': rootHtml,
				'parent': parent,
				'initialValue': initialValue
			}, $.trim(objName));
	}

	static setMonitor(key) {
		const v = key;
		Object.defineProperty(aue, key, {
			get: function() {
				return key;
			},
			set: function(value) {
				key = value;
				for (const el of modelTable) {
					let attribute = el['attribute'];
					let parameter = el['parameter'];
					if (el['key'] === v)
						switch (attribute) {
							case 'model':
								Aue.setModel(el['child'], parameter['variableName'], false);
								break;
						}
				}
				for (const el of monitorTable) {
					let attribute = el['attribute'];
					let parameter = el['parameter'];
					if (el['key'] === v)
						switch (attribute) {
							case 'innerText':
								Aue.setInnerText(el['child'], parameter['initialValue'],
									false);
								break;
							case 'value':
								Aue.setValue(el['child'], parameter['initialValue'], false);
								break;
							case 'checked':
								Aue.setChecked(el['child'], parameter['initialValue'],
									false);
								break;
							case 'show':
								Aue.setShow(el['child'], parameter['initialValue'], false);
								break;
							case 'class':
								Aue.setClass(el['child'], parameter['initialValue'], false);
								break;
							case 'for':
								Aue.setFor(parameter['rootHtml'], parameter['parent'], parameter[
									'initialValue'], false);
								break;
						}
				}
			}
		});
	}

	static addModel(child, attribute, parameter, key) {
		let temp = {};
		temp['key'] = key;
		temp['child'] = child;
		temp['attribute'] = attribute;
		temp['parameter'] = parameter;
		modelTable.push(temp);
	}

	static addMonitor(child, attribute, parameter, key) {
		let temp = {};
		temp['key'] = key;
		temp['child'] = child;
		temp['attribute'] = attribute;
		temp['parameter'] = parameter;
		monitorTable.push(temp);
	}

	static error(err) {
		console.error('[Aue] ' + err);
	}
};
