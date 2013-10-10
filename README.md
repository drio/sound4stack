## sound4stack

[stack](https://github.com/mbostock/stack) is a javascript presentation library.
[Sound4stack](https://github.com/mbostock/sound4stack) extends [stack](https://github.com/mbostock/stack)
so we can associate and play sounds for each slide.

### Usage

Build your presentation with [stack](https://github.com/mbostock/stack).
[Sound4stack](https://github.com/mbostock/sound4stack) checks in the ```sounds/``` directory for
the sounds associated with the slides. We associate sounds by creating a mp3 file within ```sounds/```
where the name matches the number of the slide. For example, if you want a sound on the first slide (#0),
you would create an mp3 file in ```sounds/0.mp3```.

Finally, source sound4stack at the end of you index.html file:

```html
...
<script src="d3.v3.min.js"></script>
<script src="stack.v0.js"></script>
<script src="sound.v0.js"></script>
```

When going over the slides press ```'s'``` if you want to play the sound associated with the current
slide.
