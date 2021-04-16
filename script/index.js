const form__url = document.querySelector(".form__url");
let urlInput = document.querySelector(".url");
const btnSubmit = document.querySelector(".btn__submit");
const shortenedUrls = document.querySelector(".shortenedUrls");

form__url.addEventListener("submit", function (e) {
  e.preventDefault();
  let urlContent = urlInput.value.trim();
  const inputLink = document.querySelector(".url").value.trim();
  if (urlContent === "") {
    form__url.classList.add("error");
    document.querySelector(".error-message").style.opacity = 1;
    return;
  } else {
    form__url.classList.remove("error");
    document.querySelector(".error-message").style.opacity = 0;

    (async function () {
      try {
        const urlApi = ` https://api.shrtco.de/v2/shorten?url=${urlContent}`;
        //   console.log(urlApi);
        const res = await fetch(urlApi);
        if (!res.ok) {
          throw new Error("invalid url");
        } else {
          const data = await res.json();
          console.log(data.result.short_link2);

          const shortenedUrl = data.result.short_link2;

          const html = `
            <div class="urls">
              <p class="paragraph__primary inputLink">
                ${inputLink}
              </p>
              <div class="result">
                <p class="paragraph__primary shortenedLink">
                  ${shortenedUrl}
                </p>
                <button class="btn btn__rectangle copy">Copy</button>
              </div>
            </div>

          `;
          shortenedUrls.insertAdjacentHTML("beforeend", html);
          document.querySelector(".url").value = "";
          const copyBtns = document.querySelectorAll(".copy");

          copyBtns.forEach((btn) => {
            btn.addEventListener("click", function (e) {
              let res = e.target.parentNode.childNodes[1].textContent;
              navigator.clipboard.writeText(res);
              btn.textContent = "Copied!";
              setTimeout(() => {
                btn.textContent = "Copy";
              }, 1000);
            });
          });
        }
      } catch (error) {
        console.error(error.message);
      }
    })();
  }
});

///////////////////////////////////
//////// btn ripple effect
////////////////////////////////////////
const buttons = document.querySelectorAll(".btn");

buttons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const x = e.clientX;
    const y = e.clientY;

    const btnTop = e.target.offsetTop;
    const btnLeft = e.target.offsetLeft;

    const xInside = x - btnLeft;
    const yInside = y - btnTop;

    const circle = document.createElement("span");
    circle.classList.add("circle");
    circle.style.top = yInside + "px";
    circle.style.left = xInside + "px";

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 500);
  });
});
