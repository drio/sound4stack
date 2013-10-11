(function() {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  var n_slides   = d3.selectAll("section")[0].length,
      source,
      context    = new AudioContext(),
      bufferList = [],   // slide number -> buffer sound
      urlList    = [];   // slide number -> sound url

  function loadBuffer(url, slide_number) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = function() {
      // Asynchronously decode the audio file data in request.response
      context.decodeAudioData(
        request.response,
        function(buffer) {
          if (!buffer) {
            alert('error decoding file data: ' + url);
            return;
          }
          bufferList[slide_number] = buffer;
          console.log('Loaded sound for slide num: ' + slide_number);
        },
        function(error) {
          console.log('No sound for slide num: ' + slide_number);
        }
      );
    };

    request.onerror = function() {
      alert('BufferLoader: XHR error');
    };

    request.send();
  }

  function stop() {
    if (source) source.stop(0);
  }

  // Play sound for slide number n
  function play(n) {
    stop();
    if (bufferList[n]) {
      source = context.createBufferSource();
      source.buffer = bufferList[n];
      source.connect(context.destination);
      source.start(0);
    }
    else {
      console.log("Can't play, slide " + n + " has no sound.");
    }
  }

  // Create the list of urls based on the number of slides available
  // and load all the sounds that are available
  for (var i = 0; i <= n_slides; ++i) {
    urlList[i] = "sounds/" + i + ".mp3";
    loadBuffer(urlList[i], i);
  }

  // We have different options on how to play the sounds
  // Method 1: when new slide, play sound (if exists)
  //    stack.on("activate.sound", play);
  // Method 2: The keypress event triggers the sound loading
  //
  // For the moment let's use Method 2, I will change it to
  // let the user setup what method they want
  d3.select(window).on("keydown.sound", function() {
    if (d3.event.keyCode === 83) // 's'
      play(stack.position());
  });

})();
