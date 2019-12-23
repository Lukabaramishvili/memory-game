

  const cards = document.querySelectorAll('.memory-card');
  const h3 = document.querySelector('.h3')


  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;



  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip')

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    // hasFlippedCard = false;

    checkForMatch();
  }

  function checkForMatch() {
    if (firstCard.dataset.shape === secondCard.dataset.shape) {
      disableCard();
      return;
    }

    unflipCards();
  }

  function disableCard() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      // lockBoard = false;
      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  (function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  })();


  let counter = 0

  cards.forEach(card => card.onclick = function() {
    counter += 1;
    h3.innerHTML = `Clicked ${counter} Times`;
  })




  cards.forEach(card => card.addEventListener('click', flipCard));
