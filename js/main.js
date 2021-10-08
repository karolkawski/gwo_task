document.addEventListener("DOMContentLoaded",function(){
    appendSearchEvents();
});

//append all view eventas
function appendSearchEvents() {
    const localizationButton = document.querySelector('#search-localization-btn');
    const searchBtn = document.querySelector('#search');

    //localization event
    localizationButton.addEventListener('click', onShowLocalizationInput);

    //datapickers events
    const datePickerStart = window.MCDatepicker.create({
        el: '#datepicker-start',
        bodyType: 'modal',
        autoClose: true,
      });

      
    const datePickerEnd = window.MCDatepicker.create({
        el: '#datepicker-end',
        bodyType: 'modal',
        autoClose: true,
      });
    
    //search button event
    searchBtn.addEventListener('click', onSearch);

};

//inputs validation return true if it pass
function validation() {
    const searchLocalization = document.querySelector('#search-localization-input');
    const searchStartDate = document.querySelector('#datepicker-start');
    const searchEndDate = document.querySelector('#datepicker-end');

    if (!searchLocalization || searchLocalization.value.length === 0){
        return false;
    }
    if (!searchStartDate || searchStartDate.value.lenght === 0) {
        return false;
    }

    if (!searchEndDate || searchEndDate.value.lenght === 0) {
        return false;
    }

    if (new Date(searchStartDate.value) > new Date(searchEndDate.value)) {
        return false;
    }

    return true;
};


//on search click event
function onSearch() {
    const searchBtn = document.querySelector('#search');
    searchBtn.classList.remove('shake');
    
    const isPass = validation();

    switch(isPass) {
        case true:
            showModal();
            break
        case false:
            setTimeout(() => {
                searchBtn.classList.add('shake');
            }, 200)
            break;
    }
}

//create and show modal
function showModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.classList.add('modal--search');

    const modalTpl = `
        <div class="modal__header">Modal</div>
        <div class="modal__content">
            <figure>
                <img src="/assets/images/gwologo.png" alt="gwo-logo"/>
            </figure>
        </div>
        <div class="modal__footer">
            <button class="modal__button modal__button--close" id="close-modal">Close</button>
        </div>`;

    modal.innerHTML = modalTpl;

    document.querySelector('.modal--search') ? document.querySelector('.modal--search').remove() : () => {};

    modal.querySelector('#close-modal').addEventListener('click', function(e) {
        document.querySelector('.modal--search').remove();
    })

    document.body.append(modal)
}

//create and show input with localization
function onShowLocalizationInput(e) {
    const localizationButton = document.querySelector('#search-localization-btn');
    const localizationInput = document.createElement('input');
    localizationInput.classList.add('search__input');
    localizationInput.classList.add('search__input--w185');
    
    localizationInput.setAttribute('id', 'search-localization-input')
    appendBasicInputEvents(localizationInput);

    document.querySelector('#search-localization-input') ? document.querySelector('#search-localization-input').remove() : () => {};
    document.querySelector('.backdrop') ?  document.querySelector('.backdrop').remove() : () => {};
    const parentDiv = localizationButton.parentNode;
    parentDiv.insertBefore(localizationInput,localizationButton);

    localizationButton.classList.add('hide');
    localizationInput.classList.add('show');

    //backdrop to exit from edit mode
    const backdrop = document.createElement('div');
    backdrop.classList.add('backdrop');
    backdrop.addEventListener('click', function(e) {
        const input = document.querySelector('#search-localization-input');
        const currentValue = input.value;

        if (currentValue.length === 0 ) {
            document.querySelector('#search-localization-input').remove();
            localizationButton.classList.remove('hide');
            e.target.remove();
        }

    });

    document.body.append(backdrop);

    localizationInput.focus();

};

//append basic events for inputs 
function appendBasicInputEvents(element) {
    element.addEventListener('click', function(e) {
        this.setSelectionRange(0, this.value.length)
    });
    element.addEventListener('onkeyup', function(e) {

    });
};