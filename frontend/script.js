
    $("mic").textContent = "🎙 LISTENING";
  };

  recognition.onresult = event => {
    const transcript =
      event.results[0][0].transcript.trim();
    $("cmd").value = transcript;
    $("chatForm"].requestSubmit();
  };

  recognition.onerror = event => {
    status("MIC ERROR: " + event.error);
  };

  recognition.onend = () => {
    listening = false;
    $("mic").textContent = "🎙 MIC";
    if (!busy) status("SYSTEM ONLINE");
  };
}

$("mic").addEventListener("click", () => {
  if (!recognition) {
    showReply(
      "Speech recognition is not supported by this browser. " +
      "Try a supported browser or type your command."
    );
    return;
  }

  if (listening) {
    recognition.stop();
    return;
  }

  try {
    recognition.start();
  } catch (error) {
    showReply("Microphone could not start. Try again.");
  }
});

$("stopVoice").addEventListener("click", () => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  if (recognition && listening) recognition.stop();
  status("VOICE STOPPED");
});

$("clear").addEventListener("click", () => {
  history.length = 0;
  $("history").replaceChildren();
  showReply("Conversation cleared, Boss.");
  status("SYSTEM ONLINE");
});

// Call shortcut opens the phone dialer for confirmation.
$("callBtn").addEventListener("click", () => {
  const number = $("phoneNumber").value.trim();

  if (!number || !/^[+\d\s().-]{3,25}$/.test(number)) {
    showReply("Enter a valid phone number first, Boss.");
    return;
  }

  $("callLink").href = "tel:" + number.replace(/[^\d+]/g, "");
  window.location.href = $("callLink").href;
});
</script>
</body>
</html>
