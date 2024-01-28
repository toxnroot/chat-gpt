const api = "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";
// const api = "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";

/* 
|======================================|
|         Get Element From Html        | 
|======================================|
*/
let images = document.getElementById("images");
let inp = document.getElementById("inp");
let send = document.getElementById("send");
let message = document.getElementById("msg");
let sel = document.getElementById("sel")

send.addEventListener("click", async () => {
  if (inp.value !== "") {
    loadImage();
    getResponse(getValue());
    console.log(getValue());
  } else {
    msgError("قم بادخال كلمة مفتاحية");     ``    ``      ``
  }
});

function getResponse(size) {
  axios
    .post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt: inp.value,
        n: 3,
        size: size,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${api}`,
        },
      }
    )

    .then((result) => {
      if (result.status == 200) {
        images.innerHTML = "";
        result.data.data.forEach((element) => {
          createImage(element.url);
        });
        message.style.display = "none";
      }
      console.log(result);
    })
    .catch((err) => {
      console.error(err.request.status);
      if (err.request.status == 429) {
        msgError("لقد قمت بارسال الطلبات كثيراً الرجاء الانتظار لحظة");
        errorImage();
      }
      if (err.request.status == 400) {
        msgError("حدث مشكلة ما قم بإعد الارسال");
        errorImage();
      }
      if (err.request.status == 0) {
        msgError("لا يوجد اتصال بالانترنت");
        errorImage();
      }
    })
    .finally(function () {
      // always executed
      console.log("always executed");
    });
}

function createImage(url) {
  let img = document.createElement("img");
  img.setAttribute("class", "test");
  img.src = url;
  images.append(img);
}

function loadImage() {
  images.innerHTML = `
  
  <i class="fa-solid fa-spinner load"></i>
  <i class="fa-solid fa-spinner load sc"></i>
  <i class="fa-solid fa-spinner load sc"></i>
  
  `;
}

function msgError(msg) {
  message.style.display = "flex";
  message.textContent = msg;

}

function errorImage() {
  images.innerHTML = `
      <i class="fa-solid fa-triangle-exclamation error"></i>
      <i class="fa-solid fa-triangle-exclamation error sc"></i>
      <i class="fa-solid fa-triangle-exclamation error sc"></i>
  
  `;
}

let quality = [
  {
    val: "1024x1024",
    name: "دقة الصورة HD"
},
  {
    val: "768x768",
    name: "دقة الصورة 768 px"
},
  {
    val: "512x512",
    name: "دقة الصورة 512 px"
},
  {
    val: "256x256",
    name: "دقة الصورة 256 px"
}
];

quality.forEach(element => {
  let option = document.createElement("option");
  option.setAttribute("value", element.val);
  option.textContent = element.name;
  sel.append(option);
});

function getValue(){
  let opsValue = sel.options[sel.selectedIndex].value;
  return opsValue
}

