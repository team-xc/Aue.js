document.write("<script src='https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js'><\/script>");

const aue = {};
const aueMethod = {};
const monitorTable = [];

class Aue {
	constructor(global) {
		try {
			this.el = global.el;
			this.data = global.data;
			this.methods = global.methods;
			Aue.init(this.data, this.methods);
			Aue.loadEl(this.el);
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
		function loadDiv(el) {
			var child = el.firstChild;
			while (child != el.lastChild) {
				if (child.nodeType == 1) {
					if (child.tagName === 'DIV') {
						loadDiv(child);
					} else {
						if (child.innerText.match(/{{(.+)}}/g) !== null) {
							Aue.setInnerText(child, child.innerText, true);
						}
						if (child.hasAttribute('text')) {
							Aue.setText(child, child.getAttribute("text"), true);
						}
						if (child.hasAttribute('click')) {
							Aue.setClick(child);
						}
					}
				}
				child = child.nextSibling;
			}
		}
		loadDiv($(el).get(0));
	}

	static setInnerText(child, InitialValue, monitor) {
		const variableName = InitialValue.substring(InitialValue.indexOf("{{") + 2, InitialValue.lastIndexOf("}}"));
		if (aue[$.trim(variableName)] === undefined) return;
		const variableValue = aue[$.trim(variableName)] === undefined ? InitialValue : aue[$.trim(variableName)];
		let newInnerText = InitialValue.replace(new RegExp(variableName, "g"), variableValue);
		newInnerText = newInnerText.replace(new RegExp('{{', "g"), '');
		newInnerText = newInnerText.replace(new RegExp('}}', "g"), '');
		child.innerText = newInnerText;
		if (monitor)
			Aue.addMonitor(child, 'innerText', {
				'InitialValue': InitialValue
			}, $.trim(variableName));
	}

	static setText(child, InitialValue, monitor) {
		const variableName = InitialValue.substring(InitialValue.indexOf("{{") + 2, InitialValue.lastIndexOf("}}"));
		if (aue[$.trim(variableName)] === undefined) {
			child.value = InitialValue;
			return;
		}
		const variableValue = aue[$.trim(variableName)] === undefined ? InitialValue : aue[$.trim(variableName)];
		let newValue = InitialValue.replace(new RegExp(variableName, "g"), variableValue);
		newValue = newValue.replace(new RegExp('{{', "g"), '');
		newValue = newValue.replace(new RegExp('}}', "g"), '');
		child.value = newValue;
		if (monitor)
			Aue.addMonitor(child, 'text', {
				'InitialValue': InitialValue
			}, $.trim(variableName));
	}

	static setClick(child) {
		const funName = child.getAttribute("click");
		child.addEventListener('click', function() {
			try {
				child.text = child.value;
				eval('aueMethod.' + funName + '(child)');
			} catch (err) {
				Aue.error(funName + ' is not a function');
			}
		});
	}

	static setMonitor(key, key2) {
		const v = key;
		Object.defineProperty(aue, key, {
			get: function() {
				return key;
			},
			set: function(value) {
				key = value;
				for (const el of monitorTable) {
					let attribute = el['attribute'];
					let parameter = el['parameter'];
					if (el['key'] === v)
						switch (attribute) {
							case 'innerText':
								Aue.setInnerText(el['child'], parameter['InitialValue'], false);
								break;
							case 'text':
								Aue.setText(el['child'], parameter['InitialValue'], false);
								break;
						}
				}
			}
		});
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
