launchSL.addEventListener("click", async () => {
  document.write(`<a href="/index.html?host=${document.getElementById("domain").value}" target="_blank" id="link"></a>`);
  document.getElementById("link").click();
});
