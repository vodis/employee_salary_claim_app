window.onload = function () {
  setTimeout(function () {
    let loader = document.querySelector('.loader');
    loader.remove();
  }, 500);

  function clearActive(name) {
    for (let i = 0; i < name.length; i++) {
      name[i].classList.remove('active');
    }
  }

  //networks change
  let netParentLinks = document.querySelectorAll('.networks-link');
  let netLinks = document.querySelectorAll('.networks-link .networks__link');
  for (let i = 0; i < netLinks.length; i++) {
    netLinks[i].onclick = function () {
      let active = document.querySelector('.networks__active');
      active.classList.remove('notavailable');
      clearActive(netParentLinks);
      let activeHTML = this.innerHTML;
      let btn = document.querySelector('.networks__btn');
      btn.innerHTML = activeHTML;
      let parentEl = this.closest('.networks-link');
      parentEl.classList.add('active');
      return false;
    };
  }

  //language change
  let lgParentLinks = document.querySelectorAll('.languages-link');
  let lgLinks = document.querySelectorAll('.languages-link .languages__link');
  for (let i = 0; i < lgLinks.length; i++) {
    lgLinks[i].onclick = function () {
      let active = document.querySelector('.languages__active');
      active.classList.remove('notavailable');
      clearActive(lgParentLinks);
      let activeHTML = this.innerHTML;
      let btn = document.querySelector('.languages__btn');
      btn.innerHTML = activeHTML;
      let parentEl = this.closest('.languages-link');
      parentEl.classList.add('active');
      return false;
    };
  }

  //sort change
  let sortLinks = document.querySelectorAll('.sort__link');
  for (let i = 0; i < sortLinks.length; i++) {
    sortLinks[i].onclick = function () {
      clearActive(sortLinks);
      this.classList.add('active');
      let activeHTML = this.innerHTML;
      let btn = document.querySelector('.sort__btn');
      btn.classList.add('active');
      btn.innerHTML = activeHTML;

      return false;
    };
  }

  //views
  let viewsLinks = document.querySelectorAll('.views__link');
  for (let i = 0; i < viewsLinks.length; i++) {
    viewsLinks[i].onclick = function () {
      clearActive(viewsLinks);
      viewsLinks[i].classList.add('active');
    };
  }

  //top tabs
  let topTabs = document.querySelectorAll('.top-tabs__tab');
  for (let i = 0; i < topTabs.length; i++) {
    topTabs[i].onclick = function () {
      clearActive(topTabs);
      topTabs[i].classList.add('active');
    };
  }

  //wallet id cut
  let walletId = 0;
  let walletSpan = document.querySelectorAll('.wallet-id');

  for (let i = 0; i < walletSpan.length; i++) {
    walletId = walletSpan[i].innerHTML.trim();
    let shortAddress = walletId.slice(0, 5);
    shortAddress += '...';
    shortAddress += walletId.slice(-4);
    walletSpan[i].innerHTML = shortAddress;
  }

  //copy address
  let btnCopy = document.querySelector('.popup__copy');
  if (btnCopy) {
    btnCopy.onclick = function () {
      navigator.clipboard.writeText(walletId);
      btnCopy.classList.add('copied');
      setTimeout(function () {
        btnCopy.classList.remove('copied');
      }, 2000);
      return false;
    };
  }

  //addresses show
  let btnAddressShow = document.querySelector('.addresses__show');
  if (btnAddressShow) {
    btnAddressShow.onclick = function () {
      let addressBlock = document.querySelector('.addresses-group');
      if (this.classList.contains('active')) {
        this.classList.remove('active');
        addressBlock.classList.remove('active');
      } else {
        this.classList.add('active');
        addressBlock.classList.add('active');
      }
      return false;
    };
  }

  //add address, cancel address
  let btnConfirm = document.querySelector('.btn-confirm');

  if (btnConfirm) {
    btnConfirm.onclick = function () {
      let textConfirm = document.querySelector('#input-add').value;

      let shortAddress = textConfirm.trim().slice(0, 10);
      shortAddress += '...';
      shortAddress += textConfirm.slice(-8);

      let text =
        '<li class="list-group-item"><button type="button" class="btn btn-delete-address" data-bs-toggle="modal" data-bs-target="#deleteAddress" data-address="' +
        textConfirm +
        '"><span>' +
        shortAddress +
        '</span></button><a href="#" class="address-copy"><img src="images/copy.svg" alt=""></a><img src="images/copied.svg" alt="" class="copied"></li>';
      let containerAddress = document.querySelector('.addresses-group .list-group');
      containerAddress.insertAdjacentHTML('beforeend', text);
      document.querySelector('#input-add').value = '';

      let elemClose = this.closest('.modal-footer').querySelector('.btn-cancel');
      elemClose.click();
    };
  }

  let myModalEl = document.getElementById('addAddress');
  myModalEl.addEventListener('hidden.bs.modal', function (event) {
    openAccount();
  });

  let myModalEl3 = document.getElementById('deleteAddress');
  myModalEl3.addEventListener('hidden.bs.modal', function (event) {
    openAccount();
  });

  function openAccount() {
    let elemModal2 = document.querySelector('#accountModal');
    let modal2 = new bootstrap.Modal(elemModal2);
    modal2.show();
  }

  //address block
  let fullAddresses = document.querySelectorAll('.addresses-group .list-group-item');
  for (let i = 0; i < fullAddresses.length; i++) {
    let fullAddress = fullAddresses[i].querySelector('button span').innerHTML.trim();
    let shortAddress = fullAddress.slice(0, 10);
    shortAddress += '...';
    shortAddress += fullAddress.slice(-8);
    fullAddresses[i].querySelector('button span').innerHTML = shortAddress;
    fullAddresses[i].querySelector('button').setAttribute('data-address', fullAddress);
  }

  let myModalEl2 = document.getElementById('deleteAddress');
  let button;
  myModalEl2.addEventListener('show.bs.modal', function (event) {
    button = event.relatedTarget;
    let buttonAddress = button.getAttribute('data-address');
    this.querySelector('.modal-text').innerHTML = buttonAddress;
  });

  let btnDel = document.querySelector('.btn-del');

  btnDel.onclick = function () {
    //console.log(button);
    if (button) {
      button = button.parentElement;
      button.parentElement.removeChild(button);
    }

    let elemClose = this.closest('.modal-footer').querySelector('.btn-cancel');
    elemClose.click();
  };

  //address copy
  document.body.addEventListener('click', function (event) {
    let target = event.target.closest('.address-copy');
    if (!target) return;
    let textAddress = target.parentElement.querySelector('button').getAttribute('data-address');
    //console.log(textAddress);
    navigator.clipboard.writeText(textAddress);
    target.parentElement.classList.add('copied');
    setTimeout(function () {
      target.parentElement.classList.remove('copied');
    }, 2000);
    return false;
  });

  //cards
  let buttons = document.querySelectorAll('.line-item__top');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function (e) {
      let parentEl = this.closest('.line-item');
      let answer = parentEl.querySelector('.line-item__bottom');

      if (parentEl.classList.contains('active')) {
        answer.style.height = 0 + 'px';
        parentEl.classList.remove('active');
      } else {
        parentEl.classList.add('active');
        let height1 = answer.scrollHeight + 20;
        answer.style.height = height1 + 'px';
      }
    };
  }

  let details = document.querySelectorAll('.grid-item__details');
  for (let i = 0; i < details.length; i++) {
    details[i].onclick = function (e) {
      let parentEl = this.closest('.grid-item');
      let answer = parentEl.querySelector('.grid-item__bottom');

      if (parentEl.classList.contains('active')) {
        answer.style.height = 0 + 'px';
        parentEl.classList.remove('active');
      } else {
        parentEl.classList.add('active');
        let height1 = answer.scrollHeight + 20;
        answer.style.height = height1 + 'px';
      }
    };
  }

  //only mine
  //let checkOnly = document.querySelector('.personal__checkbox input');
  //console.log(checkOnly);

  //change content
  let textModal = document.getElementById('textModal');
  textModal.addEventListener('show.bs.modal', function (event) {
    let button = event.relatedTarget;
    let text = button.nextSibling.nextSibling.innerHTML;
    textModal.querySelector('.popup__wrap').innerHTML = text;
  });

  textModal.addEventListener('hidden.bs.modal', function (event) {
    textModal.querySelector('.popup__wrap').innerHTML = ' ';
  });

  //tabs
  let tabs = document.querySelectorAll('.nav-pills .nav-link');
  let tabText = document.querySelectorAll('.tabs .tab');

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function (e) {
      e.preventDefault();
      tabs[i].classList.add('active');
      tabText[i].classList.add('active');
      for (let m = 0; m < tabs.length; m++) {
        if (i != m) {
          tabs[m].classList.remove('active');
        }
      }
      for (let m = 0; m < tabText.length; m++) {
        if (i != m) {
          tabText[m].classList.remove('active');
        }
      }
    });
  }

  function progressView() {
    let diagramBox = document.querySelectorAll('.diagram');
    diagramBox.forEach((box) => {
      let deg = (360 * box.dataset.percent) / 100 + 180;
      if (box.dataset.percent >= 50) {
        box.classList.add('over_50');
      } else {
        box.classList.remove('over_50');
      }
      box.querySelector('.piece.right').style.transform = 'rotate(' + deg + 'deg)';
    });
  }
  progressView();
};
