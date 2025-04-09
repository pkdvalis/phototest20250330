let vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
let vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);
const images = document.querySelectorAll("img");
let displayImages = [];
const totalImages = document.querySelectorAll("img").length;
let curImageDisplay;
const modal = document.querySelector(".overlay");


const pageTransition = () => {
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      let href = this.getAttribute("href");

      document.body.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = href;
      }, 500); // Duration matches the CSS transition
    });
  });
};


document.addEventListener("DOMContentLoaded", pageTransition);

document.addEventListener("keydown", (e) => {
  //load text
  console.log(e.code);
  if (e.code == "Escape") {
    closeModal();
  }
  if (e.code == "ArrowRight") {
    nextImage();
  }
  if (e.code == "ArrowLeft") {
    prevImage();
  }
});

function showMobileMenu() {
  document.getElementById("mobilemenu").classList.contains("hide")
    ? document.getElementById("mobilemenu").classList.remove("hide")
    : document.getElementById("mobilemenu").classList.add("hide");
}

function imgtoDiv() {
  vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  if (vw <= 480) {
    document.getElementsByClassName("menu")[0].classList.add("hide");
    document.getElementById("mobiletop").style.display = "block";
  } else if (
    document.getElementsByClassName("menu")[0].classList.contains("hide")
  ) {
    document.getElementsByClassName("menu")[0].classList.remove("hide");
    document.getElementById("mobiletop").style.display = "none";
    document.getElementById("mobilemenu").classList.add("hide");
  } else {
    document.getElementById("mobiletop").style.display = "none";
    document.getElementById("mobilemenu").classList.add("hide");
  }

  if (vw < 1200) {
    columns = 2;
  } else {
    columns = 3;
  }
  document.getElementsByClassName("gallery")[0].innerHTML = "";

  //add div columns
  let imgPerColumn = Math.floor(totalImages / columns);
  for (let column = 1; column <= columns; column++) {
    let newDiv = document.createElement("div");
    newDiv.id = "col" + column;
    document.getElementsByClassName("gallery")[0].appendChild(newDiv);
  }

  //add images to div columns
  for (let i = 0; i < totalImages; i += columns) {
    for (let column = 1; column <= columns; column++) {
  
      let image = i + column - 1;
      if (images.item(image)) {
        images.item(image).remove();
        images.item(image).onclick = function () {
          displayImg(image);
        };
        
        document.getElementById("col" + column).appendChild(images.item(image));
      }
    }
  }
}

window.addEventListener("resize", () => {
  imgtoDiv();
  if (!modal.classList.contains("hide")) {
    displayImg(curImageDisplay);
  }
});

function closeModal(e) {
  let tmp = document.querySelector("#displayimage")
  tmp.src = "";
  console.log(tmp)
  modal.classList.add("hide");
}

function displayImg(i) {
  curImageDisplay = i;
  console.log(vw, (vw > 480));

  modal.innerHTML = `
    <p class="close" onclick="closeModal()">Esc</p>
    <div class="videoBox">
        <iframe id="displayimage" src="" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"></iframe>
        </div>
       
    `;

    
  let displayImage = document.querySelector("#displayimage");
  console.log("displayImages[i].vid",displayImages[i].vid)
  displayImage.src = displayImages[i].vid;

  modal.classList.remove("hide");
  console.log("imagewidth", displayImage.offsetWidth);
  displayImage.addEventListener("click", null);
  modal.addEventListener(
    "click",
    (e) => {
      console.log(e.target);
      if (e.target == modal) {
        closeModal(e);
      }
    },
    false
  );
}

function nextImage() {
  displayImg((curImageDisplay + totalImages + 1) % totalImages);
}
function prevImage() {
  displayImg((curImageDisplay + totalImages - 1) % totalImages);
}

imgtoDiv();

//preload Display Images
for (let i = 0; i < totalImages; i++) {
  displayImages[i] = new Image();
  //console.log(displayImages[i],images.item(i))
  displayImages[i].vid = images
    .item(i)
    .getAttribute("vid");
    
  console.log("displayiamges", displayImages[i]);
}


//mobile swipe

var initialTouchX, initialTouchY,
 finalTouchX, finalTouchY;
var swipeThreshold = 50; 
var dynamicStyle = 
document.createElement("style");
document.body.
appendChild(dynamicStyle);


function handleTouch(startX, endX,
     onSwipeLeft, onSwipeRight) {
    var horizontalDistance = 
    finalTouchX - initialTouchX;
    var verticalDistance = 
    finalTouchY - initialTouchY;

    if (Math.abs(horizontalDistance) >
     Math.abs(verticalDistance) &&
      Math.abs(horizontalDistance) >
       swipeThreshold) {
        if (finalTouchX - 
            initialTouchX < 0) {
            onSwipeLeft(); 
        } else {
            onSwipeRight(); 
        }
    }
}


var swipeLeft = () => {
    nextImage()
};

var swipeRight = () => {
    
    prevImage()
};


window.onload = function () {
    window.addEventListener
    ('touchstart', function (event) {
        initialTouchX = 
        event.touches[0].clientX;
        initialTouchY =
         event.touches[0].clientY;
    });

    window.addEventListener
    ('touchend', function (event) {
        finalTouchX = event.
        changedTouches[0].clientX;
        finalTouchY = event.
        changedTouches[0].clientY;

        
        handleTouch(initialTouchX,
        finalTouchX, swipeLeft, swipeRight);
    });
};

