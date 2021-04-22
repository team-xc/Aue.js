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
```

Click event:
``` html
<button click="fn"></button>
```

Update data:
``` html
<div id="app">
    <input type="button" click="fn" text="Message: {{ msg }}" />
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
