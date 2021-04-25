# Aue.js
This is a js framework!

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
            console.log(self.text);
        }
    }
});
```

Binding data:
``` html
<span>Message: {{ msg }}</span>
<input a-value="Message: {{ msg }}" />
<input type="checkbox" a-checked="checked" />
<input type="button" a-value="switch checked" a-click="switchChecked" />

<script>
var app = new Aue({
    el: "#app",
    data: {
        msg: 'Welcome to Aue.js!',
		checked: true
    },
	methods: {
		switchChecked: function(self) {
			aue.checked = !aue.checked;
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
    <input a-model="content" />
    <input a-model="content" />
	<input type="radio" a-model="content" />
	<input type="checkbox" a-model="content" />
    <p>{{ content }}</p>
<div/>
  
<script>
var app = new Aue({
    el: "#app",
    data: {
        content: 'Welcome to Aue.js!'
    }
});
</script>
```