let mute = false;
let mystream;

// client creation
let client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

// initialized the client
client.init("f769e1b0516841b89ba3aa2c992ab7c5");

// creating the channel
client.join(
  "006f769e1b0516841b89ba3aa2c992ab7c5IAB9yWb2QjqFPjYHHggG0FqyMxNlwc1G07iqny6+grZT4aDfQtYAAAAAEABsKo0tzzDsYAEAAQDPMOxg",
  "demo",
  null,
  (uid) => {
    // Create a local stream
    let localStream = AgoraRTC.createStream({
      audio: true,
      video: true,
    });
    localStream.init(() => {
      mystream = localStream;
      localStream.play("local");
      client.publish(localStream);
    });
  }
);

client.on("stream-added", function (evt) {
  client.subscribe(evt.stream);
});

client.on("stream-subscribed", function (evt) {
  let stream = evt.stream;
  let streamId = String(stream.getId());
  let right = document.getElementById("remote");
  let div = document.createElement("div");
  div.id = streamId;
  right.appendChild(div);
  stream.play(streamId);
});

function muteAudio() {
  mystream.muteAudio();
}

function unmuteAudio() {
  mystream.unmuteAudio();
}
