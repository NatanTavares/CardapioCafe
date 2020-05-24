class AppController {
  constructor (menuOption, valueCoffee, additionalCard, contentPrincipal, headerApplication, textDescription, imgDescription,
    btnCancelDescription, btnMoreOne, btnMinusOne, btnConfirmDescription, countCoffee) {
    this.optionsCoffee = document.querySelectorAll(menuOption);
    this.priceCoffee = document.querySelectorAll(valueCoffee);
    this.additionalCard = document.querySelector(additionalCard);
    this.contentPrincipal = document.querySelector(contentPrincipal);
    this.header = document.querySelector(headerApplication);
    this.textDescription = document.querySelector(textDescription);
    this.imgDescription = document.querySelector(imgDescription);
    this.btnCancelDescription = document.querySelector(btnCancelDescription);
    this.btnMoreOne = document.querySelector(btnMoreOne);
    this.btnMinusOne = document.querySelector(btnMinusOne);
    this.btnConfirmDescription = document.querySelector(btnConfirmDescription);
    this.countCoffeeEl = document.querySelector(countCoffee);

    this.eventClickCoffee();
    this.resetCountCoffee();
    this.btnCancelCard();
    this.setPriceCoffees();
    this.onConfirm();
    //this.autoRefreshSite();
  }

  setPriceCoffees() {
    // Alterar função quando fazer a integração com o banco.
    // Função apenas visual !!!
    
    /** TABELA DE PREÇOS
     * 1 3,25
     * 2 3,00
     * 3 3,50
     * 4 1,50
     */
    this._priceOptions = [3.25, 3.00, 3.50, 1.50];
    console.log(this._priceOptions);
    this.priceCoffee.forEach((value, index) => {
      switch (index) {
        case 0:
          value.innerHTML = 'R$ ' + '3,25';
        break;

        case 1:
          value.innerHTML = 'R$ ' + '3,00';
        break;

        case 2:
          value.innerHTML = 'R$ ' + '3,50';
        break;

        case 3:
          value.innerHTML = 'R$ ' + '1,50';
        break;
        
        default: value.innerHTML = 'Sold out'
      }
    });
    
  }
  
  eventClickCoffee() {
    this.optionsCoffee.forEach((coffee, index) => {
      coffee.addEventListener('click', event => {
        this.contentDescription(coffee, index);
        this.toggleCardDescription();
        this._indexCoffee = index;
      });
    });

    this.btnMoreOne.addEventListener('click', this.incrementCount());

    this.btnMinusOne.addEventListener('click', this.Count());
  }

  btnCancelCard() {
    this.btnCancelDescription.addEventListener('click', e => {
      this.toggleCardDescription(false);
      this.resetCountCoffee();
    });
  }

  toggleCardDescription(validation = true) {
    if (validation) {
      this.additionalCard.style.display = 'grid';
      this.contentPrincipal.style.gridColumnStart = 2;
      this.header.style.gridColumnStart = 2;
      
    } else {
      this.additionalCard.style.display = 'none';
      this.contentPrincipal.style.gridColumnStart = 3;
      this.header.style.gridColumnStart = 3;
      this.resetCountCoffee();
    }
  }

  contentDescription(coffee, index) {
    switch (coffee.id) {
      case 'optionOne':
        this.imgDescription.src = `./img/cafe-1.jpg`;
        this.textDescription.innerHTML = 
        `
          <p>DESCRIÇÃO: Café <strong>Java<strong></p>
          <p>Preço: ${this.priceCoffee[index].innerText}</p>
        `;
      break

      case 'optionTwo':
        this.imgDescription.src = `./img/cafe-2.jpg`;
        this.textDescription.innerHTML = 
        `
          <p>DESCRIÇÃO: Café <strong>arábico</strong> com leite</p>
          <p><strong>Preço: ${this.priceCoffee[index].innerText}</strong></p>
        `;
      break

      case 'optionThree':
        this.imgDescription.src = `./img/cafe-3.jpg`;
        this.textDescription.innerHTML = 
        `
          <p>DESCRIÇÃO:<strong> Cappucino</strong></p>
          <p><strong>Preço: ${this.priceCoffee[index].innerText}</strong></p>
        `;
      break

      case 'optionFour':
        this.imgDescription.src = `./img/cafe-4.jpg`;
        this.textDescription.innerHTML = 
        `
          <p>DESCRIÇÃO: Café torrado com leite</p>
          <p><strong>Preço: ${this.priceCoffee[index].innerText}</strong></p>
        `;
      break

      default: this.textDescription.innerHTML = 
      `
        Entre em contato com o suporte\nnattantavares.s15@gmail.com
      `
    }  
  }

  incrementCount() {
    return () => this.countCoffeeEl.innerHTML++;
  }
    
  Count() {
    return () => this.countCoffeeEl.innerHTML--;
  }
    
  onConfirm() {
    this.btnConfirmDescription.addEventListener('click', event => {
      this.btnConfirm(this._indexCoffee);
    });
  }

  btnConfirm(index) {
    if (this.countCoffeeEl.innerText > 0) { 
      let multToCount = parseInt(this.countCoffeeEl.innerText);
      let multToPrices = this._priceOptions[index] * multToCount;

      alert(`Compra efetuada com sucesso!\nTotal: R$ ${multToPrices}`);
      this.toggleCardDescription(false);
    } else {
      alert('Adicione um item ao carrinho!');
      this.resetCountCoffee();
    }
  }

  resetCountCoffee() {
    this.countCoffeeEl.innerHTML = 0;
  }
}
