# Aue.js
This is a js framework!

Usage
``` js
<script src="aue.js"></script>
```

or
``` js
<script src="//cdn.jsdelivr.net/gh/xc912/aue.js@1.0.6/js/aue.js"></script>
```

Create an instance of Aue:
``` js
var am = new Aue({
  // options
})
```

Data:
``` js
var am = new Aue({
    data: {
        msg: 'Hello Aue.js'
    }
});
```

Methods:
``` js
var am = new Aue({
    methods: {
        fn: function(self) {
            console.log(self.value);
        }
    }
});
```

Binding data:
``` html
<span>Message: {{ msg }}</span>
<input a-value="Message: {{ msg }}" />
<input type="checkbox" a-checked="isChecked" />
<input type="button" a-value="switch isChecked" a-click="switchChecked" />

<script>
var app = new Aue({
    el: "#app",
    data: {
        msg: 'Welcome to Aue.js!',
		isChecked: true
    },
	methods: {
		switchChecked: function(self) {
			aue.isChecked = !aue.isChecked;
		}
	}
});
</script>
```

Binding data (once):
``` html
<span a-once>Message: {{ msg }}</span>
```

Click event:
``` html
<button a-click="fn"></button>
```

Update data:
``` html
<div id="app">
    <input type="button" a-click="fn" a-value="Message: {{ msg }}" />
<div/>
  
<script>
var app = new Aue({
    el: "#app",
    data: {
        msg: 'Welcome to Aue.js!'
    },
    methods: {
        fn: function(self) {
            aue.msg = 'Hello Aue.js';
        }
    }
});
</script>
```

Update data synchronously:
``` html
<div id="app">
    <input a-model="value" />
    <input a-model="value" />
	<input type="radio" a-model="value" />
	<input type="checkbox" a-model="value" />
    <p>{{ value }}</p>
<div/>
  
<script>
var app = new Aue({
    el: "#app",
    data: {
        value: 'Welcome to Aue.js!'
    }
});
</script>
```

Conditional rendering:
``` html
<style>
	.red {
		background-color: red;
		width: 80px;
		height: 80px;
		margin: 0 auto;
	}
</style>

<div id="app">
	<div a-show="isShow" class="red"></div>
	<input type="button" a-value="switch isShow" a-click="switchShow" />
<div/>
  
<script>
var app = new Aue({
    el: "#app",
    data: {
        isShow: true
    },
	methods: {
		switchShow: function() {
			aue.isShow = !aue.isShow;
		}
	}
});
</script>
```

Dynamic class:
``` html
<style>
	.red {
		background-color: red;
		width: 80px;
		height: 80px;
		margin: 0 auto;
	}
	
	.big {
		width: 200px;
		height: 200px;
	}
</style>

<div id="app">
	<div a-class="{ red: 'isActive', big: 'isBig'}"></div>
	<input type="button" a-value="switch isActive" a-click="switchActive" />
	<input type="button" a-value="switch isBig" a-click="switchBig" />
<div/>
  
<script>
var app = new Aue({
    el: "#app",
    data: {
		isActive: true,
		isBig: false
    },
	methods: {
		switchActive: function() {
			aue.isActive = !aue.isActive;
		},
		switchBig: function() {
			aue.isBig = !aue.isBig;
		}
	}
});
</script>
```

List rendering
``` html
<div id="app">
	<ol>
		<li a-for="item in list">{{ item }}</li>
	</ol>
<div />

<script>
	var app = new Aue({
	el: "#app",
	data: {
		list: ['Red', 'Green', 'Blue', 'Pink', 'Yellow'],
	}
});
</script>
```