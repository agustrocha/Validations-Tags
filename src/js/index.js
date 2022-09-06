// TAGS FUNCTIONALITY
let tags = ["2D", "3D", "Animation", "ART", "Audio", "Charity", "Collectible", "DAO", "DeFi", "GameFi", "Gaming", "Generative", "Membership", "Metaverse", "Music", "PFP", "Play To Earn", "Ticket", "Utility", "Video"];
let addedTags = [];
let tagInput = document.querySelector(".tags");
let tagsContainer = document.querySelector(".filteredTags-container");
let addedTagsContainer = document.querySelector(".addedTags-container");

tagInput.addEventListener("input", (e) => {
  let text = e.target.value;
  if (text !== "") {
    tagsContainer.classList.remove("hidden");
    addTags(text);
  } else {
    tagsContainer.classList.add("hidden");
  }
});
tagInput.addEventListener("keypress", (e) => {
  let text = e.target.value;
  if (e.key === "Enter" && tags.includes(text)) {
    tagsContainer.querySelectorAll(".tagContainer").forEach(t => {
      if (t.textContent === text) {
        t.click();
      }
    });
  }
});

function addTags(input) {
  tagsContainer.innerHTML = "";
  let filteredTags = tags.filter(t => t.toLowerCase().includes(input.toLowerCase()) && !addedTags.includes(t));

  if (filteredTags.length === 0) {
    tagsContainer.classList.add("hidden");
  } else {
    filteredTags.forEach(t => {
      let tag = document.createElement("div");
      tag.textContent = t;
      tag.classList.add("tagContainer");
      tag.addEventListener("click", (e) => {
        addTag(e);
      });
      tagsContainer.appendChild(tag);
    });
  }
}

function createTag(tagText) {
  let tag = document.createElement("div");
  let text = document.createElement("p");
  let close = document.createElement("div");

  tagsContainer.classList.add("hidden");
  tag.classList.add("tag");
  close.classList.add("tag_close");

  text.textContent = tagText;
  close.textContent = "x";

  close.addEventListener("click", (e) => {
    removeTag(e);
  });

  tag.appendChild(text);
  tag.appendChild(close);
  addedTagsContainer.appendChild(tag);
}

function addTag(e) {
  addedTags.push(e.target.textContent);
  createTag(e.target.textContent);
  addedTagsContainer.classList.remove("hidden");
}

function removeTag(e) {
  addedTagsContainer.innerHTML = "";
  let index = addedTags.findIndex(t => t === e.target.previousSibling.textContent);
  if (index !== -1) {
    addedTags.splice(index, 1);
    console.log(addedTags);
    addedTags.forEach(t => {
      createTag(t);
    });
  }
}

// VALIDATIONS

document.querySelector("button").addEventListener("click", validateForm);

function validateForm() {
  let nameInput = document.querySelector("#collection_name");
  let emailInput = document.querySelector("#contact_email");
  let desriptionInput = document.querySelector("#description");
  let supplyInput = document.querySelector("#supply");
  let mintPrice = document.querySelector("#mint_price");
  let mintDateInput = document.querySelector("#mint_date");
  // tags is called from the addedTags variable!
  let featuredImageInput = document.querySelector("#featured_image");
  let isValid;


  let nameValidation = checkValidations(nameInput, "text");
  let emailValidation = checkValidations(emailInput, "email");
  let descriptionValidation = checkValidations(desriptionInput, "text");
  let supplyValidation = checkValidations(supplyInput, "number");
  let mintPriceValidation = checkValidations(mintPrice, "number");
  let mintDateValidation = checkValidations(mintDateInput, "date");
  let featuredImageValidation = checkValidations(featuredImageInput, "file");
  let tagsValidation = checkValidations(addedTags, "tags");

  nameValidation && emailValidation && descriptionValidation && supplyValidation && mintPriceValidation
  && mintDateValidation && featuredImageValidation && tagsValidation
    ? isValid = true
    : isValid = false;

  return isValid;
}

function checkValidations(input, type) {
  let isValid = false;
  let emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  let today = new Date();

  switch (type) {
  case "text":
    if (input.value === "") {
      isValid = false;
      input.nextElementSibling.classList.remove("hidden");
    } else {
      isValid = true;
      input.nextElementSibling.classList.add("hidden");
    }
    break;
  case "email":
    if (input.value === "" || !input.value.match(emailRegEx)) {
      isValid = false;
      input.nextElementSibling.classList.remove("hidden");
    } else {
      isValid = true;
      input.nextElementSibling.classList.add("hidden");
    }
    break;
  case "number":
    if (input.value < 0 || !input.value || input.value === "") {
      isValid = false;
      input.nextElementSibling.classList.remove("hidden");
    } else {
      isValid = true;
      input.nextElementSibling.classList.add("hidden");
    }
    break;
  case "file":
    if (input.value === "") {
      isValid = false;
      input.nextElementSibling.classList.remove("hidden");
    } else {
      isValid = true;
      input.nextElementSibling.classList.add("hidden");
    }
    break;
  case "date":
    if (input.value === "" || input.valueAsDate.getTime() <= today.getTime()) {
      isValid = false;
      input.nextElementSibling.classList.remove("hidden");
    } else {
      isValid = true;
      input.nextElementSibling.classList.add("hidden");
    }
    break;
  case "tags":
    if (input.length === 0) {
      isValid = false;
      document.querySelector("#tags_error").classList.remove("hidden");
    } else {
      isValid = true;
      document.querySelector("#tags_error").classList.add("hidden");
    }
    break;
  }

  return isValid;
}
